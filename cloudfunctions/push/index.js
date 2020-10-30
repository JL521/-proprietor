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

  var pushtype = event.pushtype;
  var result='';
  if(pushtype==1){//通知公告
    result = cloud.openapi.subscribeMessage.send(
      {
        touser: event.uid,           //要发送用户的openid
          page: 'pages/notice/notice',        //用户通过消息通知点击进入小程序的页面
          lang: 'zh_CN',      
          data: {           //要发送的数据，这里需要注意的事项，我在下面说
            thing3:{
              value:event.title
            },
            thing12:{
              value:event.content
            }
          },
          templateId: 'x9bHH5SLsnTzDbpi2vAFJQTq76bntrVqEUqVZjZE7rQ',   //订阅消息模板ID
          miniprogramState: 'trial'   
      }
    )
  }
  return result;
  
}