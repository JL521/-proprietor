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
    
    if(action=='publish'){
      return await db.collection('lostAndfond').add({
        data: {
          title :event.title,
          name : event.name,
          time:event.time,
          phone:event.phone,
          uid:event.uid,
          content:event.content,
          imgurl:event.imgurl,
          type:event.type
        }
      });
    }else if(action=='queryAll'){
      return await db.collection('lostAndfond').get({
        success: function (res) {
          return res
        }
      });
    }
      
  } catch (e) {
    return e;
  }

}