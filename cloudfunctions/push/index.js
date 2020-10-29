// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const result = cloud.openapi.subscribeMessage.send(
    {
      touser: event.openid,           //要发送用户的openid
        page: 'pages/home/home',        //用户通过消息通知点击进入小程序的页面
        lang: 'zh_CN',      
        data: {           //要发送的数据，这里需要注意的事项，我在下面说
          thing1:{
            value:event.title
          },
          time2:{
            value:event.time
          },
          thing3:{
            value:event.msg
          }
        },
        templateId: 'vAHlUKV3TiCgoqXSEJFyfQzSbNBemXmJIQdAMrpRW9w',   //订阅消息模板ID
        miniprogramState: 'trial'   
    }
  )
  return result;
  
}