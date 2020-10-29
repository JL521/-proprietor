// miniprogram/pages/lostandfond/lostList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    lostList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  queryList: function(){

    let that = this;
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name:'lostAndfond',
      data:{
        action:'queryAll',
      },
      success : res => {
        wx.hideLoading()
        that.setData({
          lostList:res.result.data
        })
        console.log(that.data.lostList);
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.queryList();
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