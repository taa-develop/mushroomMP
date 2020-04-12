/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

class Index extends Component {
  componentDidMount() {}
  config = {
    navigationBarTitleText: "登录"
  };
  handleGetUserInfo = e => {
    let uInfo = {
      avatarUrl: e.detail.userInfo.avatarUrl,
      gender: e.detail.userInfo.gender == 1 ? "MAN" : "WOMAN",
      nickName: e.detail.userInfo.nickName,
      country: e.detail.userInfo.country,
      province: e.detail.userInfo.province,
      city: e.detail.userInfo.city
    };
    Taro.setStorage({
      key: "userInfo",
      data: e.detail.userInfo
    });
    Taro.login({
      success: function(res) {
        if (res.code) {
          Taro.request({
            url: "https://api.yiquanxinhe.com/graphql",
            data: {
              query: `mutation WeLogin($code: String!,$userinfo:InputWeChatUser) {
                  weChatLogin(code: $code,userinfo: $userinfo) {
                    token
                  }
                }`,
              variables: { code: res.code, userinfo: uInfo }
            },
            method: "POST",
            success: function(resp) {
              if (resp.statusCode == 200) {
                Taro.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 3000
                });
                Taro.setStorage({
                  key: "token",
                  data: resp.data.data.weChatLogin.token
                });
                Taro.navigateTo({
                  url: "/pages/roomManage/index"
                });
              }
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
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
