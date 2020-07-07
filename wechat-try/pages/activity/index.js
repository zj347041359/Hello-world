//index.js
//获取应用实例
import request from "../../utils/request";

const app = getApp()

Page({
  data: {
    activity:{},

  },
  onLoad: function (e) {
    let {id} = e
    request.get(`applets/activity/${id}/find`,null,res=>{
      if(res.statusCode==200){
        this.setData({
          activity:res.data
        })
      }
    },e=>console.log(e.data.message))
  },
  onShow: function (e) {
  },

})
