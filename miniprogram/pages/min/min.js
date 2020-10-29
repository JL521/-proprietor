// miniprogram/pages/min/min.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(app.globalData.openid)

    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.getuser();
  },
  
  push: function(){
    wx.cloud.callFunction({
      name:'push',
      data:{
        openid:app.globalData.openid,
        title:'二手物品',
        time:'2020-10-22',
        msg:'测试小实习'
      },
      success(res){
        console.log(res.result);
      },
      fail(res){
        console.log('失败',res);
        wx.showToast({
          title: res.errMsg,
        })
      }
    })
  },

  getuser: function(){
   
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
        console.log(res.userInfo);
      },
      fail: res => {
        console.log(res.errMsg);
      }
    })
  }
})