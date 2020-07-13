//hot.js
//获取应用实例
import request from "../../utils/request";
const app = getApp()

Page({
  data: {
    category:[],
    gift:[],
    chooseCategory:'null',
    keyword:null,
  },

  onLoad: function () {
    this.searchGift(null,null)
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
    this.setData({
      keyword:e.detail.value
    })
    this.searchGift(this.data.chooseCategory,e.detail.value)
  },
  searchGift:function (categoryId,keyWords) {
    request.get("applets/gift/findByType",{categoryId,keyWords,giftType:'exchange'},res=>{
      if(res.statusCode==200){
        this.setData({
          gift:res.data
        })
      }
    },e=>console.log(e.data.message))
  },
  selectCategory:function (e) {
    let categoryId = e.currentTarget.dataset.id
    this.setData({
      chooseCategory:categoryId
    })
    this.searchGift(categoryId,this.data.keyword)
  },
  selectGift:function (e) {
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url:`/pages/gift/details?id=${id}`,
    })
  }
})
