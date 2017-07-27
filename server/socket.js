const io=require('socket.io');
const http=require('http');
const redis=require('redis');
const client=redis.createClient({
    host:"rct.redis.cache.chinacloudapi.cn",
    port:6380,
    password:"tIvhKg/PMdcHk8/d8jScxVfN4NrhGMQ7sxY4ear0+3o=",
    ssl:"True",
    abortConnect:"False"
});
function initSocketServer(server) {

    client.on('ready',function () {
        console.log('ready');
    })
    client.on('error',function (error) {
        console.log(error);
    })

    const ioServer=io(server);

    ioServer.on("connection",socket=>{
        const ip=socket.request.connection.remoteAddress;

        console.log(`${ip} is connecting`);
        client.sadd('coll:user:id', `${socket.id}`,function (err) {
            console.log(err);
        });
       console.log(client.exists(ip))
        client.set(ip,socket.id);
        socket.broadcast.emit('user connected',{'id':socket.id})

        socket.on("disconnect",function(){
            console.log(`${ip} is disconnecting`)
            client.srem('coll:user:id', `${socket.id}`,function (err) {
                console.log(err);
            });
            client.del(ip);
        });

        socket.on("updatedoc",function(data){
            console.log('doc updating ')
            console.log(data);
            socket.broadcast.emit('updatedoc',data)

        });

        socket.on("unfreezeDoc",function(data){
            console.log('unfreezeDoc ')
            console.log(data);
            socket.broadcast.emit('unfreezeDoc',data)
        });
    });


    return server;
};

module.exports=initSocketServer;