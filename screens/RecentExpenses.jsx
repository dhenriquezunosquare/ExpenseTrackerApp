import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date'

export const RecentExpenses = () => {

  const expensesCtx = useContext(ExpensesContext);

  const RecentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7days = getDateMinusDays(today,7);
    return  expense.date > date7days
  })

  return (
    <ExpensesOutput expensesPeriod="Last 7 days" expenses={RecentExpenses}  fallbackText="No Expenses registered in the last 7 days" />
  )
}
