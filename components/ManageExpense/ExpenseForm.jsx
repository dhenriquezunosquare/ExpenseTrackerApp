import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { CustomButton } from '../UI/CustomButton';
import { CustomInput } from './CustomInput';


const initialValues = {
    amount: '', date: '', description: ''
}
export const ExpenseForm = ({ onCancel, onSubmit, isEditing, selectedExpense }) => {

    const [inputs, setInputs] = useState({
        amount: { value: selectedExpense ? selectedExpense.amount + "" : '', isValid: true },
        date: { value: selectedExpense ? selectedExpense.date.toISOString().slice(0, 10) : '', isValid: true },
        description: { value: selectedExpense ? selectedExpense.description : '', isValid: true },
    });


    const handleChange = (inputIdentifier, value) => {
        setInputs((prev) => {
            return {
                ...prev,
                [inputIdentifier]: { value: value, isValid: true }
            }
        })
    }



    const handleSubmit = () => {
        const data = {
            amount: Number(inputs.amount.value),
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }
        console.log(data.date.toString());
        const amountIsValid = !isNaN(data.amount) && data.amount > 0;
        const dateIsValid = data.date.toString() !== "Invalid Date";
        const descriptionIsValid = data.description.trim().length > 0;

        console.log(dateIsValid)

        if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
            return setInputs(prev => {
                return {
                    amount: { value: prev.amount.value, isValid: amountIsValid },
                    date: { value: prev.date.value, isValid: dateIsValid },
                    description: { value: prev.description.value, isValid: descriptionIsValid },
                }
            })

            
        }


        onSubmit(data);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.amountContainer}>
                <CustomInput invalid={!inputs.amount.isValid} label="Amount" style={styles.rowInput} textInputConfig={{ keyboardType: 'decimal-pad', onChangeText: (value) => handleChange('amount', value), value: inputs.amount.value }} />
                <CustomInput invalid={!inputs.date.isValid} label="Date" style={styles.rowInput} textInputConfig={{ placeholder: 'YYYY-MM-DD', maxLenght: 10, onChangeText: (value) => handleChange('date', value), value: inputs.date.value }} />
            </View>
            <CustomInput invalid={!inputs.description.isValid}  label="Description" textInputConfig={{ multiline: true, autoCorrect: true, autoCapitalize: 'sentences', onChangeText: (value) => handleChange('description', value), value: inputs.description.value }} />
            {   formIsInvalid &&
                <Text style={styles.errorText}>Invalid Input values - please checked your entered data</Text>
            }
            <View style={styles.buttonContainer}>
                <CustomButton mode="flat" onPress={onCancel} style={styles.buttons} >Cancel</CustomButton>
                <CustomButton onPress={handleSubmit} style={styles.buttons} >{isEditing ? 'Update' : 'Add'} </CustomButton>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        marginTop: 50
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: 'center',
        color:GlobalStyles.colors.error500,
        margin:8
    }
});
