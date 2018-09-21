import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from './../constants/actionTypes';
import uuid from 'uuid';

export const addExpense = ({ description, amount, note = '', createdAt = 0  }) => ({
  type: ADD_EXPENSE,
  payload: {
    id: uuid(),
    description,
    amount,
    note,
    createdAt
  }
});

export const editExpense = (id , updates ) => ({
  type: EDIT_EXPENSE,
  payload: {
    id,
    updates
  }
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: {
    id
  }
});
