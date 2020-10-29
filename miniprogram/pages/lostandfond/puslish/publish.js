// miniprogram/pages/lostandfond/puslish/publish.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customIndex: [0, 0, 0,0],
    //当前选中数组
    onlyArray: [
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30'],
      ['1','2','3','4'],
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30','31','32','33','34'],
      ['01','02','03','04']
    ],
    isImg:false,
    imgUrl:'../../../images/uploadimg.jpg',
    title:'',
    name:'',
    phone:'',
    content:'',
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
    if(that.data.phone.length==0){
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
      })
      return;
    }
    if(that.data.content.length==0){
      wx.showToast({
        title: '请输入描述内容',
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
    let datestr = Y + '-'  + M+ '-' + D;

    let that = this;
    let imgurl = that.data.isImg ? that.data.imgUrl : '';

    wx.cloud.callFunction({
      name:'lostAndfond',
      data:{
        action:'publish',
        title:that.data.title,
        name:that.data.name,
        phone:that.data.phone,
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
      },
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