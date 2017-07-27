import {createAction,Action} from 'redux-actions';
import {assign} from 'lodash';

import {User,Doc,Lock} from './model';

import {
    FETCH_USERS,
    SEND_MESSAGE,
    RECEIVE_USERS,
    ADD_USER,
    REMOVE_USER,
    UPDATE_DOC,
    ADD_LOCK,
    REMOVE_LOCK,
    FREEZE_DOC,
    UNFREEZE_DOC

} from './constants/ActionTypes';

 function fetchUsers() {
    return {
        type: FETCH_USERS,
        payload:null
    };
}


function sendMessage(messageType,message) {
    return {
        type: SEND_MESSAGE, payload: ({messageType, message})
    }
};

 function freezeDoc(depth:number){
     return{
         type:FREEZE_DOC,
         payload:({depth:depth})
     }
 }

function unFreezeDoc(){
    return{
        type:UNFREEZE_DOC,
        payload:''
    }
}


const receiveUsers=createAction<string[],any>(
    RECEIVE_USERS,
    (users:any)=><any>users
);

const addUser=createAction<User,string>(
    ADD_USER,
    (id:string)=>(<User>{id:id})
);


const removeUser=createAction<User,string>(
    REMOVE_USER,
    (id:string)=>(<User>{id:id})
);

const addLock=createAction<Lock,Lock>(
    ADD_LOCK,
    (lock:Lock)=>lock
);

const removeLock=createAction<Lock,string>(
    REMOVE_LOCK,
     (num:string)=>(<Lock>{id:num})
);

const updateDoc=createAction<Doc,meta>(
    UPDATE_DOC,
    (meta:meta)=>(<Doc>{ midifiedText:meta.midifiedText,depth:meta.depth,allText:meta.allText,updateFromSocket:meta.updateFromSocket}),
);

const socketForUpdateDoc=createAction<Doc,meta>(
     SEND_MESSAGE,
     (meta:meta):any=>({messageType:"updatedoc",message:{depth:meta.depth,updateFromSocket:true,endOffset:meta.endOffset,startOffset:meta.startOffset, midifiedText:meta.midifiedText,activeUser:meta.activeUser}})
);

interface  meta{
    allText:string,
    midifiedText:string,
    depth:number,
    updateFromSocket:boolean,
    endOffset:number,
    startOffset:number,
    activeUser:string
}

export {freezeDoc,unFreezeDoc,meta,sendMessage,fetchUsers,receiveUsers,addLock,addUser,removeLock,removeUser,updateDoc,socketForUpdateDoc}