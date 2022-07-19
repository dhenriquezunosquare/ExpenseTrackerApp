import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../utils/date'

export const ExpenseItem = ({ item={} }) => {
    console.log(item);
    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense',{
            expenseId:item.id
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed ? styles.pressed : null} >
            <View style={styles.container}>
                <View>
                    <Text style={[styles.text, styles.descriptionText]} >{item.description}</Text>
                    <Text style={styles.text}>{getFormattedDate(new Date(item.date))}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    text: {
        color: GlobalStyles.colors.primary50,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.5
    }
})
