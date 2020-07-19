//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
    data: {
        address:null,
        editData:null,
    },

    onLoad: function () {

    },
    onShow:function(){
        request.get('member/find/address',null,res=>{
            if(res.statusCode==200){
                this.setData({
                    address:res.data
                })
            }
        },e=>console.log(e.data.message))
    },
    add:function () {
        wx.navigateTo({
            url:`/pages/address/new`,
        })
    },
    edit:function (e) {
        let data = e.currentTarget.dataset.address
        this.setData({
            editData:data
        })
        wx.navigateTo({
            url:`/pages/address/edit`,
        })
    },
    select:function (e) {
        let data = e.currentTarget.dataset.address
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        prevPage.setData({
            selectAddress:data
        })
        wx.navigateBack();
    }

})
