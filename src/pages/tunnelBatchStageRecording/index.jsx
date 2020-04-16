/* eslint-disable react/no-unused-state */
/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtDivider, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  dispatchRecordByTunnelBatchList,
  dispatchCompleteStage
} from "../../actions/tunnelBatch";
import "./index.scss";
import _ from "lodash";

@connect(
  state => {
    return {
      recordListByStageId: _.get(state.tunnelBatch, "list.recordListByStageId"),
      batchIdAndStageId: _.get(state.tunnelBatch, "batchIdAndStageId")
    };
  },
  { dispatchRecordByTunnelBatchList, dispatchCompleteStage }
)
class TunnelBatchStage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatchRecordByTunnelBatchList({
      query: `{
        recordListByStageId(pageQuery:{
        pageNum:1,
        pageSize:10
      },
      stageId:${this.props.batchIdAndStageId.stageId}
      ){
        id
        environment
        recorderId
        recorder
        batchId
        stageId
        picture
        remark
      }
    }`
    });
  }

  getList = () => {};

  config = {
    navigationBarTitleText: "阶段记录"
  };
  handleComplete = () => {
    this.props
      .dispatchCompleteStage({
        query: `mutation CompleteStage($batchId: Int!,$stageId: Int!) {
        endStage(batchId: $batchId,stageId: $stageId)
      }`,
        variables: {
          batchId: Number(this.props.batchIdAndStageId.batchId),
          stageId: Number(this.props.batchIdAndStageId.stageId)
        }
      })
      .then(res => {
        if (res.endStage) {
          Taro.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
          }).then(() => Taro.navigateBack());
        }
      });
  };

  handleAddRecording = () => {
    Taro.navigateTo({
      url: `/pages/addTunnelBatchStageRecording/index`
    });
  };
  render() {
    const { recordListByStageId } = this.props;
    return (
      <View className="container">
        <View className="header">
          <AtButton type="primary" onClick={this.handleAddRecording}>
            添加记录
          </AtButton>
          <AtButton type="secondary" onClick={this.handleComplete}>
            完成阶段
          </AtButton>
        </View>
        <View className="items">
          {recordListByStageId &&
            recordListByStageId.map((v, indx) => (
              <View key={indx} className="item">
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
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

export default TunnelBatchStage;
