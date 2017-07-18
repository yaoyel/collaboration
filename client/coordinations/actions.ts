import {createAction,Action} from 'redux-actions';
import {assign} from 'lodash';

import {User,Doc,Lock} from './model';

import {
    ADD_USER,
    REMOVE_USER,
    UPDATE_DOC,
    ADD_LOCK,
    REMOVE_LOCK
} from './constants/ActionTypes';

const addUser=createAction<User,string>(
    ADD_USER,
    (nickName:string)=>(<User>{nickName:nickName})
);


const removeUser=createAction<User,number>(
    REMOVE_USER,
    (num:number)=>(<User>{id:num})
);

const addLock=createAction<Lock,Lock>(
    ADD_LOCK,
    (lock:Lock)=>lock
);

const removeLock=createAction<Lock,number>(
    REMOVE_LOCK,
     (num:number)=>(<Lock>{id:num})
);

const updateDoc=createAction<Doc,Doc,string>(
    UPDATE_DOC,
    (doc:Doc,text:string)=>(<Doc>{text:text})
);

export {addLock,addUser,removeLock,removeUser,updateDoc}