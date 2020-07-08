//index.js
//获取应用实例
import request from "../../utils/request";

const app = getApp()

Page({
  data: {
    activity:{},
    wayIndex:0,
    timeIndex:0,
    way:["预定任务","抢购消费"],
    time:[],
    label:[],
    order:[],
  },
  onLoad: function (e) {
    let { id } = e
    request.get(`applets/activity/${id}/find`,null,res=>{
      if(res.statusCode==200){
        let { data } = res
        let time=[]
        data.orderJson=JSON.parse(data.orderJson)
        data.labelJson=JSON.parse(data.labelJson)
        data.appointmentList.forEach(item=>{
          let sDate = item.startTime.split(' ')[0]
          let eDate = item.endTime.split(' ')[0]
          let sTime = sDate.split('-')[1]+'月'+sDate.split('-')[2]+'日'+item.startTime.split(' ')[1]
          let eTime = eDate.split('-')[1]+'月'+eDate.split('-')[2]+'日'+item.endTime.split(' ')[1]
          time.push(sTime+"-"+eTime+",剩余:"+(item.limited-item.current)+'份')
        })
        this.setData({
          activity:data,
          label:data.labelJson,
          order:data.orderJson,
          time
        })
      }
    },e=>console.log(e.data.message))
  },
  onShow: function (e) {

  },
  changeWay:function (e) {
    this.setData({
      wayIndex:e.detail.value
    })
  },
  changeTime:function (e) {
    console.log(e)
  },

})
