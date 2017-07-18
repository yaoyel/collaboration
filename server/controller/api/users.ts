import koaRouter=require('koa-router');
const router=new koaRouter();

import url=require('url');


router.get('/',async(ctx,next)=>{
    ctx.body= ctx.applicationServerKey
})