import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// action types
const ADD_EXPENSE = 'ADD_EXPENSIFY';
const EDIT_EXPENSE = 'EDIT_EXPENSIFY';
const REMOVE_EXPENSE = 'REMOVE_EXPENSIFY';

// action creators
const addExpense = ({
  description, amount, note = '', createdAt = 0,
}) => ({
  type: ADD_EXPENSE,
  payload: {
    id: uuid(),
    description,
    amount,
    note,
    createdAt,
  },
});

const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  payload: {
    id,
    updates,
  },
});

const removeExpense = id => ({
  type: REMOVE_EXPENSE,
  payload: {
    id,
  },
});

// reducer
const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];
    case EDIT_EXPENSE:
      return state.map((expense) => {
        if (expense.id !== action.payload.id) return expense;
        return { ...expense, ...action.payload.updates };
      });
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
};


// action Types
const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
const SORT_BY_AMOUNT = 'SORT_BY_AMOUNT';
const SORT_BY_DATE = 'SORT_BY_DATE';
const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';

// action creators
const setTextFilter = (text = '') => ({
  type: SET_TEXT_FILTER,
  payload: {
    text,
  },
});

const sortByAmount = () => ({ type: SORT_BY_AMOUNT });
const sortByDate = () => ({ type: SORT_BY_DATE });
const setStartDate = date => ({ type: SET_START_DATE, payload: date });
const setEndDate = date => ({ type: SET_END_DATE, payload: date });

// reducer
const filtersReducer = (state = {
  text: '', sortBy: 'date', startDate: undefined, endDate: undefined,
}, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return ({ ...state, text: action.payload.text });
    case SORT_BY_AMOUNT:
      return ({ ...state, sortBy: 'amount' });
    case SORT_BY_DATE:
      return ({ ...state, sortBy: 'date' });
    case SET_START_DATE:
      return ({ ...state, startDate: action.payload });
    case SET_END_DATE:
      return ({ ...state, endDate: action.payload });
    default:
      return state;
  }
};


// create store
const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
}));


const getVisibleExpenses = (expenses, {
  text, startDate, endDate, sortBy,
}) => expenses.filter((e) => {
  const textMatch = !text || new RegExp(text, 'i').test(e.description);
  const startDateMatch = typeof startDate !== 'number' || e.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || e.createdAt <= endDate;
  return textMatch && startDateMatch && endDateMatch;
}).sort((a, b) => {
  if (sortBy === 'date') return a.createdAt > b.createdAt ? -1 : 1;
  if (sortBy === 'amount') return a.amount > b.amount ? -1 : 1;
  return 0;
});


// subscribe to changes
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('%c Rendered with 👉 👉👇', 'background: purple; color: #FFF');
  console.log(visibleExpenses);
});


// expenses reducer usage
const { payload: rentExpense } = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 100 }));
const { payload: coffeeExpense } = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -300 }));
// store.dispatch(removeExpense(rentExpense.id));
// store.dispatch(editExpense(coffeeExpense.id, {note: 'coffee note after edit'}));

// filter reducer usage
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(250));
// store.dispatch(setEndDate());
