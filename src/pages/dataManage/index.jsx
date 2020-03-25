/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class Index extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "数据管理"
  };
  render() {
    return (
      <View className="container">
        <Text>数据管理</Text>
      </View>
    );
  }
}

export default Index;
