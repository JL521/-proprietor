// miniprogram/pages/notice/publishnotice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isImg:false,
    imgUrl:'../../images/uploadimg.jpg',
    title:'',
    name:'',
    content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  uploadimg: function(){
    //上传图片
  let that = this;
  wx.chooseImage({
   success: chooseResult => {

    that.setData(
      {
        isImg:true,
        imgUrl:chooseResult.tempFilePaths[0]
      }
    )
   },
  })
 
  },

  publish: function(){

    let that = this;

    if(that.data.title.length==0){
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      })
      return;
    }
    if(that.data.name.length==0){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return;
    }
    
    if(that.data.content.length==0){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
      return;
    }

    wx.showLoading({
      title: '',
     })
    if(that.data.isImg){
      let timestamp = (new Date()).valueOf();
       wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: timestamp + '.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: that.data.imgUrl,
        // 成功回调
        success: res => {
         console.log('上传成功', res)
         if (res.fileID) {
          that.setData({
           imgUrl: res.fileID
          })
          that.save();
         }
        },
       }
       )
    }else{
      that.save();
    }
    
  },

  save: function(){

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    var h = date.getHours() < 10 ?'0'+date.getHours():date.getHours();
    var m = date.getMinutes() < 10 ?'0'+date.getMinutes():date.getMinutes();
    let datestr = Y + '-'  + M+ '-' + D + '  ' + h + " : " + m;

    let that = this;
    let imgurl = that.data.isImg ? that.data.imgUrl : '';

    wx.cloud.callFunction({
      name:'notice',
      data:{
        action:'publish',
        title:that.data.title,
        name:that.data.name,
        content:that.data.content,
        imgurl:imgurl,
        time:datestr,
        type:1,
        uid:app.globalData.openid 
      },
      success : res => {
        wx.hideLoading()
        wx.navigateBack({
          delta: 0,
        })

        wx.cloud.callFunction({
          name:'login',
          data:{
            action:'queryuser'
          },
          success: res => {
            console.log(res.result.data);
            for(var i=0;i<res.result.data.length;i++){
              wx.cloud.callFunction({
                name:'push',
                data:{
                  pushtype:1,
                  title:that.data.title,
                  content:that.data.content,
                  uid:res.result.data[i].uid
                }
              })
            }
          }
        })

        

      },
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