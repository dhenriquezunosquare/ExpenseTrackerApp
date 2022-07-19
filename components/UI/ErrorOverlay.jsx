import React from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error ocurred</Text>
            <Text style={[styles.text, styles.message]}>{message}</Text>
            <Button onPress={onConfirm} title="Ok"></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14
    }
})
