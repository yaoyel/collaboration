import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore,applyMiddleware,compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './coordinations/epics';
import { Provider } from 'react-redux';
import App from './coordinations/components/Coordination';
import rootReducer from './reducer/reducer';
import createSocketMiddleware from './middlleware/SocketMiddleware';
import socketClient from 'socket.io-client';
import * as Rx from 'rxjs';
import * as actions from './coordinations/actions';
import utils from './util/utils';
const clientSocket=new socketClient();
const composeEnhancers = compose;
const epicMiddleware=createEpicMiddleware(rootEpic);
const scoketMiddleware=createSocketMiddleware(clientSocket);
const unit=new utils();
const finalStore= composeEnhancers(
    applyMiddleware(epicMiddleware,scoketMiddleware))(createStore)(rootReducer);
finalStore.subscribe(()=>console.log(finalStore.getState()));
rxSoctet(clientSocket);
finalStore.dispatch(actions.fetchUsers());
ReactDOM.render(<Provider store={finalStore}>
    <App/>
    </Provider>,
    document.getElementById('app')
);


function rxSoctet(socket) {
 let $userConnect=rxfromIO(socket,"user connected");
    $userConnect.subscribe((data)=>{
        finalStore.dispatch(actions.addUser(data.id))
    });

    let $updateDoc=rxfromIO(socket,"updatedoc");
    $updateDoc.subscribe((data)=>{
     // finalStore.dispatch(actions.updateDoc({midifiedText:data.text,depth:data.depth,updateFromSocket:true}))
      if(unit.mergeContent(data.depth,data.text))
        {
            unit.lockParagraph(window.getSelection());
        }
        else{
          finalStore.dispatch(actions.freezeDoc(data.depth));
      }
    });
}

function rxfromIO (socket, eventName) {
    console.log(eventName)
    return Rx.Observable.create(observer => {
        socket.on(eventName, (data) => {
            observer.next(data)
        });
        return ()=> socket.disconnect();
    })};