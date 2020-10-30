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
    
    if(action=='banner'){
      return await db.collection('banner').get({
        success: function (res) {
          return res
        }
      });
    } 
  } catch (e) {
    return e;
  }
  
}