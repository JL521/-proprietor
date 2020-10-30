// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {

  var action = event.action;
  if(action=='login'){
    const wxContext = cloud.getWXContext()
    var res = await db.collection('user').where({
       uid:wxContext.OPENID
     }).count();
     if(res.total==0){
       res = await db.collection('user').add({
         data:{
           uid:wxContext.OPENID
         }
       })
     }
     return {
       event,
       openid: wxContext.OPENID,
       appid: wxContext.APPID,
       unionid: wxContext.UNIONID,
       env: wxContext.ENV,
       res:res
     }
  }else if(action=='queryuser'){
    return  await db.collection('user').get({
      success: function (res) {
        return res
      }
    });
  }

  return 0;

}

