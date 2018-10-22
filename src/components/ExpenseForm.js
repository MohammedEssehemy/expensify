import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const expense = props.expense || {};
    this.state = {
      errorMessage: '',
      description: expense.description || '',
      note: expense.note || '',
      amount: expense.amount ? (expense.amount / 100).toString() : 0,
      createdAt: expense.createdAt ? moment(expense.createdAt) : moment(),
      datePickerFocused: false,
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    const regExp = /^\d+(\.\d{0,2})?$/;
    if (!amount || amount.match(regExp)) {
      this.setState(() => ({ amount }));
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      amount, description, note, createdAt,
    } = this.state;
    if (!amount || !description) return this.setState(() => ({ errorMessage: 'description and amount are required' }));
    this.setState(() => ({ errorMessage: '' }));
    const { onSubmit } = this.props;
    return onSubmit({
      amount: Number(amount) * 100, description, note, createdAt: createdAt.valueOf(),
    });
  }

  render() {
    const {
      description, note, amount, createdAt, datePickerFocused, errorMessage,
    } = this.state;
    const { btnMessage } = this.props;
    return (
      <div>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={moment(createdAt)} // momentPropTypes.momentObj or null
            onDateChange={dateMoment => dateMoment && this.setState({ createdAt: dateMoment })} // PropTypes.func.isRequired
            focused={datePickerFocused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ datePickerFocused: focused })} // PropTypes.func.isRequired
            id="createdAt" // PropTypes.string.isRequired,
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense"
            value={note}
            onChange={this.onNoteChange}
          />
          <button type="submit">{btnMessage}</button>
        </form>
      </div>
    );
  }
}
