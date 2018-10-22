import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import { getVisibleExpenses } from '../selectors/expenses';

const ExpensesList = ({ expenses }) => (
  <div>
    <h1>
      Expenses List
    </h1>
    {expenses.map(e => (<ExpenseListItem key={e.id} {...e} />))}
  </div>
);

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
};
const mapStateToProps = state => ({
  expenses: getVisibleExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpensesList);
