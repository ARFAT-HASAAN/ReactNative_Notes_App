import { View, StyleSheet } from 'react-native'
import React from 'react'
import Text from './Text'

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text preset={h2}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
