/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtButton, AtSwipeAction } from "taro-ui";

class RoomManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "菇房管理",
  };

  handleAdd = () => {
    let arr = this.state.roomList.push(this.state.roomList.length + 1);
    this.setState(
      {
        roomList: [...this.state.roomList, ...arr],
      },
      () => console.log(this.state.roomList)
    );
  };

  handleAction = (index, ckItem, event) => {
    if (ckItem.text == "取消") {
      this.setState({
        isOpened: false,
      });
    } else if (ckItem.text == "删除") {
      let filter = this.state.roomList.filter((f) => f !== index);
      this.setState({
        roomList: filter,
      });
    }
  };

  handleItem = (indx) => {
    Taro.navigateTo({
      url: `/pages/recordingRoom/index?id=${indx}`,
    });
  };

  render() {
    const { roomList } = this.state;
    return (
      <View className="container">
        <View className="header">
          <AtButton size="small" onClick={this.handleAdd}>
            添加菇房
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
                    backgroundColor: "#6190E8",
                  },
                },
                {
                  text: "删除",
                  style: {
                    backgroundColor: "#FF4949",
                  },
                },
              ]}
            >
              <View
                className="item"
                onClick={this.handleItem.bind(this, indx + 1)}
              >
                <View className="name">{v}号菇房</View>
                <View className="at-icon at-icon-chevron-right"></View>
              </View>
            </AtSwipeAction>
          ))}
        </View>
      </View>
    );
  }
}

export default RoomManage;
