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
    endTime:[],
    countdownTime:[],

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
          request.get('applets/activity/join/find',null,res=>{
            if(res.statusCode==200){
              let endTime = []
              let { data } = res
              data.forEach(item=>{
                let time = item.registrationETime.replace(/-/g, "/")+' 23:59:59'
                 endTime.push(new Date(time).getTime())
              })
              _this.setData({
                activity: data,
                endTime
              })
              _this.countdown()
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
  countdown:function(){
    let endTime = this.data.endTime
    let thisTime = new Date().getTime()
    let countdownTime = []
    endTime.forEach(item=>{
      let countdown
      if(item>thisTime){
        let time = (item-thisTime)/1000
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        countdown=day?`${day}天${hou}时${min}分${sec}秒`:`${hou}时${min}分${sec}秒`
      }else{
        countdown='0时00分00秒'
      }
      countdownTime.push(countdown)
    })
    this.setData({countdownTime})
    setTimeout(this.countdown,1000)
  },
  join:function (e) {
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url:`/pages/activity/index?id=${id}`,
    })
  }
})
