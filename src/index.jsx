import {Provider} from 'react-redux';
import configureStore from './store';
import App from './components/App';

const store = configureStore();

/* global document */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
