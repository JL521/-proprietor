// miniprogram/pages/home/toupiao/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    votelist:[],
  },

  votedetail: function(e){

    let data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../votedetail/votedetail?vote='+data,
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
    this.querylist();
  },

  querylist: function(){

    let that = this;
    wx.cloud.callFunction({
      name:'vote',
      data:{
        action:'queryAll',
      },
      success: res => {
        console.log(res.result);
        that.setData({
          votelist:res.result.data
        })
        
      },
      fail: res=>{
        console.log(res);
      }
    })

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