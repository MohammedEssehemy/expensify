import React from 'react';
import ExpensesList from './ExpensesList';
import ExpensesListFilters from './ExpensesListFilters';

export default () => (
  <div>
    <ExpensesListFilters />
    <ExpensesList />
  </div>
);
