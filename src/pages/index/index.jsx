import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'

import './index.scss'

class Index extends Component {
  config = {
  navigationBarTitleText: '首页'
}
handleGetUserInfo =(e) =>{
  console.log('e: ', e);

}
  render () {
    return (
      <View className='container'>
        <View><Text>双胞蘑菇工厂化生产智能管理平台</Text>
        <Button open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo}>点击获取</Button>
        </View>
      </View>
    )
  }
}

export default Index
