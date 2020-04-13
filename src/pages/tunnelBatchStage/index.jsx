/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtDivider } from "taro-ui";
import { connect } from "@tarojs/redux";
import { dispatchStageByTunnelBatchList } from "../../actions/tunnelBatch";
import "./index.scss";

@connect(
  state => {
    return {
      stageBatchList: state.tunnelBatch.list.stageListByBatchId
    };
  },
  { dispatchStageByTunnelBatchList }
)
class TunnelBatchStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  componentWillMount() {
    let id = this.$router.params.id;
    this.setState({
      id
    });
  }
  componentDidMount() {
    this.props.dispatchStageByTunnelBatchList({
      query: `{
        stageListByBatchId(pageQuery:{
          pageNum:1,
          pageSize:10
        },
        batchId:${this.state.id}
        ){
          id
          environment
          batchId
          stageName
          recorder
          recordCount
          startTime
          endTime
          status
        }
      }`
    });
  }

  config = {
    navigationBarTitleText: "批次阶段"
  };

  handleItem = (stageId, batchId) => {
    Taro.navigateTo({
      url: `/pages/tunnelBatchStageRecording/index?stageId=${stageId}&batchId=${batchId}`
    });
  };

  render() {
    const { stageBatchList } = this.props;
    return (
      <View className="container">
        <View className="items">
          {stageBatchList &&
            stageBatchList.map((v, indx) => (
              <View
                key={indx}
                className="item"
                onClick={this.handleItem.bind(this, v.id, v.batchId)}
              >
                <View className="itemUpContent">
                  <View className="itemUpContentItem">
                    <View className="fileds">
                      <Text>阶段：</Text>
                      {v.stageName}
                    </View>
                    <View className="fileds">
                      <Text>序号：</Text>
                      {indx + 1}
                    </View>
                  </View>
                  <View className="itemUpContentItem bottom-Line">
                    <View className="fileds">
                      <Text>记录数：</Text>
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

export default TunnelBatchStage;
