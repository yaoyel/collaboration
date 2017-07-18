import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './coordinations/components/Coordination';
import rootReducer from './main/reducer';

const initalState={ };

const store: Store<any> = createStore(rootReducer, initalState);

console.log(store.getState());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);