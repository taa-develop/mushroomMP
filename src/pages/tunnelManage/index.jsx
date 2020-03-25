/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class TunnelManage extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "隧道管理"
  };
  render() {
    return (
      <View className="container">
        <Text>tunnelManage</Text>
      </View>
    );
  }
}

export default TunnelManage;
