//index.js
//获取应用实例
import request from "../../utils/request";

const app = getApp()

Page({
  data: {
    warrant:false,
    title:[{id: 1, title: '新手指南', icon: "../../images/indexIcon1.png"},
      {id: 2, title: '团长招募', icon: '../../images/indexIcon2.png'},
      {id: 3, title: '联系客服', icon: '../../images/indexIcon3.png'}],
    activity:[],
    data:null,

  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.rawData = res.rawData
              this.setData({
                warrant:true
              })
            }
          })
        }
      }
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        request.post('member/onLogin',{code:res.code},e=> {
          if(e.statusCode==200){
            if(e.header["x-auth-token"]){
              wx.setStorageSync('token', e.header["x-auth-token"])
            }
            let { data} = e
            if(JSON.stringify(data) == "{}"&&this.data.warrant){
              wx.navigateTo({url:"/pages/registered/index"})
            }else if(!data.labelJson&&this.data.warrant){
              wx.navigateTo({url:"/pages/registered/information/information"})
            }else if(JSON.stringify(data) != "{}"){
              app.globalData.userInfo = data
            }
          }else{
            wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
          }
        },e=>{wx.showToast({title: `网络异常`, icon: 'none', duration:3000})})
      }
    })

  },
  onShow: function () {
    let _this = this
    if(!app.globalData.userInfo){
      request.get('member/me',null,e=> {
        if(e.statusCode==200){
          app.globalData.userInfo=e.data
          request.get('activity/join/find',null,res=>{
            if(res.statusCode==200){
              console.log(res.data)
              _this.setData({
                activity: res.data
              })
            }
          },e=>console.log(e.data.message))
        }
      },e=>console.log(e.data.message))
    }

  },
  getUserInfo: function(e) {
    let { detail} = e
    if(detail.errMsg == 'getUserInfo:ok'){
      app.globalData.rawData = e.detail.rawData
      this.setData({
        warrant: true
      })
      if(!app.globalData.userInfo){
        wx.navigateTo({url:"/pages/registered/index"})
      }
    }
  },
  join:function (e) {
    console.log(1)
  }
})
