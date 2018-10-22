import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate,
} from '../actions/filters';

class ExpensesListFilters extends React.Component {
  state = {
    datePickerFocused: null,
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { dispatch } = this.props;
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
  }

onFocusChange = (focusedInput) => {
  this.setState(() => ({ datePickerFocused: focusedInput }));
}

render() {
  const { filters, dispatch } = this.props;
  const { datePickerFocused } = this.state;
  return (
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
      <DateRangePicker
        startDate={filters.startDate}
        startDateId="startDateFilter"
        endDate={filters.endDate}
        endDateId="endDateFilter"
        onDatesChange={this.onDatesChange}
        focusedInput={datePickerFocused}
        onFocusChange={this.onFocusChange}
        showClearDates
        numberOfMonths={2}
        isOutsideRange={() => false}
      />
    </div>
  );
}
}

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
