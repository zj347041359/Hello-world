//app.js
import request from './utils/request'

App({
  onLaunch: function () {
    // 登录
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           this.globalData.rawData = res.rawData
    //           this.globalData.warrant = true
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     request.post('member/onLogin',{code:res.code},e=> {
    //       if(e.statusCode==200){
    //         if(e.header["x-auth-token"]){
    //           wx.setStorageSync('token', e.header["x-auth-token"])
    //         }
    //         let { data} = e
    //         console.log(data)
    //         if(JSON.stringify(data) == "{}"&&this.globalData.warrant){
    //           wx.navigateTo({url:"/pages/registered/index"})
    //         }else if(data.labelJson&&this.globalData.warrant){
    //           wx.navigateTo({url:"/pages/registered/information/information"})
    //         }else if(JSON.stringify(data) != "{}"){
    //           this.globalData.userInfo = data
    //         }
    //       }else{
    //         wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
    //       }
    //     },e=>{wx.showToast({title: `网络异常`, icon: 'none', duration:3000})})
    //   }
    // })
  },
  globalData: {
    userInfo:null,
    rawData:null,
    warrant:false,
    labelData:[],
  }
})
