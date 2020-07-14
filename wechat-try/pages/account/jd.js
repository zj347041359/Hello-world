//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
    data: {
        value:null,
    },

    onLoad: function (e) {
        let { number } = e
        if(number){
            this.setData({
                value:number
            })
        }
    },
    onShow:function(){

    },
    enter:function (e) {
        let value = e.detail.value
        this.setData({
            value
        })
    },
    sum:function () {
        let value = this.data.value
    }


})
