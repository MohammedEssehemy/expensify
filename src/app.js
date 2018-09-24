import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import store from './store';
import { addExpense } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const appRoot = document.getElementById('app');

store.dispatch(addExpense({ description: 'Water bill', amount: 4500, createdAt: 0 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 0, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent bill', amount: 109500, createdAt: 0 }));

ReactDOM.render((
  <Provider store={store}>
    <AppRouter />
  </Provider>
), appRoot);
