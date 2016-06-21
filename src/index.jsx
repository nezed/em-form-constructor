import {Provider} from 'react-redux';
import configureStore from './store';
import storage from 'local-storage-fallback';
import App from './components/App';

let initialState;
/* eslint-disable no-empty */
try{
    initialState = JSON.parse(storage.getItem('form') || null);
}catch(e) {}

const store = configureStore(initialState || undefined);

/* global document */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
