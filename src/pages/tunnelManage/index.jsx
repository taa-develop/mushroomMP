/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtSwipeAction } from "taro-ui";
import "./index.scss";

class TunnelManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: ["一次隧道", "二次隧道"]
    };
  }
  componentDidMount() {}
  config = {
    navigationBarTitleText: "隧道管理"
  };

  handleAction = (index, ckItem) => {
    if (ckItem.text == "取消") {
      this.setState({
        isOpened: false
      });
    } else if (ckItem.text == "删除") {
      let filter = this.state.roomList.filter(f => f !== index);
      this.setState({
        roomList: filter
      });
    }
  };

  handleItem = indx => {
    Taro.navigateTo({
      url: `/pages/tunnelBatch/index?id=${indx}`
    });
  };

  render() {
    const { roomList } = this.state;
    return (
      <View className="container">
        <View className="items">
          {roomList.map((v, indx) => (
            <AtSwipeAction
              key={indx}
              onClick={this.handleAction.bind(this, indx + 1)}
              isOpened={this.state.isOpened}
              options={[
                {
                  text: "取消",
                  style: {
                    backgroundColor: "#6190E8"
                  }
                },
                {
                  text: "删除",
                  style: {
                    backgroundColor: "#FF4949"
                  }
                }
              ]}
            >
              <View
                className="item"
                onClick={this.handleItem.bind(this, indx + 1)}
              >
                <View className="name">{v}</View>
                <View className="at-icon at-icon-chevron-right"></View>
              </View>
            </AtSwipeAction>
          ))}
        </View>
      </View>
    );
  }
}

export default TunnelManage;
