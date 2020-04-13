/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtDivider } from "taro-ui";
import { connect } from "@tarojs/redux";
import { dispatchTunnelBatchList } from "../../actions/tunnelBatch";
import "./index.scss";

@connect(
  state => {
    return {
      batchList: state.tunnelBatch.list.batchList
    };
  },
  { dispatchTunnelBatchList }
)
class TunnelBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tunnelKey: ""
    };
  }

  componentWillMount() {
    let tunnelKey = this.$router.params.id;
    this.setState({
      tunnelKey
    });
  }

  componentDidMount() {
    this.props.dispatchTunnelBatchList({
      query: `{
        batchList(pageQuery:{
          pageNum:1,
          pageSize:10
        },
        batchQuery:{
          environment: ONCE_TUNNEL
        }
        ){
          id
          environment
          number
          status
          startTime
          endTime
          recorder
          recordCount
          silo{
            id
            name
          }
          stage{
            stageName
          }
        }
      }`
    });
  }

  config = {
    navigationBarTitleText: "批次管理"
  };

  handleAdd = () => {
    Taro.navigateTo({
      url: `/pages/addTunnelBatch/index?id=${this.state.tunnelKey}`
    });
  };

  handleItem = id => {
    Taro.navigateTo({
      url: `/pages/tunnelBatchStage/index?id=${id}`
    });
  };

  render() {
    const { batchList } = this.props;
    return (
      <View className="container">
        <View className="header">
          <AtButton type="primary" onClick={this.handleAdd}>
            添加批次
          </AtButton>
        </View>
        <View className="items">
          {batchList &&
            batchList.map((v, indx) => (
              <View
                key={indx}
                className="item"
                onClick={this.handleItem.bind(this, v.id)}
              >
                <View className="itemUpContent">
                  <View className="itemUpContentItem">
                    <View className="fileds">
                      <Text>批次：</Text>
                      {v.number}
                    </View>
                    <View className="fileds">
                      <Text>仓号：</Text>
                      {v.silo.name}
                    </View>
                  </View>
                  <View className="itemUpContentItem bottom-Line">
                    <View className="fileds">
                      <Text>记录：</Text>
                      {v.recordCount}
                    </View>
                    <View className="fileds">
                      <Text>记录员：</Text>
                      {v.recorder}
                    </View>
                  </View>
                  <View className="TagBox">
                    {v.status == 0 && (
                      <Text className="status_wxs">未开始</Text>
                    )}
                    {v.status == 1 && (
                      <Text className="status_wwc">未完成</Text>
                    )}
                    {v.status == 2 && (
                      <Text className="status_yjs">已结束</Text>
                    )}
                  </View>
                </View>
                <AtDivider />
                <View className="itemDownContent">
                  <View className="downWrapper">
                    <Text> 开始时间：</Text>
                    {v.startTime == "-1" ? "" : v.startTime}
                  </View>
                  <View className="at-icon at-icon-chevron-right"></View>
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

export default TunnelBatch;
