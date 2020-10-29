// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数

exports.main = async (event, context) => {
  console.log("个数是否存在asaa" + event.unitNo);
console.log(event);

  try {
    //order
      return await db.collection('dtxt').add({
      data: {
        unitNo :event.unitNo,
        isAgree : event.isAgree
      }
    });
  } catch (e) {
    console.error(e);
  }
}