// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  // env:'prod-3gii03mg684a6bb5'
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