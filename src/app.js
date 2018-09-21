import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import store from './store';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

console.log(store.getState());
const appRoot = document.getElementById('app');

ReactDOM.render(<AppRouter />, appRoot);
