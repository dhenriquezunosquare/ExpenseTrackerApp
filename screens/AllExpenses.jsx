import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context';

export const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
   <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No Expenses registered found" />
  )
}


