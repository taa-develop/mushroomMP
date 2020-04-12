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
      assayRecording: "",
      rawMaterial: "",
      Ingredients: "",
      recordingName: "",
      ycText: "",
      selectorJd: ["空阶段", "发菌阶段", "覆土阶段", "最后阶段"],
      selectorJdValue: 0,
      selectorLc: ["一号料仓", "二号料仓", "三号料仓", "四号料仓", "五号料仓"],
      selectorLcValue: 0,
      dateSel: dayjs().format("YYYY-MM-DD"),
      timeSel: dayjs().format("HH:mm")
    };
  }

  componentWillMount() {
    let id = this.$router.params.id;
    console.log("id: ", id);
  }

  componentDidMount() {}

  config = {
    navigationBarTitleText: "隧道生产指标录入"
  };

  handleChangeName(value, name) {
    this.setState({
      [name.currentTarget.id]: value
    });
  }

  handleChangeJd = e => {
    this.setState({
      selectorJdValue: e.detail.value
    });
  };
  handleChangePc = e => {
    this.setState({
      selectorLcValue: e.detail.value
    });
  };
  handleDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    });
  };
  handleTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    });
  };

  onSubmit(event) {
    let data = {
      assayRecording: this.state.assayRecording,
      rawMaterial: this.state.rawMaterial,
      Ingredients: this.state.Ingredients,
      recordingName: this.state.recordingName,
      selectorJdValue: this.state.selectorJd[this.state.selectorJdValue],
      selectorLcValue: this.state.selectorLc[this.state.selectorLcValue],
      dateSel: this.state.dateSel,
      timeSel: this.state.timeSel
    };
    console.log("data: ", data);
  }
  handleComplete = () => {
    console.log("complete");
  };
  render() {
    const {
      selectorJd,
      selectorJdValue,
      selectorLc,
      selectorLcValue,
      dateSel,
      timeSel,
      assayRecording,
      rawMaterial,
      Ingredients,
      recordingName,
      ycText
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
                    range={selectorLc}
                    value={selectorLcValue}
                    onChange={this.handleChangePc}
                  >
                    <View className="demo-list-item">
                      <View className="demo-list-item__label">选择料仓</View>
                      <View className="demo-list-item__value">
                        {selectorLc[selectorLcValue]}
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
              name="rawMaterial"
              title="原料"
              type="text"
              placeholder="填写原料"
              value={rawMaterial}
              onChange={this.handleChangeName.bind(this)}
            />
          </View>

          <View className="item">
            <AtInput
              name="Ingredients"
              title="配料"
              type="text"
              placeholder="填写配料"
              value={Ingredients}
              onChange={this.handleChangeName.bind(this)}
            />
          </View>
          <View className="item">
            <AtInput
              name="assayRecording"
              title="化验记录"
              type="text"
              placeholder="填写化验记录"
              value={assayRecording}
              onChange={this.handleChangeName.bind(this)}
            />
          </View>
          <View className="item">
            <AtInput
              name="recordingName"
              title="记录人员"
              type="text"
              placeholder="填写记录人员姓名"
              value={recordingName}
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
              onChange={this.handleChangeName.bind(this)}
            />
          </View>
          <View className="buttonGroup">
            <AtButton formType="submit" type="primary">
              提交记录
            </AtButton>
            <AtButton type="secondary" onClick={this.handleComplete}>
              完成阶段
            </AtButton>
          </View>
        </AtForm>
      </View>
    );
  }
}

export default Recording;
