//index.js
const app = getApp()

Page({
  data: {
    //当前选中数组的下标值
    customIndex: [0, 0, 0,0],
    //当前选中数组
    onlyArray: [
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30'],
      ['1','2','3','4'],
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30','31','32','33','34'],
      ['01','02','03','04']
    ],
    unitNo:'',
    agreeCount:0,
    disAgreeCount:0,
    array:[],
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.query();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })

              console.log(res.userInfo);

            }
          })
        }
      }
    })
  },

  query: function(e){

    var that = this;

    wx.cloud.callFunction({
      name:"queryuser",
      data:{},
      success:res => {
        console.log('[数据库] [dtxt] : ', res.result)
        that.data.array = res.result.data;
        // console.log('[数据库] [长度] : ', this.data.array[0].isAgree);

        var a = 0,b=0;
        for(var index in this.data.array){

          if(this.data.array[index].isAgree){
            a++;
          }else{
            b++;
          }
        }
      
        that.setData({
          array: res.result.data,
          agreeCount:a,
          disAgreeCount:b
        });
        console.log('[数据库] [长度] : ', that.data.array.length);
        
      }
    });
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {

    wx.cloud.callFunction({
      name:"queryuser",
      data:{},
      success:res => {
        console.log('[数据库] [user] : ', res.result)
      }
    });

    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a:1,
        b:5
      },
      success: res =>{
        console.log('[云函数] [sum] : ', res.result)
      }
    });

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData.name = res.result.name
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  isAgree: function(event){

    var agree = event.currentTarget.dataset.gid,
    customIndex = this.data.customIndex,
    onlyArray = this.data.onlyArray;

    this.data.unitNo = onlyArray[0][customIndex[0]] + '-' + onlyArray[1][customIndex[1]]+ '-' + onlyArray[2][customIndex[2]]+ '-' + onlyArray[3][customIndex[3]]

    console.log('是否同意' + agree);

    if(this.data.unitNo.length==0){
      wx.showToast({
        title: '请先输入单元号',
        icon:'none'
      })
    }else{
  
      var that = this;
       var num = 0;
       wx.cloud.callFunction({
        name:"select",
        data:{
          unitNo:this.data.unitNo,
        },
        success:res => {
          console.log('[增加] [==] : ', res.result)
          num = res.result.total;
          console.log("个数" + num);
      if(num!=0){
        wx.showToast({title:'已选择',icon:'none'});
        return;
      }

      wx.cloud.callFunction({
        name:"adduser",
        data:{
          unitNo:this.data.unitNo,
          isAgree:agree
        },
        success:res => {
          console.log('[增加] [==] : ', res.result)
          this.query();
        },
        fail: err => {
          console.error('[增加] [==] : 调用失败', err)
          
        }
      });

        },
        fail: err => {
          console.error('[增加] [==] : 调用失败', err)
          
        }
      });

      
      
     
      

    }
    
  
    console.log(event.currentTarget.dataset.gid)
  },

  getSearchInput : function(event) {
    this.data.unitNo = event.detail.value;
    console.log(this.data.unitNo);
  },
  
  //多列自定义选择器改变value的方法
  bindCustomPickerChange: function(e) {
      var customIndex = this.data.customIndex,
      onlyArray = this.data.onlyArray;

    console.log('picker发送选择改变，携带值为', e.detail.value);
    //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
    
    console.log('picker最终选择值为：', onlyArray[0][customIndex[0]], onlyArray[1][customIndex[1]], onlyArray[2][customIndex[2]], onlyArray[3][customIndex[3]]);
    this.setData({
      customIndex: e.detail.value
    })
  },

  //多列自创选择器换列方法
  bindCustomPickerColumnChange: function(e) {
      var customIndex = this.data.customIndex,
      onlyArray = this.data.onlyArray;

    customIndex[e.detail.column] = e.detail.value;
    // console.log(onlyArray);

    this.setData({
      onlyArray: onlyArray,
      customIndex: customIndex
    });
  },

})
