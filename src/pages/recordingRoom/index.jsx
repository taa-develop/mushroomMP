/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import "./index.scss";
import { AtForm, AtInput, AtButton } from "taro-ui";
import dayjs from "dayjs";
class Recording extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      name: "",
      ycText: "",
      selectorJd: ["空阶段", "发菌阶段", "覆土阶段", "最后阶段"],
      selectorJdValue: 0,
      dateSel: dayjs().format("YYYY-MM-DD"),
      timeSel: dayjs().format("HH:mm"),
    };
  }

  componentWillMount() {
    let id = this.$router.params.id;
    console.log("id: ", id);
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "生产指标录入",
  };

  handleChangeName(value) {
    this.setState({
      name: value,
    });
  }
  handleChangeYc(value) {
    this.setState({
      ycText: value,
    });
  }

  handleChangeJd = (e) => {
    this.setState({
      selectorJdValue: e.detail.value,
    });
  };
  handleDateChange = (e) => {
    this.setState({
      dateSel: e.detail.value,
    });
  };
  handleTimeChange = (e) => {
    this.setState({
      timeSel: e.detail.value,
    });
  };

  onSubmit(event) {
    let data = {
      name: this.state.name,
      selectorJdValue: this.state.selectorJd[this.state.selectorJdValue],
      dateSel: this.state.dateSel,
      timeSel: this.state.timeSel,
      ycText: this.state.ycText,
    };
    console.log("data: ", data);
  }
  render() {
    const {
      name,
      selectorJd,
      selectorJdValue,
      dateSel,
      timeSel,
      ycText,
    } = this.state;
    return (
      <View className="container">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <View className="item">
            <View className="panel">
              <View className="panel__content">
                <View className="example-item">
                  <Picker
                    mode="selector"
                    range={selectorJd}
                    value={selectorJdValue}
                    onChange={this.handleChangeJd}
                  >
                    <View className="demo-list-item">
                      <View className="demo-list-item__label">所处阶段</View>
                      <View className="demo-list-item__value">
                        {selectorJd[selectorJdValue]}
                      </View>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <View className="item">
            <View className="panel">
              <View className="panel__content">
                <View className="example-item">
                  <Picker
                    mode="date"
                    value={dateSel}
                    onChange={this.handleDateChange}
                  >
                    <View className="demo-list-item">
                      <View className="demo-list-item__label">录入日期</View>
                      <View className="demo-list-item__value">{dateSel}</View>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <View className="item">
            <View className="panel">
              <View className="panel__content">
                <View className="example-item">
                  <Picker
                    mode="time"
                    value={timeSel}
                    onChange={this.handleTimeChange}
                  >
                    <View className="demo-list-item">
                      <View className="demo-list-item__label">记录时间</View>
                      <View className="demo-list-item__value">{timeSel}</View>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <View className="item">
            <AtInput
              name="value"
              title="记录人员"
              type="text"
              placeholder="填写记录人员姓名"
              value={name}
              onChange={this.handleChangeName.bind(this)}
            />
          </View>

          <View className="item">
            <AtInput
              name="ycText"
              title="异常状况"
              type="text"
              placeholder="填写异常状况"
              value={ycText}
              onChange={this.handleChangeYc.bind(this)}
            />
          </View>

          <View className="buttonGroup">
            <AtButton formType="submit" type="primary">
              提交
            </AtButton>
          </View>
        </AtForm>
      </View>
    );
  }
}

export default Recording;
