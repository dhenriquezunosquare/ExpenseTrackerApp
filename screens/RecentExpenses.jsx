import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ErrorOverlay } from '../components/UI/ErrorOverlay'
import { Loading } from '../components/UI/Loading'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date'
import { getExpenses } from '../utils/http'

export const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const apiExpenses = async () => {
      setLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError('Could not fecht expenses');
      }
      setLoading(false);
    }
    apiExpenses();

  }, [])

  const RecentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7days = getDateMinusDays(today, 7);
    return new Date(expense.date) >= date7days || false;
  })

  const onConfirm = () => {
      setError(null);
  };

  if(error && !loading){
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }

  return (
    <>
      {loading && <Loading />}
      {
        !loading &&
        <ExpensesOutput expensesPeriod="Last 7 days" expenses={RecentExpenses} fallbackText="No Expenses registered in the last 7 days" />
      }
    </>
  )
}
