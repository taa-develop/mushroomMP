/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

class Index extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "首页"
  };
  handleGetUserInfo = e => {
    if (e.detail.errMsg == "getUserInfo:ok") {
      Taro.showToast({
        title: "登录成功",
        icon: "success",
        duration: 3000
      })
      // .then(res => {
      //   if (res.errMsg == "showToast:ok") {
      //     Taro.navigateTo({
      //       url: "pages/user/index"
      //     });
      //   }
      // });
    }
  };
  render() {
    return (
      <View className="container">
        <View className="header">
          <Text>双胞蘑菇工厂化生产智能管理平台</Text>
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
