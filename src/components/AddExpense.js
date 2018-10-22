import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpense = ({ dispatch, history }) => (
  <div>
    <h1> Add Expense </h1>
    <ExpenseForm
      btnMessage="Add Expense"
      onSubmit={(data) => {
        dispatch(addExpense(data));
        history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpense);
