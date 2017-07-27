const redis=require('redis');
const client=redis.createClient({
    host:"rct.redis.cache.chinacloudapi.cn",
    port:6380,
    password:"tIvhKg/PMdcHk8/d8jScxVfN4NrhGMQ7sxY4ear0+3o=",
    ssl:"True",
    abortConnect:"False"
});
const router =require( 'koa-router');

var userRouter=new router();
userRouter.get('/',  async ctx=>{
      console.log(ctx);
        const activeUser=await  client.get(ctx.request.ip);
        const allUser=await client.smembers('coll:user:id')

        ctx.body={activeUser,allUser}}
 ) ;

module.exports= userRouter;