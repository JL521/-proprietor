// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


const db = cloud.database()

// 云函数入口函数

exports.main = async (event, context) => {
console.log(event);

  try {
    //order
      return await db.collection('dtxt').get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }
}