import {ActionsObservable} from 'redux-observable';
import {AjaxError, Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {ajax} from 'rxjs/observable/dom/ajax';
import  * as Actions    from '../actions';
import {User} from '../model';
import {addUser, receiveUsers, updateDoc} from "../actions";
import {observable} from "rxjs/symbol/observable";
import * as actionTypes from '../constants/ActionTypes';
import {Subject} from 'rxjs/Subject';
import * as io from 'socket.io-client';
import {distinct} from "rxjs/operator/distinct";
import {UNFREEZE_DOC} from "../constants/ActionTypes";

const updateDocEpic=(action$)=>{
    return action$.ofType(actionTypes.UPDATE_DOC).bufferTime(5000).
        subscribe((e)=>{
        if(e.length==0)
        {
            UNFREEZE_DOC
        }
    });
};

const freezeDocEpic=(action$)=>{
    return action$.ofType(actionTypes.FREEZE_DOC).
    subscribe((e)=>{

    });
};

export default updateDocEpic;