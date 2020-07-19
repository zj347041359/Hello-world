//hot.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo:{},
    },
    onLoad: function () {
        this.setData({
            userInfo:app.globalData.userInfo
        })
    },
    onShow:function(){
        // if(!app.globalData.rawData){
        //   wx.switchTab({url:"/pages/index/index"})
        // }
    },
    details:function (e) {
        let type = e.currentTarget.dataset.type
        if(type=='address'){
            wx.navigateTo({
                url:`/pages/address/details`,
            })
        }
    },


})
