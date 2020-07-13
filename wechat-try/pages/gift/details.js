//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
    data: {
        giftData:{},
    },

    onLoad: function (e) {
        let { id } = e
        request.get(`gift/${id}/find`,null,res=>{
            if(res.statusCode==200){
                console.log(res.data)
                this.setData({
                    giftData:res.data
                })
            }
        },e=>console.log(e.data.message))
    },
    onShow:function(){

    },
    index:function () {
        wx.redirectTo({
            url:`/pages/gift/index`,
        })
    },
    exchange:function () {
        let id =this.data.giftData.id
        wx.redirectTo({
            url:`/pages/gift/exchange?id=${id}`,
        })
    }

})
