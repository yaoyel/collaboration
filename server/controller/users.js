const redis=require('then-redis');
const client=redis.createClient();
const router =require( 'koa-router');

var userRouter=new router();
userRouter.get('/',  async ctx=>{
        const activeUser=await  client.get(ctx.request.ip);
        const allUser=await client.smembers('coll:user:id')

        ctx.body={activeUser,allUser}}
 ) ;

module.exports= userRouter;