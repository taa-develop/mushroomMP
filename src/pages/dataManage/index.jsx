/* eslint-disable import/newline-after-import */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";
class Index extends Component {
  componentDidMount() {}

  config = {
    navigationBarTitleText: "数据管理",
  };
  handleScanCode =() =>{
    Taro.scanCode().then(res=>{
      console.log('扫码成功: ', res);
    })
  }
  render() {
    return (
      <View className="container">
        <AtButton type="primary" onClick={this.handleScanCode}>扫码</AtButton>
      </View>
    );
  }
}

export default Index;
