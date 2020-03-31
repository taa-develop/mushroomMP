import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";

import configStore from "./store";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  componentDidMount() {}

  config = {
    pages: [
      "pages/index/index",
      "pages/user/index",
      "pages/userBind/index",
      "pages/roomManage/index",
      "pages/recordingRoom/index",
      "pages/tunnelManage/index",
      // "pages/tunnelManage/recording",
      "pages/dataManage/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#666",
      selectedColor: "#1D5181",
      backgroundColor: "#fafafa",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "./assets/new-home.png",
          selectedIconPath: "./assets/new-home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/roomManage/index",
          iconPath: "./assets/room.png",
          selectedIconPath: "./assets/room-active.png",
          text: "菇房管理"
        },
        {
          pagePath: "pages/tunnelManage/index",
          iconPath: "./assets/tunnel.png",
          selectedIconPath: "./assets/tunnel-active.png",
          text: "隧道管理"
        },
        {
          pagePath: "pages/dataManage/index",
          iconPath: "./assets/data.png",
          selectedIconPath: "./assets/data-active.png",
          text: "数据管理"
        },
        {
          pagePath: "pages/user/index",
          iconPath: "./assets/user.png",
          selectedIconPath: "./assets/user-active.png",
          text: "我的"
        }
      ]
    }
  };

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
