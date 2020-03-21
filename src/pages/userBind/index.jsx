/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.scss";

class UserBind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      phone: ""
    };
  }
  handleChangeName(userName) {
    this.setState({
      userName
    });
  }
  handleChangePhone(phone) {
    this.setState({
      phone
    });
  }
  onSubmit() {
    if (this.state.userName && this.state.phone) {
      Taro.request({
        url: "http://127.0.0.1:9876/graphql",
        header:{
          authorization: `Bearer ${Taro.getStorageSync('token')}`
        },
        data: {
          query: `mutation weChatAuthe($username: String!,$realName: String!) {
            weChatAuthentication(username: $username,realName: $realName)
          }`,
          variables: { username: this.state.phone, realName: this.state.userName }
        },
        method: "POST",
        success: function (res) {
          console.log(res)
        }
      });
    }
  }

  onReset() {
    this.setState({
      userName: "",
      phone: ""
    });
  }

  config = {
    navigationBarTitleText: "用户绑定"
  };

  render() {
    return (
      <View className="container">
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            clear
            name="userName"
            title="姓名"
            type="text"
            placeholder="请输入姓名"
            value={this.state.userName}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            clear
            name="phone"
            title="手机号码"
            type="phone"
            placeholder="请输入手机号码"
            value={this.state.phone}
            onChange={this.handleChangePhone.bind(this)}
          />

          <AtButton formType="submit" type="primary">
            提交
          </AtButton>
          {/* <View className="mT">
            <AtButton formType="reset">重置</AtButton>
          </View> */}
        </AtForm>
      </View>
    );
  }
}

export default UserBind;
