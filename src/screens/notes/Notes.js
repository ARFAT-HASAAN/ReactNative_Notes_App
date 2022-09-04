import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import Text from '../../components/Text'
import useFirebase from '../../hooks/Usefirebase'
import { AntDesign, Feather } from '@expo/vector-icons'
import { spacing } from '../../Theme/spacing'
import { colors } from '../../Theme/colors'
import UsefireStore from '../../hooks/UsefireStore'

export default function Notes({ navigation, user }) {
  const { myNotes, DeleteDoc } = UsefireStore()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text preset="h4" style={{ fontSize: 24 }}>
          My Notes
        </Text>

        <Pressable onPress={() => navigation.navigate('CreateNotes')}>
          <AntDesign name="pluscircleo" size={28} color="black" />
        </Pressable>
      </View>

      <ScrollView>
        {myNotes.map((Notes, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  backgroundColor: Notes.bgColor,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: spacing[5],
                  marginVertical: spacing[3],
                }}
              >
                <View style={{ width: '70%' }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'thin',
                      color: colors.white,
                    }}
                  >
                    {Notes.Title}
                  </Text>
                  <Text
                    preset="h4"
                    style={{
                      fontSize: 18,
                      fontWeight: 'thin',
                      color: colors.white,
                    }}
                  >
                    {Notes.Description}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Pressable
                    onPress={() => navigation.navigate('EditNots', Notes)}
                  >
                    <Feather name="edit" size={28} color="white" />
                  </Pressable>
                  <AntDesign
                    onPress={() => DeleteDoc(Notes.id)}
                    style={{ marginLeft: 20 }}
                    name="delete"
                    size={28}
                    color="white"
                  />
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: spacing[3],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
