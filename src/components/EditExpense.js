import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpense = ({ expense, dispatch, history }) => (
  <div>
    <h1> Edit Expense </h1>
    <ExpenseForm
      expense={expense}
      btnMessage="Edit Expense"
      onSubmit={(data) => {
        dispatch(editExpense(expense.id, data));
        history.push('/');
      }}
    />
    <button
      type="button"
      onClick={() => {
        dispatch(removeExpense(expense.id));
        history.push('/');
      }}
    >
      remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(e => e.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpense);
