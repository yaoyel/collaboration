import {assign} from 'lodash';
import {handleActions,Action} from 'redux-actions';

import {User,Doc,Lock,IState} from './model';

import {ADD_LOCK,REMOVE_LOCK,ADD_USER,REMOVE_USER,UPDATE_DOC} from './constants/ActionTypes';

const initalState:IState={
    Users:[<User>{}],
    Locks:[<Lock>{}],
    Doc:(<Doc>{router:"/first",text:"测试一下下"})
};

const userReducer= handleActions<User[],User>({
    [ADD_USER]: (state: IState, action: Action<User>): User[] => {
        return [(<User>{
            id:state.Users.reduce((maxId,user)=>Math.max(user.id,maxId),1)+1,
            nickName:action.payload.nickName
        }), ...state.Users];
    },

    [REMOVE_USER]: (state: IState, action: Action<User>): User[] => {
        return state.Users.filter(user => user.id != action.payload.id);
    }
},initalState.Users);

const  lockReducer=handleActions<Lock[],Lock>({

        [ADD_LOCK]: (state: IState, action: Action<Lock>): Lock[] => {
            return [action.payload, ...state.Locks];
        },

        [REMOVE_USER]: (state: IState, action: Action<Lock>): Lock[] => {
            return state.Locks.filter(lock => lock.id != action.payload.id);
        }

},initalState.Locks);

const docReducer=handleActions<Doc,Doc>({
    [UPDATE_DOC]:(state:IState,action:Action<Doc>):Doc=>{
         state.Doc.text=action.payload.text;
         return state.Doc;
    }
},initalState.Doc);

export {userReducer,lockReducer,docReducer}