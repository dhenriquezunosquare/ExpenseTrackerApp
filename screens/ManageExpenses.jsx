import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { CustomButton } from '../components/UI/CustomButton';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';
import { IconButton } from '../components/UI/IconButton';
import { Loading } from '../components/UI/Loading';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpenses, storeExpense, updateExpenses } from '../utils/http';

export const ManageExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = useRoute().params?.expenseId;
  const navigation = useNavigation();
  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === expenseId);
  console.log(selectedExpense);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [])

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteExpenses(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Error deleting expense");
    }
    setLoading(false);

  };

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleConfirm = async (data) => {
    if (isEditing) {
      setLoading(true);
      try {
        await updateExpenses(expenseId, { description: data.description, date: data.date, amount: data.amount });
        expensesCtx.updateExpense(expenseId, { description: data.description, date: data.date, amount: data.amount })
        navigation.goBack();
      } catch (error) {
        setError("Error Editiing Expense");
      }

      setLoading(false);
    } else {
      setLoading(true);
      try {
        const id = await storeExpense({ description: data.description, date: data.date, amount: data.amount })
        expensesCtx.addExpense({ description: data.description, date: data.date, amount: data.amount, id: id })
        navigation.goBack();

      } catch (error) {
        setError("Error Saving Expense");
      }
      setLoading(false);
    }

  }


  const onConfirm = () => {
    setError(null);
  };

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }


  if (loading) {
    return (<Loading />)
  }

  return (
    <View style={styles.container}>

      <ExpenseForm isEditing={isEditing} onCancel={handleCancel} onSubmit={handleConfirm} selectedExpense={selectedExpense} />

      {
        isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={handleDelete} />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },

})
