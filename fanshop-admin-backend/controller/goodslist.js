// 这里的路由写的是与商品管理有关的
const Router = require('koa-router')
const router = new Router()
const callCloudFunction = require("../untils/callCloudFunction.js")
const callCloudDB = require("../untils/callCloudDB.js")

// 获取商品列表
router.get('/list', async (ctx, next) => {
    // 触发云函数 通过云函数获取商品列表   发送Post请求
    const query = ctx.request.query;  // 获取请求参数
    console.log(query);
    
    const options = {
        $url: "goodList",
        start: parseInt(query.start),
        count: parseInt(query.count)
    }
    let goodslist = []

    const res = await callCloudFunction(ctx, 'goods', options)
    if(res.resp_data){
        goodslist = JSON.parse(res.resp_data).data
    }
    ctx.body = {
        data: goodslist,
        code: 20000
    }
})

// httpApi 操作云数据库  
router.get('/getById',async(ctx,next)=>{
    //bug
    const query = `db.collection('playlist').where({_id:"${ctx.request.query.id}"}).get()`
    let res = await callCloudDB(ctx,'databasequery',query)
    // console.log(res)  // ???
    let music= {}
    if(res.data){
       music = JSON.parse(res.data)
    }
    ctx.body = {
        data:music,
        code:20000,
    }
})

// 添加商品数据   
router.post('/addGoods',async(ctx,next)=>{
    let params = ctx.request.body.data;   // 获取请求体中内容
    const query = `db.collection('goodslist').add({
        data:{
            Id: '${params.Id}',
            title: '${params.title}',
            price: '${params.price}',
            supplier:'${params.supplier}',
            mack:'${params.mack}',
            nice:'${params.nice}',
            type_one:'${params.type_one}',
            type_two:'${params.type_two}',
            img_url:'${params.src}',
            img_list_url:'${params.img_list_url}'
        }
    })`;
   let res = await callCloudDB(ctx,'databaseadd',query)
   ctx.body = {
       code:20000,
       data:res
   }
})
// 更新商品数据   
router.post('/updatePlaylist',async(ctx,next)=>{
    const params = ctx.request.body;   // 获取请求体中内容
    const query = `db.collection('goodslist').where({_id:'${params._id}'})
    .update({
        data:{
            name:'${params.name}',
            copywriter:'${params.copywriter}'
        }
    })`;
   let res = await callCloudDB(ctx,'databaseupdate',query)
   ctx.body = {
       code:20000,
       data:res
   }
})

// 删除商品数据
router.get('/del',async(ctx,next)=>{
    const params = ctx.request.query
    const query = `db.collection('goodslist').where({Id:'${params.id}'}).remove()`;
    let res = await callCloudDB(ctx,'databasedelete',query)
    ctx.body = {
        code:20000,
        data:res
    }
})
module.exports = router