import request from '../../utils/request'

const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {


  },

  formSubmit:function (e) {
    let { invitationCode, phone} = e.detail.value
    if(!invitationCode){
      wx.showToast({title: `请填入邀请码`, icon: 'none', duration:3000})
      return false
    }
    if(!phone){
      wx.showToast({title: `请填入手机号`, icon: 'none', duration:3000})
      return false
    }
    request.post("member/registered",{ invitationCode, phone, rawData:app.globalData.rawData },e=>{
      wx.showToast({title: `注册成功`, icon: 'success',
        success(){
          setTimeout(()=>{
            wx.hideToast({success() {
              wx.navigateTo({url: "/pages/registered/information/information"})
            }
          })

          },2000)
        }})
      // wx.showModal({
      //   content: '注册成功',
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    },e=>{wx.showToast({title: `网络异常`, icon: 'none', duration:3000})})
  }
})
