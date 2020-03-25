/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class RoomManage extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "菇房管理"
  };

  render() {
    return (
      <View className="container">
        <Text>roomManage</Text>
      </View>
    );
  }
}

export default RoomManage;
