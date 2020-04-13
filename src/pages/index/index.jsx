/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import "./index.scss";

class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  componentDidMount() {}

  handleClick(value) {
    this.setState(
      {
        current: value
      },
      () => {
        if (this.state.current == 0) {
          Taro.navigateTo({
            url: "/pages/roomManage/index"
          });
        }
        if (this.state.current == 1) {
          Taro.navigateTo({
            url: "/pages/tunnelManage/index"
          });
        }
        if (this.state.current == 2) {
          Taro.navigateTo({
            url: "/pages/user/index"
          });
        }
      }
    );
  }
  config = {
    navigationBarTitleText: "首页"
  };
  render() {
    return (
      <View className="container">
        
        <AtTabBar
          fixed
          tabList={[
            { title: "菇房管理" },
            { title: "隧道管理" },
            { title: "个人中心" }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}

export default Index;
