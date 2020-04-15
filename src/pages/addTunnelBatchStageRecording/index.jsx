/* eslint-disable react/no-unused-state */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  dispatchAddTunnelBatchRecord,
  dispatchIndicatorsList
} from "../../actions/tunnelBatch";
import { dispatchCurrentUser } from "../../actions/user";
import "./index.scss";

@connect(
  state => {
    return {
      indicatorsList: state.tunnelBatch.list.indicatorsList
    };
  },
  { dispatchAddTunnelBatchRecord, dispatchIndicatorsList, dispatchCurrentUser }
)
class Recording extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      remark: "",
      stageId: "",
      batchId: "",
      dtName: []
    };
  }

  componentWillMount() {
    let { stageId, batchId } = this.$router.params;
    this.setState({
      stageId,
      batchId
    });
  }

  componentDidMount() {
    this.props.dispatchCurrentUser({
      query: `{
        currentUser{
          username
          realName
          role
          gender
        }
      }`
    });

    this.props
      .dispatchIndicatorsList({
        query: `{
        indicatorsList(pageQuery:{
          pageNum:1,
          pageSize:10
        },
        indicatorQuery:{environment:ONCE_TUNNEL}
        ){
          id
          name
          isUse
          unit
        }
      }`
      })
      .then(res => {
        this.setState({
          dtName: res.indicatorsList.map(v => ({
            key: v.id,
            name: v.name,
            value: ""
          }))
        });
      });
  }

  config = {
    navigationBarTitleText: "添加记录"
  };

  handleChangeName(value, name) {
    this.setState({
      [name.currentTarget.id]: value
    });
  }
  handleChangeDTName(index, value) {
    this.setState({
      dtName: this.state.dtName.map((v, i) =>
        index == i
          ? {
              ...v,
              value: value
            }
          : v
      )
    });
  }

  onSubmit(event) {
    if (this.state.remark) {
      this.props
        .dispatchAddTunnelBatchRecord({
          query: `mutation AddTunnelBatch($batchId: Int,$stageId: Int,$environment: Environment!,$picture: String,$remark: String,$indicatorData: [InputIndicatorData]) {
            addRecord(inputRecord:{batchId: $batchId,stageId: $stageId,environment: $environment,picture: $picture,remark: $remark,indicatorData:$indicatorData}) {
            id
            environment
            recorderId
            recorder
            batchId
            stageId
            picture
            remark
          }
        }`,
          variables: {
            batchId: Number(this.state.batchId),
            stageId: Number(this.state.stageId),
            remark: this.state.remark,
            indicatorData: this.state.dtName.map(v => ({
              key: v.key,
              value: v.value
            })),
            environment: "ONCE_TUNNEL"
          }
        })
        .then(res => {
          if (res.addRecord) {
            Taro.showToast({
              title: "成功",
              icon: "success",
              duration: 2000
            }).then(() => Taro.navigateBack());
          }
        });
    }
  }
  render() {
    const { remark, dtName } = this.state;
    return (
      <View className="container">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <View className="item">
            <AtInput
              name="remark"
              title="备注"
              type="text"
              placeholder="填写备注"
              value={remark}
              onChange={this.handleChangeName.bind(this)}
            />
          </View>
          {dtName &&
            dtName.map((v, idnx) => (
              <View className="item" key={idnx}>
                <AtInput
                  name={v.id}
                  title={v.name}
                  type="text"
                  placeholder={`填写${v.name}`}
                  value={v.value}
                  onChange={this.handleChangeDTName.bind(this, idnx)}
                />
              </View>
            ))}

          <View className="buttonGroup">
            <AtButton formType="submit" type="primary">
              提交
            </AtButton>
          </View>
        </AtForm>
      </View>
    );
  }
}

export default Recording;
