/**
 * Created by YBC on 2017/7/19.
 */
import {ActionsObservable} from 'redux-observable';
import {AjaxError, Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {ajax} from 'rxjs/observable/dom/ajax';
import  * as Actions    from '../actions';
import {User} from '../model';
import {addUser, receiveUsers} from "../actions";
import {observable} from "rxjs/symbol/observable";
import * as actionTypes from '../constants/ActionTypes';
import {Subject} from 'rxjs/Subject';
import * as io from 'socket.io-client';
import {distinct} from "rxjs/operator/distinct";
import {delay} from "rxjs/operator/delay";

  const fetchUserEpic=(action$)=>{
    return action$.ofType(actionTypes.FETCH_USERS)
        .mergeMap(()=>
            ajax.getJSON("http://rct.chinacloudsites.cn/api/users").map((res:any)=>(
                receiveUsers(<any>res)
            )))};



export  {fetchUserEpic};