import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ExpenseItem } from './ExpenseItem'

const renderingData = (itemData) => {
    return (
        <ExpenseItem key={itemData.item.id} item={itemData.item}  />
    )
}

export const ExpensesList = ({expenses}) => {
  return (
    <FlatList data={expenses} renderItem={renderingData}  />
  )
}


const styles = StyleSheet.create({

})
