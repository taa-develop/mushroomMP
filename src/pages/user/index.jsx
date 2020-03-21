/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

class User extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  config = {
    navigationBarTitleText: "个人中心"
  };
  componentDidShow() {}

  componentDidHide() {}

  handleUserBind = () => {
    Taro.getUserInfo().then(r => {
      let uInfo = {
        avatarUrl: r.userInfo.avatarUrl,
        gender: r.userInfo.gender == 1 ? "MAN" : "WOMAN",
        nickName: r.userInfo.nickName,
        country: r.userInfo.country,
        province: r.userInfo.province,
        city: r.userInfo.city
      };
      Taro.login({
        success: function(res) {
          if (res.code) {
            Taro.request({
              url: "http://127.0.0.1:9876/graphql",
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
                  Taro.setStorage({
                    key: "token",
                    data: resp.data.data.weChatLogin.token
                  });
                  Taro.navigateTo({
                    url: "/pages/userBind/index"
                  });
                }
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    });
  };

  render() {
    return (
      <View className="container">
        <View className="items">
          <View className="item">
            <AtButton type="primary" onClick={this.handleUserBind}>
              用户绑定
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default User;
