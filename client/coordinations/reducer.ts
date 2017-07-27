import {assign} from 'lodash';
import {handleActions,Action} from 'redux-actions';

import {User,Doc,Lock,IState} from './model';

import {ADD_LOCK, REMOVE_LOCK, ADD_USER, REMOVE_USER, UPDATE_DOC, FETCH_USERS,RECEIVE_USERS} from './constants/ActionTypes';
import {meta} from "./actions";

const initalState:IState= {
    Users: []=[], Locks: []=[], Doc: (<Doc>{router: "/first"})
};

const userReducer= handleActions<User[],User>({

    [RECEIVE_USERS]:(state:User[],action:Action<any>): User[]=>{

        const receiveUser=[]
            action.payload.allUser.map(p=>{
                let user=<User>{id:p,nickName:p.substr(0,3),isActive:p==action.payload.activeUser}
               receiveUser.push(user);
            });
      return [...receiveUser,...state]
    },
    [ADD_USER]: (state: User[], action: Action<User>): User[] => {
        return [(<User>{
            id:action.payload.id,
            nickName:action.payload.id.substr(0,3)
        }), ...state];
    },

    [REMOVE_USER]: (state: User[], action: Action<User>): User[] => {
        return state.filter(user => user.id != action.payload.id);
    }
},initalState.Users);

const  lockReducer=handleActions<Lock[],Lock>({

        [ADD_LOCK]: (state: Lock[], action: Action<Lock>): Lock[] => {
            return [action.payload, ...state];
        },

        [REMOVE_USER]: (state: Lock[], action: Action<Lock>): Lock[] => {
            return state.filter(lock => lock.id != action.payload.id);
        }

},initalState.Locks);

const docReducer=handleActions<Doc,Doc>({
    [UPDATE_DOC]:(state:Doc,action:Action<Doc>):Doc=>{
         return assign({},state,{midifiedText:action.payload.midifiedText,depth:action.payload.depth});
    }
},initalState.Doc);

export {userReducer,lockReducer,docReducer}