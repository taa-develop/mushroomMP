/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import "./index.scss";
import { AtForm, AtInput, AtButton } from "taro-ui";

class Recording extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selector: ["空阶段", "发菌阶段", "覆土阶段", "最后阶段"],
      selectorValue: 0
    };
  }

  componentWillMount() {
    let id = this.$router.params.id;
    console.log("id: ", id);
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "菇房管理-生产指标录入"
  };

  handleChange(value) {
    this.setState({
      value
    });
  }
  onSubmit(event) {
    console.log(event);
  }

  handleChange = e => {
    this.setState({
      selectorValue: e.detail.value
    });
  };
  render() {
    const { selector, selectorValue } = this.state;
    return (
      <View className="container">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput
            name="value"
            title="文本"
            type="text"
            placeholder="单行文本"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <View className="panel">
            <View className="panel__content">
              <View className="example-item">
                <Picker
                  mode="selector"
                  range={selector}
                  value={selectorValue}
                  onChange={this.handleChange}
                >
                  <View className="demo-list-item">
                    <View className="demo-list-item__label">所处批次</View>
                    <View className="demo-list-item__value">
                      {selector[selectorValue]}
                    </View>
                  </View>
                </Picker>
              </View>
            </View>
          </View>
          <View className="panel">
            <View className="panel__content">
              <View className="example-item">
                <Picker
                  mode="selector"
                  range={selector}
                  value={selectorValue}
                  onChange={this.handleChange}
                >
                  <View className="demo-list-item">
                    <View className="demo-list-item__label">所处阶段</View>
                    <View className="demo-list-item__value">
                      {selector[selectorValue]}
                    </View>
                  </View>
                </Picker>
              </View>
            </View>
          </View>
          <View className="panel">
            <View className="panel__content">
              <View className="example-item">
                <Picker
                  mode="selector"
                  range={selector}
                  value={selectorValue}
                  onChange={this.handleChange}
                >
                  <View className="demo-list-item">
                    <View className="demo-list-item__label">记录时间</View>
                    <View className="demo-list-item__value">
                      {selector[selectorValue]}
                    </View>
                  </View>
                </Picker>
              </View>
            </View>
          </View>
          <AtButton formType="submit">提交</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default Recording;
