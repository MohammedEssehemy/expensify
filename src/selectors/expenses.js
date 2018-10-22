import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export
export const getVisibleExpenses = (expenses, {
  text, startDate, endDate, sortBy,
}) => expenses
  .filter((e) => {
    const textMatch = !text || new RegExp(text, 'i').test(e.description);
    const startDateMatch = startDate ? moment(e.createdAt).isSameOrAfter(startDate) : true;
    const endDateMatch = endDate ? moment(e.createdAt).isSameOrBefore(endDate) : true;
    return textMatch && startDateMatch && endDateMatch;
  })
  .sort((a, b) => {
    if (sortBy === 'date') return a.createdAt > b.createdAt ? -1 : 1;
    if (sortBy === 'amount') return a.amount > b.amount ? -1 : 1;
    return 0;
  });
