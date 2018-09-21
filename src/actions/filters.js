import { SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE, SET_START_DATE, SET_END_DATE } from './../constants/actionTypes';

export const setTextFilter = (text = '') => ({
  type: SET_TEXT_FILTER,
  payload: {
    text
  }
});

export const sortByAmount = () => ({type: SORT_BY_AMOUNT});

export const sortByDate = () => ({type: SORT_BY_DATE});

export const setStartDate = (date) => ({type: SET_START_DATE, payload: date});

export const setEndDate = (date) => ({type: SET_END_DATE, payload: date});
