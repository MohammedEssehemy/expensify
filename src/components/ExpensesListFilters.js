import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpensesListFilters = ({ filters, dispatch }) => (
  <div>
    <input
      type="text"
      value={filters.text}
      onChange={(e) => {
        dispatch(setTextFilter(e.target.value));
      }}
    />
    <select
      value={filters.sortBy}
      onChange={(e) => {
        if (e.target.value === 'amount') dispatch(sortByAmount());
        else if (e.target.value === 'date') dispatch(sortByDate());
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

ExpensesListFilters.propTypes = {
  filters: PropTypes.shape({
    text: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpensesListFilters);
