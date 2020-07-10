//hot.js
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
        gift:[],
        chooseOrder:{},
        chooseGift:null,
    },
    onLoad: function (e) {
        let { id } = e
        request.get(`applets/activity/${id}/find`,null,res=>{
            if(res.statusCode==200){
                let { data } = res
                let time=[]
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
                    order:data.ordersList,
                    gift:data.giftsList,
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
        this.setData({
            timeIndex:e.detail.value
        })
    },
    selectOrder:function (e) {
        let { chooseOrder} = this.data
        let id =e.currentTarget.dataset.id
        chooseOrder[id]?chooseOrder[id]=false:chooseOrder[id]=true
        this.setData({
            chooseOrder
        })
    },
    selectGift:function (e) {
        let id =e.currentTarget.dataset.id
        if(this.data.chooseGift==id){
            this.setData({
                chooseGift:null
            })
        }else{
            this.setData({
                chooseGift:id
            })
        }

    }
})
