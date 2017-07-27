import {ActionsObservable} from 'redux-observable';
import {AjaxError, Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {ajax} from 'rxjs/observable/dom/ajax';
import  * as Actions    from '../actions';
import {User} from '../model';
import {addUser, receiveUsers, updateDoc,sendMessage} from "../actions";
import {observable} from "rxjs/symbol/observable";
import * as actionTypes from '../constants/ActionTypes';
import {Subject} from 'rxjs/Subject';
import * as io from 'socket.io-client';
import {distinct} from "rxjs/operator/distinct";
import {UNFREEZE_DOC} from "../constants/ActionTypes";
import util from '../../util/utils';

const updateDocEpic=(action$,store)=>{
    return action$.ofType(actionTypes.UPDATE_DOC).bufferTime(5000)
        .filter(e=>e.length==0)
        .map(()=>sendMessage("unfreezeDoc",store.getState().Users.find(p => p.isActive).id));
};

export   {updateDocEpic};