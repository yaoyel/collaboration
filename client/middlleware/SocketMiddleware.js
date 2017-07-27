/**
 * Created by YBC on 2017/7/21.
 */
export default function (socket) {

    return ({dispath,getState})=>next=>action=>{
        if(action.type=="SEND_MESSAGE")
            socket.emit(action.payload.messageType,action.payload.message);
       next(action);
    };

}