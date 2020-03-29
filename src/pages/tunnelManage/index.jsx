/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtSwipeAction } from "taro-ui";
import "./index.scss";

class TunnelManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
  componentDidMount() {}
  config = {
    navigationBarTitleText: "隧道管理"
  };
  handleAdd = () => {
    let arr = this.state.roomList.push(this.state.roomList.length + 1);
    this.setState(
      {
        roomList: [...this.state.roomList, ...arr]
      },
      () => console.log(this.state.roomList)
    );
  };

  handleAction = (index, ckItem, event, other) => {
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
  render() {
    const { roomList } = this.state;
    return (
      <View className="container">
        <View className="header">
          <AtButton size="small" onClick={this.handleAdd}>
            添加隧道
          </AtButton>
        </View>
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
              <View className="item">{v}号隧道</View>
            </AtSwipeAction>
          ))}
        </View>
      </View>
    );
  }
}

export default TunnelManage;
