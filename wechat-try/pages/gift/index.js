//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
  data: {
    category:[],
    gift:[],
    chooseCategory:null,
  },

  onLoad: function () {
    this.searchGift()
    request.get("category/find/byType",{categoryType:'gift'},res=>{
      if(res.statusCode==200){
        this.setData({
          category:res.data
        })
      }
    },e=>console.log(e.data.message))
  },
  onShow:function(){

  },
  search: function (e) {
    console.log(e.detail.value)
  },
  searchGift:function (page,categoryId,keyWords) {
    request.get("applets/gift/findByType",{page,categoryId,keyWords,giftType:'exchange'},res=>{
      if(res.statusCode==200){
        this.setData({
          gift:res.data
        })
      }
    },e=>console.log(e.data.message))
  }
})
