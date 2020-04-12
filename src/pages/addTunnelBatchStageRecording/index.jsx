/* eslint-disable react/no-unused-state */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  dispatchAddTunnelBatchRecord,
  dispatchIndicatorsList
} from "../../actions/tunnelBatch";
import "./index.scss";

@connect(
  state => {
    return {
      indicatorsList: state.tunnelBatch.list.indicatorsList
    };
  },
  { dispatchAddTunnelBatchRecord, dispatchIndicatorsList }
)
class Recording extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      remark: "",
      stageId: "",
      batchId: ""
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
    this.props.dispatchIndicatorsList({
      query: `{
        indicatorsList(pageQuery:{
          pageNum:1,
          pageSize:10
        },
        indicatorQuery:{environment:ONCE_TUNNEL}
        ){
          name
          isUse
          unit
        }
      }`
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

  onSubmit(event) {
    if (this.state.remark) {
      this.props
        .dispatchAddTunnelBatchRecord({
          query: `mutation AddTunnelBatch($batchId: Int,$stageId: Int,$environment: Environment!,$picture: String,$remark: String,$indicatorData: [InputIndicatorData]) {
          inputRecord(inputRecord:{batchId: $batchId,stageId: $stageId,environment: $environment,picture: $picture,remark: $remark,indicatorData:$indicatorData}) {
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
            indicatorData: [{ key: 1, value: "五十摄氏度" }],
            environment: "ONCE_TUNNEL"
          }
        })
        .then(res => {
          console.log("res: ", res);
        });
    }
  }
  render() {
    const { remark } = this.state;
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
