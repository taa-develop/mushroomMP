/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

class Index extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "登录",
  };
  handleGetUserInfo = (e) => {
    console.log("e: ", e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      Taro.showToast({
        title: "登录成功",
        icon: "success",
        duration: 3000,
      }).then((res) => {
        if (res.errMsg == "showToast:ok") {
          Taro.setStorage({
            key: "userInfo",
            data: e.detail.userInfo
          })
          Taro.switchTab({
            url: "/pages/index/index",
          });
        }
      });
    }
  };
  render() {
    return (
      <View className="container">
        <View className="header">
          <Text className="title">双胞蘑菇工厂化生产</Text>
          <Text className="title">智能管理平台</Text>
        </View>
        <View className="content">
          <Button
            open-type="getUserInfo"
            onGetUserInfo={this.handleGetUserInfo}
          >
            登录
          </Button>
        </View>
      </View>
    );
  }
}

export default Index;
