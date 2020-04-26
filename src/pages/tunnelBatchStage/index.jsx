/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtDivider, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  dispatchStageByTunnelBatchList,
  onTunnelBatchIdAndStageId,
  dispatchTunnelBatchStageStart
} from "../../actions/tunnelBatch";
import "./index.scss";
import _ from "lodash";
import dayjs from "dayjs";

@connect(
  state => {
    return {
      stageBatchList: _.get(state.tunnelBatch, "list.stageListByBatchId"),
      batchId: _.get(state.tunnelBatch, "batchId"),
      batchIdAndStageId: _.get(state.tunnelBatch, "batchIdAndStageId")
    };
  },
  {
    dispatchStageByTunnelBatchList,
    onTunnelBatchIdAndStageId,
    dispatchTunnelBatchStageStart
  }
)
class TunnelBatchStage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getList();
  }

  config = {
    navigationBarTitleText: "批次阶段"
  };

  componentDidShow() {
    this.getList();
  }

  componentDidHide() {}

  getList = () => {
    this.props.dispatchStageByTunnelBatchList({
      query: `{
        stageListByBatchId(pageQuery:{
          pageNum:1,
          pageSize:10
        },
        batchId:${this.props.batchId}
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
  };

  handleItem = (stageId, batchId) => {
    this.props.onTunnelBatchIdAndStageId({ stageId, batchId });

    Taro.navigateTo({
      url: `/pages/tunnelBatchStageRecording/index`
    });
  };

  handleStartStage = (stageId, batchId) => {
    this.props
      .dispatchTunnelBatchStageStart({
        query: `mutation StartStage($batchId: Int!,$stageId: Int!) {
        startStage(batchId: $batchId,stageId: $stageId)
    }`,
        variables: {
          batchId: Number(batchId),
          stageId: Number(stageId)
        }
      })
      .then(res => {
        if (res.startStage) {
          Taro.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
          }).then(() => this.getList());
        }
      });
  };

  render() {
    const { stageBatchList } = this.props;

    return (
      <View className="container">
        <View className="items">
          {stageBatchList &&
            stageBatchList.map((v, indx) => (
              <View key={v.id} className="item">
                <View
                  className="itemUpContent"
                  onClick={this.handleItem.bind(this, v.id, v.batchId)}
                >
                  <View className="downWrapper">
                    <Text>开始时间：</Text>
                    {v.startTime == -1
                      ? ""
                      : dayjs.unix(v.startTime).format("YYYY-MM-DD HH:mm")}
                  </View>
                  <View className="at-icon at-icon-chevron-right"></View>
                </View>
                <AtDivider />
                <View className="itemCenterContent">
                  <View className="itemCenterContentItem">
                    <View className="fileds">
                      <Text>阶段：</Text>
                      {v.stageName}
                    </View>
                    <View className="fileds">
                      <Text>序号：</Text>
                      {indx + 1}
                    </View>
                  </View>
                  <View className="itemCenterContentItem">
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

                <View className="itemDownContent">
                  {((indx == 0 && v.status == 0) ||
                    (stageBatchList &&
                      stageBatchList[indx - 1] &&
                      stageBatchList[indx - 1].status == 2 &&
                      v.status == 0)) && (
                    <View className="startButtton">
                      <AtButton
                        type="primary"
                        onClick={this.handleStartStage.bind(
                          this,
                          v.id,
                          v.batchId
                        )}
                      >
                        开始阶段
                      </AtButton>
                    </View>
                  )}
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

export default TunnelBatchStage;
