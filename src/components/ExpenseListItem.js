import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({
  id, createdAt, description, amount,
}) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {(amount / 100).toFixed(2)}
      <br />
      {moment(createdAt).format()}
    </p>

    <div />
  </div>
);

ExpenseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ExpenseListItem;
