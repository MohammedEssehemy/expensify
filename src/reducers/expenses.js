import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from './../constants/actionTypes';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
    return [...state, action.payload];
    case EDIT_EXPENSE:
    return state.map(expense=>{
      if(expense.id !== action.payload.id) return expense;
      return {...expense, ...action.payload.updates};
    });
    case REMOVE_EXPENSE:
    return state.filter(({id})=> id !== action.payload.id);
    default:
    return state;
  }
};
