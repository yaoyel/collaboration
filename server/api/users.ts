'use strict'
import redis=require('redis');
const client=redis.createClient();
import url=require('url');
import {expand} from "rxjs/operator/expand";

const resBody = (body:any=null, total:number=0, error:boolean=false, msg:string='') => {
    return {
        result: body,
        total: total,
        error: error,
        msg: msg
    }
}

export default (router)=> {
   router.get('/users', (ctx, next) => {
        client.smembers('coll:user:ip')
            .then((user) => ctx.body = resBody(user));
    })
};

