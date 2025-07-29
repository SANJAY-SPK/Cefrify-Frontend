import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text>Footer</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderColor: '#e9ecef',
    },
    text: {
        textAlign: 'center',
        color: '#6c757d',
        fontSize: 14,
    },
})