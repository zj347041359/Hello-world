import request from '../../../utils/request'

const app = getApp()

Page({
    data: {
        labelData:[],
        labelType:{},
        chooseLabel:{},
        labelJson:{},
        gender:null,
        age:null,
        city:null,
        province:null,
    },
    onLoad: function (e) {
        request.get('labelType/applets/findAll',null,e=> {
            if(e.statusCode==200){
                //app.globalData.labelData = e.data
                if(e.data){
                    let data = {}
                    e.data.forEach(item=>{
                        data[item.id]=item
                    })
                    this.setData({
                        labelData:e.data,
                        labelType:data
                    })
                }
            }else{
                wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
            }
        },e=>{wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
        })
        this.setData({
            gender:e.gender,
            age:e.age,
            city:e.city,
            province:e.province
        })
    },
    chooseLabel:function (e) {
        if(e.currentTarget.dataset.label){
            let labelType = e.currentTarget.dataset.type
            let label = e.currentTarget.dataset.label
            let labelData = this.data.chooseLabel
            if(labelData[label]){
                labelData[label] = false
                let data = this.data.labelJson
                let newData = new Set(data[labelType])
                data[labelType]=Array.from(newData.delete(label))
                this.setData({
                    labelJson: data,
                    chooseLabel: labelData
                })
            }else{
                let data = this.data.labelJson
                if(!data[labelType]){data[labelType]=[]}
                if(data[labelType].length<this.data.labelType[labelType].maxChoices){
                    labelData[label] = true
                    let newData = new Set(data[labelType])
                    data[labelType]=Array.from(newData.add(label))
                    this.setData({
                        labelJson: data,
                        chooseLabel: labelData
                    })
                }else{
                    wx.showToast({title: `该标签最多可选${this.data.labelType[labelType].maxChoices}个`, icon: 'none', duration:3000})
                }
            }
        }
    },
    submit:function () {
        let { labelJson, labelData} = this.data
        let num = 0
        for(let key in labelJson){
            if(labelJson[key].length>0){
                num+=1
            }
        }
        if(num==labelData.length){
            let newData = []
            for(let key in labelJson){
                newData.push({labelType:key,labels:labelJson[key]})
            }
            let { gender, age, city, province} = this.data
            request.post('member/supplement',{gender, age, city, province,labelJson: JSON.stringify(newData)},e=> {
                if(e.statusCode==200){
                    wx.switchTab({url:'/pages/index/index'})
                }else{
                    wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
                }
            },e=>{wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
            })

        }else{
            wx.showToast({title: `每个类型最少选择一个标签`, icon: 'none', duration:3000})
        }
    }
})
