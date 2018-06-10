import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles';
import './styles/style.css';
import App from './components/App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

import store from './redux/store';
axios.defaults.baseURL = 'http://localhost:3004/';

ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
