// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  
  var action = event.action;
  
  try {
    
    if(action=='publish'){
      return await db.collection('notice').add({
        data: {
          title :event.title,
          name : event.name,
          time:event.time,
          uid:event.uid,
          content:event.content,
          imgurl:event.imgurl,
          type:event.type
        }
      });
    }else if(action=='queryAll'){
      return await db.collection('notice').get({
        success: function (res) {
          return res
        }
      });
    }
      
  } catch (e) {
    return e;
  }

}