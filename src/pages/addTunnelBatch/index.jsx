/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import { dispatchAddTunnelBatch } from "../../actions/tunnelBatch";
import "./index.scss";

@connect(
  state => {
    return {
      batchList: state.tunnelBatch.list.batchList
    };
  },
  { dispatchAddTunnelBatch }
)
class Recording extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selectorLc: ["一号料仓", "二号料仓", "三号料仓", "四号料仓", "五号料仓"],
      selectorLcValue: 0,
      pcNum: "",
      tunnelKey: ""
    };
  }

  componentWillMount() {
    let tunnelKey = this.$router.params.id;
    this.setState({
      tunnelKey
    });
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "添加批次"
  };

  handleChangeName(value, name) {
    this.setState({
      [name.currentTarget.id]: Number(value)
    });
  }

  handleChangeLc = e => {
    this.setState({
      selectorLcValue: Number(e.detail.value)
    });
  };

  onSubmit(event) {
    if (this.state.selectorLc[this.state.selectorLcValue] && this.state.pcNum) {
      this.props.dispatchAddTunnelBatch({
        query: `mutation AddTunnelBatch($environment: Environment!,$number: Int,$siloId: Int) {
          addBatch(inputBatch:{environment:$environment,number:$number,siloId:$siloId}) {
            id
            environment
            stage{
              stageName
              recorder
              recordCount
              status
            }
          }
        }`,
        variables: {
          environment: this.state.tunnelKey,
          number: this.state.pcNum,
          siloId: this.state.selectorLcValue + 1
        }
      });
    }
  }
  render() {
    const { selectorLc, selectorLcValue, pcNum } = this.state;
    return (
      <View className="container">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <View className="item">
            <View className="panel">
              <View className="panel__content">
                <View className="example-item">
                  <Picker
                    mode="selector"
                    range={selectorLc}
                    value={selectorLcValue}
                    onChange={this.handleChangeLc}
                  >
                    <View className="demo-list-item">
                      <View className="demo-list-item__label">选择料仓</View>
                      <View className="demo-list-item__value">
                        {selectorLc[selectorLcValue]}
                      </View>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <View className="item">
            <AtInput
              name="pcNum"
              title="批次编号"
              type="text"
              placeholder="填写批次编号"
              value={pcNum}
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
