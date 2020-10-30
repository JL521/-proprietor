// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const _ = db.command
const $ = _.aggregate
const result={
  code:'',
  body:''
}
// 云函数入口函数
exports.main = async (event, context) => {
  
  var action = event.action;
  console.log(event.action);
  
  try {
    
    if(action=='publish'){//发起投票
      return await db.collection('vote').add({
        data: {
          title :event.title,
          time:event.time,
          uid:event.uid,
          content:event.content,
          type:event.type
        }
      });
    }else if(action=='queryAll'){//查看投票列表

      var list = await db.collection('vote').get(
        (res) => {
          return res;
        }
      )
      for(var i=0;i<list.data.length;i++){
        var item = list.data[i];
        var agree = await db.collection('votelist').where({
          isAgree:true,
          vid:item._id
        }).count();
        item['agreecount'] = agree.total;
        var disa = await db.collection('votelist').where({
          isAgree:false,
          vid:item._id
        }).count();      
        item['disagreecount'] = disa.total;
     }
      return list;

    }else if(action=='insert'){//插入投票结果
      return new Promise((resolve,reject) => {
        db.collection('votelist').where({
          uid:_.eq(event.uid),
          vid:_.eq(event.vid),
      }).get().then((res) => {
        if(res.data.length>0){
          result.code = 400;
          result.body = '您已作出选择';
          resolve(result);
        }else{
          db.collection('votelist').add({
            data:{
              uid:event.uid,
              vid:event.vid,
              type:event.type,
              unitNo:event.unitNo,
              isAgree:event.isAgree
            }
          }).then((res)=>{
            result.code = 200;
            result.body = res;
            resolve(result)
          });
        }
      });
      })
    }else if(action=='querydetail'){
      return await db.collection('votelist').where(
        {
          vid:_.eq(event.vid),
        }
      ).get({
        success: function (res) {
          return res
        }
      });
    }
      
  } catch (e) {
    return e;
  }

}