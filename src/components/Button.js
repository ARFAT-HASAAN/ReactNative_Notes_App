import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Text from './Text'

export default function Button({ children, Action, style }) {
  const btnSyle = StyleSheet.compose(style)

  return (
    <TouchableOpacity style={btnSyle} onPress={Action}>
      <Text preset="h4">{children}</Text>
    </TouchableOpacity>
  )
}
