// miniprogram/pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addUser: function(){

    console.log("增加用户");
    wx.cloud.callFunction({
      name:"adduser",
      data:{},
      success:res => {
        console.log('[数据库] [user] : ', res.result)
      },
      fail: err => {
        console.error('数据库] [user] 调用失败', err)
        
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '首页',
    })

   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  push: function(){

    wx.requestSubscribeMessage({
      tmplIds: ['vAHlUKV3TiCgoqXSEJFyfQzSbNBemXmJIQdAMrpRW9w'],
      success(res){
      
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})