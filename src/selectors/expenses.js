export const getVisibleExpenses = (expenses, {text, startDate, endDate, sortBy}) => expenses.filter((e)=>{
  const textMatch = !text || new RegExp(text, 'i').test(e.description);
  const startDateMatch = typeof startDate !== 'number' || e.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || e.createdAt <= endDate;
  return textMatch && startDateMatch && endDateMatch;
}).sort((a,b)=>{
  if(sortBy === 'date') return a.createdAt > b.createdAt ? -1 : 1;
  if(sortBy === 'amount') return a.amount > b.amount ? -1 : 1;
  return 0;
})
