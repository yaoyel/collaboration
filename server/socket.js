const io=require('socket.io');
const http=require('http');
const ipSet=new Set();
function initSocketServer(app) {

    var server=http.Server(app.callback());
    io(server).on("connect",socket=>{
        console.log(socket.request.connection.remoteAddress);


        socket.broadcast.emit('user connected',{'ip':socket.request.connection.remoteAddress})
    })
    return server;
};

module.exports=initSocketServer;