import { TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from '../Theme/spacing'

export default function Input({
  placeHolder,
  secureTextEntry,
  changeText,
  keyboardType,
  multiline,
  value,
}) {
  return (
    <TextInput
      onChangeText={changeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeHolder}
      style={styles.input}
      keyboardType={keyboardType}
      multiline={multiline}
      value={value}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: spacing[2],
    fontSize: 17,
    marginVertical: spacing[3],
  },
})
