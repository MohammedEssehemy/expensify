import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({
  id, createdAt, description, amount, dispatch,
}) => (
  <div>
    <h3>{description}</h3>
    <p>
      {amount}
      -
      {createdAt}
    </p>
    <button
      type="button"
      onClick={() => {
        dispatch(removeExpense(id));
      }}
    >
      remove
    </button>
    <div />
  </div>
);

ExpenseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ExpenseListItem);
