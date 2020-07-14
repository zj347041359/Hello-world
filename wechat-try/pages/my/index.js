//hot.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:null,
  },
  onLoad: function () {
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  onShow:function(){

  },
  details:function (e) {
    let type = e.currentTarget.dataset.type
    if(type=='data'){
      wx.navigateTo({
        url:`/pages/data/data`,
      })
    }
  },
  copy:function (e) {
    let text = e.currentTarget.dataset.text
    wx.setClipboardData({
      data: text,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }

})
