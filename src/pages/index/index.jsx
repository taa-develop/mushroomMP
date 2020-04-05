/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class Index extends Component {
  componentDidMount() {}

  config = {
    navigationBarTitleText: "首页",
  };
  render() {
    return (
      <View>
        <Text>显示 首页</Text>
      </View>
    );
  }
}

export default Index;
