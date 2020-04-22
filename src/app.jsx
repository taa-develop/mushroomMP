import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Login from "./pages/login/index";

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
      "pages/login/index",
      "pages/index/index",
      "pages/user/index",
      "pages/userBind/index",
      "pages/roomManage/index",
      "pages/roomBatch/index",
      "pages/recordingRoom/index",
      "pages/tunnelManage/index",
      "pages/tunnelBatch/index",
      "pages/addTunnelBatch/index",
      "pages/tunnelBatchStage/index",
      "pages/tunnelBatchStageRecording/index",
      "pages/addTunnelBatchStageRecording/index",
      "pages/recordingTunnel/index",
      "pages/dataManage/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      backgroundColor: "#eeeeee",
      enablePullDownRefresh: true
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
        <Login />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
