/**
 * Created by YBC on 2017/7/19.
 */

import {combineEpics} from 'redux-observable';
import {fetchUserEpic} from './UserEpics';
import updateDoc from  './DocEpics';

export default combineEpics(fetchUserEpic,updateDoc);