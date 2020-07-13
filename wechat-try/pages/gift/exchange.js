//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
    data: {
        giftData:{},
        number :1,
        address:null,
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
        if(this.data.address){

        }
    },
    index:function () {
        wx.redirectTo({
            url:`/pages/gift/index`,
        })
    },
    exchange:function () {

    },
    add:function () {
        this.setData({
            number:this.data.number+1
        })
    },
    less:function () {
        let num = this.data.number
        if(num>0){
            this.setData({
                number:this.data.number-1
            })
        }
    },

})
