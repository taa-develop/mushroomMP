/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtTabBar } from "taro-ui";

class RoomManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "菇房管理",
    window: {
      backgroundColor: "#eeeeee"
    }
  };

  handleItem = indx => {
    Taro.navigateTo({
      url: `/pages/roomBatch/index?id=${indx}`
    });
  };
  handleClick(value) {
    this.setState(
      {
        current: value
      },
      () => {
        if (this.state.current == 0) {
          Taro.reLaunch({
            url: "/pages/roomManage/index"
          });
        }
        if (this.state.current == 1) {
          Taro.reLaunch({
            url: "/pages/tunnelManage/index"
          });
        }
        if (this.state.current == 2) {
          Taro.reLaunch({
            url: "/pages/user/index"
          });
        }
      }
    );
  }

  render() {
    const { roomList } = this.state;
    return (
      <View>
        <View className="container">
          <View className="items">
            {roomList.map((v, indx) => (
              <View
                key={v}
                className="item"
                onClick={this.handleItem.bind(this, indx + 1)}
              >
                <View className="name">{v}号菇房</View>
                <View className="at-icon at-icon-chevron-right"></View>
              </View>
            ))}
          </View>
        </View>

        <AtTabBar
          fixed
          tabList={[
            { title: "菇房管理" },
            { title: "隧道管理" },
            { title: "个人中心" }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}

export default RoomManage;
