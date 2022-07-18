import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

export const IconButton = ({icon,size,color,onPress}) => {
  return (
    <Pressable onPress={onPress} style={ ({pressed})=> pressed ?  styles.pressed : null} >
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} color={color} size={size}/> 
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding:6,
        borderRadius:24,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    }
})
