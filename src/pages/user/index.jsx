/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
// import { AtButton } from "taro-ui";
import "./index.scss";

class User extends Component {
  state = {
    userInfo: {},
  };

  componentDidMount() {
    Taro.getStorage({
      key: "userInfo",
      success: function (res) {
        if (res.data) {
          return res.data;
        }
      },
    }).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  config = {
    navigationBarTitleText: "个人中心",
  };
  componentDidShow() {}

  componentDidHide() {}

  handleUserBind = () => {
    Taro.getUserInfo().then((r) => {
      let uInfo = {
        avatarUrl: r.userInfo.avatarUrl,
        gender: r.userInfo.gender == 1 ? "MAN" : "WOMAN",
        nickName: r.userInfo.nickName,
        country: r.userInfo.country,
        province: r.userInfo.province,
        city: r.userInfo.city,
      };
      Taro.login({
        success: function (res) {
          if (res.code) {
            Taro.request({
              url: "https://api.yiquanxinhe.com/graphql",
              data: {
                query: `mutation WeLogin($code: String!,$userinfo:InputWeChatUser) {
                  weChatLogin(code: $code,userinfo: $userinfo) {
                    token
                  }
                }`,
                variables: { code: res.code, userinfo: uInfo },
              },
              method: "POST",
              success: function (resp) {
                if (resp.statusCode == 200) {
                  Taro.setStorage({
                    key: "token",
                    data: resp.data.data.weChatLogin.token,
                  });
                  Taro.navigateTo({
                    url: "/pages/userBind/index",
                  });
                }
              },
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <View className="container">
        <View className="header">
          <View className="wrapper">
            <View className="LeftTx">
              <Image
                style="width: 100%;height: 100%;background: #fff;border-radius:50%"
                src={`${userInfo.avatarUrl}`}
              />
            </View>
            <View className="RightWz">
              <View className="nikeName">{userInfo.nickName}</View>
            </View>
          </View>
        </View>
        <View className="content"></View>
        {/* <View className="items">
          <View className="item">
            <AtButton type="primary" onClick={this.handleUserBind}>
              用户绑定
            </AtButton>
          </View>
        </View> */}
      </View>
    );
  }
}

export default User;
