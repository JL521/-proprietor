// miniprogram/pages/home/publishvote/publishvote.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title:'',
    content:''

  },

  publish: function(){

    let that = this;
    if(that.data.title.length==0){
      wx.showToast({
        title: '请输入投票标题',
        icon:'none'
      })
      return;
    }
    if(that.data.content.length==0){
      wx.showToast({
        title: '请输入投票简述',
        icon:'none'
      })
      return;
    }
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    let datestr = Y + '-'  + M+ '-' + D;

    wx.showLoading();
    wx.cloud.callFunction({
      name:'vote',
      data:{
        action:'publish',
        title:that.data.title,
        content:that.data.content,
        uid:app.globalData.openid,
        type:0,
        time:datestr
      },
      success: res => {
        wx.hideLoading()
        wx.navigateBack({
          delta: 0,
        })
      }
    })

  },

  inputedit: function(e){

    let that = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    let key = dataset.name;
    that.data[key] = value;
    that.setData({
      key:that.data[key]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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