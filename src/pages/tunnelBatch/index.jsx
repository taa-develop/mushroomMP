/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { AtButton, AtSwipeAction } from "taro-ui";

class TunnelBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  componentDidMount() {
    Taro.request({
      url: "https://api.yiquanxinhe.com/graphql",
      header: {
        authorization: `Bearer ${Taro.getStorageSync("token")}`
      },
      data: {
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
            silo{
              id
              name
            }
            stage{
              stageName
            }
          }
        }`
      },
      method: "get",
      success: function(resp) {
        if (resp.statusCode == 200) {
          console.log("resp: ", resp);
        }
      }
    });
  }

  config = {
    navigationBarTitleText: "批次管理"
  };

  handleAdd = () => {
    let arr = this.state.roomList.push(this.state.roomList.length + 1);
    this.setState(
      {
        roomList: [...this.state.roomList, ...arr]
      },
      () => console.log(this.state.roomList)
    );
  };

  handleAction = (index, ckItem, event) => {
    if (ckItem.text == "取消") {
      this.setState({
        isOpened: false
      });
    } else if (ckItem.text == "关闭") {
      let filter = this.state.roomList.filter(f => f !== index);
      this.setState(
        {
          roomList: filter
        },
        () => {
          Taro.showToast({
            title: "关闭成功",
            icon: "success",
            duration: 3000
          });
        }
      );
    }
  };

  handleItem = indx => {
    Taro.navigateTo({
      url: `/pages/recordingTunnel/index?id=${indx}`
    });
  };

  render() {
    const { roomList } = this.state;
    return (
      <View className="container">
        <View className="header">
          <AtButton size="small" onClick={this.handleAdd}>
            添加批次
          </AtButton>
        </View>
        <View className="items">
          {roomList.map((v, indx) => (
            <AtSwipeAction
              key={indx}
              onClick={this.handleAction.bind(this, indx + 1)}
              isOpened={this.state.isOpened}
              options={[
                {
                  text: "取消",
                  style: {
                    backgroundColor: "#6190E8"
                  }
                },
                {
                  text: "关闭",
                  style: {
                    backgroundColor: "#FF4949"
                  }
                }
              ]}
            >
              <View
                className="item"
                onClick={this.handleItem.bind(this, indx + 1)}
              >
                <View className="name">第{v}批次</View>
                <View className="wrapper">
                  <View className="jdName">
                    <Text>所处阶段：</Text>
                    空阶段
                  </View>
                  <View className="pcName">
                    <Text>记录人员：</Text>
                    张三
                  </View>
                  <View className="abNormal">
                    <Text> 是否异常：</Text>
                    异常
                  </View>
                  <View className="pcDate">
                    <Text> 记录时间：</Text>
                    YYYY-MM-DD HH:mm
                  </View>
                </View>
                <View className="at-icon at-icon-chevron-right"></View>
              </View>
            </AtSwipeAction>
          ))}
        </View>
      </View>
    );
  }
}

export default TunnelBatch;
