//hot.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grade:[
      {name:"vip1",minFriendCount:"10-50人",profitRation:'5%'},
      {name:"vip1",minFriendCount:"10-50人",profitRation:'5%'},
      {name:"vip1",minFriendCount:"10-50人",profitRation:'5%'},
      {name:"vip1",minFriendCount:"10-50人",profitRation:'5%'},
    
    ]
  },
  onLoad: function () {

  },
  onShow:function(){
    // if(!app.globalData.rawData){
    //   wx.switchTab({url:"/pages/index/index"})
    // }
  },

})
