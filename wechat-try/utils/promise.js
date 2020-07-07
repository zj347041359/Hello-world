
export async function httpPromise( url, data, method,header) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: `http://192.168.50.240:1800/${url}`,
        method: method,
        data: data,
        header: {
            'content-type': 'application/json',
            "x-user-agent":"miniprogram",
            'x-auth-token': wx.getStorageSync("token"),
            ...header
        },
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          // fail调用接口失败
          reject(res);
        },
      })
    })
  }

export function httpGet(url, data) {
   return  httpPromise(url, data, "GET")
}
export function httpPost(url, data) {
    return httpPromise(url, data, "POST",{'content-type': 'application/x-www-form-urlencoded'})
}

export function errorMsg(e){
    wx.showToast({
        title: `${e.errMsg},请重试`,
        icon: 'none',
        duration:3000
    })
}


