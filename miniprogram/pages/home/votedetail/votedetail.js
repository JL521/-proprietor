// miniprogram/pages/home/votedetail/votedetail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vote:{},
    unitNo:'',
    votelist:[],
    isAgree:false,
    customIndex: [0, 0, 0,0],
    //当前选中数组
    onlyArray: [
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30'],
      ['1','2','3','4'],
      ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','23','24','25','26','27','28','29','30','31','32','33','34'],
      ['01','02','03','04']
    ],
  },

  isAgree:function(event){
    let that = this;
    var agree = event.currentTarget.dataset.gid;
    that.data.isAgree = agree;
    console.log(agree);
    console.log(that.data.unitNo);

    wx.cloud.callFunction({
      name:'vote',
      data:{
        action:'insert',
        unitNo:that.data.unitNo,
        vid:that.data.vote._id,
        isAgree:that.data.isAgree,
        uid:app.globalData.openid,
        type:0
      },
      success: res => {
        console.log(res);
        if(res.result['code']==400){
          wx.showToast({
            title: res.result['body'],
            icon: 'none',
          })
        }else{
          wx.navigateBack({
            delta: 0,
          })
        }
        
      },
      fail: res => {
        console.log(res.errMsg)
      }
    })

    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let dyh = this.data.onlyArray[0][this.data.customIndex[0]] + '-' + this.data.onlyArray[1][this.data.customIndex[1]] + '-' +  this.data.onlyArray[2][this.data.customIndex[2]] + this.data.onlyArray[3][this.data.customIndex[3]];
    let data = JSON.parse(options.vote)
    this.setData({
      vote:data,
      unitNo:dyh
    })
    this.querylist();

  },

  querylist: function(){
    let that = this;
    wx.cloud.callFunction({
      name:'vote',
      data:{
        action:'querydetail',
        vid:that.data.vote._id
      },
      success: res => {
        console.log(res.result);
        that.setData({
          votelist:res.result.data
        })
      },
      fail: res =>{
        console.log(res.errMsg);
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
  let dyh = onlyArray[0][customIndex[0]] + '-' + onlyArray[1][customIndex[1]] + '-' +  onlyArray[2][customIndex[2]] + onlyArray[3][customIndex[3]];
  this.setData({
    customIndex: e.detail.value,
    unitNo:dyh
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