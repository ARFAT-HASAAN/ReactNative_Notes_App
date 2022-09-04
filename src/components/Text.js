import { Text as RnText, StyleSheet } from 'react-native'
import React from 'react'
import { presets } from '../Theme/presets'

export default function Text({ preset, children, style }) {
  const costomStyle = StyleSheet.compose(presets[preset], style)

  return <RnText style={costomStyle}>{children} </RnText>
}
