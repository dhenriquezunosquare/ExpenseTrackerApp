import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { ExpensesList } from './ExpensesList'
import { ExpensesSumary } from './ExpensesSumary';



export const ExpensesOutput = ({ expenses, expensesPeriod ,fallbackText }) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if(expenses.length > 0){
        content = <ExpensesList expenses={expenses} />
    }



    return (
        <View style={styles.container}>
            <ExpensesSumary periodName={expensesPeriod} expenses={expenses} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary700,
        flex:1
    },
    infoText:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32,
    }
})
