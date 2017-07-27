/**
 * Created by YBC on 2017/7/21.
 */
export default function (socket) {

    return ({dispath,getState})=>next=>action=>{
        if(action.Type=="SEND_MESSAGE")
        {
            socket.emit(action.payload.messageType, action.payload.message);
        }
       if(!action.meta)
           next(action);
       if(action.meta) {
           console.log(action)
           socket.emit(action.meta.messageType, {text:action.payload.midifiedText,depth:action.meta.depth,startOffset:action.meta.startOffset,endOffset:action.meta.endOffset});
       }
       next(action);
    };

}