export async function request(url, options){

}

export async function fetchRequest(url, options){
    let opts = options?options:{};
    if (!opts.body && opts.data) {
        //对于GET、DELETE请求，加在URL上面
        if (!opts.method || opts.method.match(/GET|DELETE/i)) {
            let params = {};
            for (let x in opts.data) {
                if (opts.data[x] != null) {
                    //针对page做特殊处理，因为后台需要的页号是从0开始，前端的页号需要转换一下
                    if (x === 'page') {
                        params[x] = parseInt(opts.data[x]) - 1;
                    } else if (opts.data[x] instanceof Array) {
                        params[x] = opts.data[x].join(",");
                    } else if (typeof (opts.data[x]) === 'object') {
                        params[x] = JSON.stringify(opts.data[x]);
                    } else {
                        params[x] = opts.data[x];
                    }
                }
            }
            opts.data = params;
        } else {
            if (opts.data && typeof (opts.data) === 'object') {
                //非GET、DELETE请求
                let params = [];
                for (let x in opts.data) {
                    if (opts.data[x] != null) {
                        if (opts.data[x] instanceof Array) {
                            params.push(x + "=" + encodeURI(opts.data[x].join(',')));
                        } else {
                            params.push(x + "=" + encodeURI(opts.data[x]));
                        }
                    }
                }
                if (!opts.header) {
                    opts.header = {};
                }
                opts.header['Content-Type'] = 'application/x-www-form-urlencoded';
                opts.data = params.join("&");
            }
        }
    } else if (opts.body && typeof (opts.body) === 'object') {
        // opts.body = JSON.stringify(opts.body);
        if (!opts.header) {
            opts.header = {};
        }
        opts.header['Content-Type'] = 'application/json';
        //小程序只接受data字段名
        opts.data = opts.body;
    }

    if (!opts.header) {
        opts.header = {};
    }

    //加入cookies
    let token = wx.getStorageSync('token');
    if (token) {
        opts.header['x-auth-token'] = token;
    }
    opts.header['x-user-agent'] = 'miniprogram';
    return await wx.request({
        url: 'https://URL',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
            // success
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    })({url: targetUrl, ...opts})
    // if(this.globalData.token){
    //     options.header["x-auth-token"] = this.globalData.token
    // }
    // options.header["x-user-agent"] = "miniprogram"
}

const http = (method, url, data, header, response, error) => {
    // if (hasClick) {
    //   return
    // }
   // hasClick = true

    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.request({
      method: method,
      url: `http://192.168.50.240:1800/${url}`,
      header: {
        'content-type': 'application/json',
        "x-user-agent":"miniprogram",
        'x-auth-token': wx.getStorageSync("token"),
        ...header
       },
      data:data,
      success: res => {
          if(res.statusCode==200){
               response(res)
          }else{
               error(res)
          }

      },
      fail: err => {
          wx.showToast({title: `网络异常`, icon: 'none', duration:3000})
      },
      complete: info => {
        wx.hideLoading();
       // hasClick = false
      }
    })
}
module.exports = {
    get: (url, data, response, error) => http('GET', url, data,{}, response, error),
    post: (url, data, response, error) => http('POST', url, data,{'content-type': 'application/x-www-form-urlencoded'}, response, error),
  }
