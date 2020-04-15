/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtTabBar } from "taro-ui";
import "./index.scss";
import { onTunnelNumberOftunnels } from "../../actions/tunnelBatch";

@connect(
  state => {
    return {};
  },
  { onTunnelNumberOftunnels }
)
class TunnelManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      roomList: [
        {
          key: "ONCE_TUNNEL",
          name: "一次隧道"
        },
        {
          key: "TWICE_TUNNEL",
          name: "二次隧道"
        }
      ]
    };
  }
  componentDidMount() {}
  config = {
    navigationBarTitleText: "隧道管理"
  };

  handleItem = name => {
    Taro.navigateTo({
      url: `/pages/tunnelBatch/index?id=${name}`
    });
    // this.props.onTunnelNumberOftunnels(name)
  };
  handleClick(value) {
    this.setState(
      {
        current: value
      },
      () => {
        if (this.state.current == 0) {
          Taro.reLaunch({
            url: "/pages/roomManage/index"
          });
        }
        if (this.state.current == 1) {
          Taro.reLaunch({
            url: "/pages/tunnelManage/index"
          });
        }
        if (this.state.current == 2) {
          Taro.reLaunch({
            url: "/pages/user/index"
          });
        }
      }
    );
  }
  render() {
    const { roomList } = this.state;
    return (
      <View>
        <View className="container">
          <View className="items">
            {roomList.map((v, indx) => (
              <View
                key={v.key}
                className="item"
                onClick={this.handleItem.bind(this, v.key)}
              >
                <View className="name">{v.name}</View>
                <View className="at-icon at-icon-chevron-right"></View>
              </View>
            ))}
          </View>
        </View>
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

export default TunnelManage;
