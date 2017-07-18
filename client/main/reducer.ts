import {combineReducers} from 'redux';

import {userReducer,docReducer,lockReducer} from '../coordinations';

 const rootReducer=combineReducers({
    Users:userReducer,
    Locks:lockReducer,
    Doc:docReducer
});

 export default rootReducer;