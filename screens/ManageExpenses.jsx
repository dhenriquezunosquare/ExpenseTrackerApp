import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { CustomButton } from '../components/UI/CustomButton';
import { IconButton } from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

export const ManageExpenses = () => {
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

  const handleDelete = () => {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();

  };

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleConfirm = (data) => {
    if(isEditing){
      expensesCtx.updateExpense(expenseId,{description:data.description,date:data.date,amount:data.amount})
    }else{
      expensesCtx.addExpense({description:data.description,date:data.date,amount:data.amount})
    }
    navigation.goBack();

  }

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing}  onCancel={handleCancel}  onSubmit={handleConfirm} selectedExpense={selectedExpense} />
   
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
