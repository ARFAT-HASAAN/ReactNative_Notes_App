import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import { spacing } from '../../Theme/spacing'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { colors } from '../../Theme/colors'
import UsefireStore from '../../hooks/UsefireStore'
import useFirebase from '../../hooks/Usefirebase'

const Cardcolors = ['red', 'blue', 'black', 'green']

export default function CreateNotes({ navigation }) {
  const [notesColor, setNotesColor] = useState('')
  const [Title, setTitle] = useState('')
  const [Description, setdescription] = useState('')
  const { users } = useFirebase()
  const { createNewNotes, loading } = UsefireStore()

  const createdNotes = () => {
    const notes = { bgColor: notesColor, Title, Description, uid: users?.uid }
    createNewNotes(notes)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text preset="h2">Create Notes</Text>

        <View>
          <Input changeText={setTitle} placeHolder={'Title'} />
          <Input
            multiline={true}
            changeText={setdescription}
            placeHolder={'Description'}
          />
          <Text style={{ fontSize: 20 }}>Choose a color : </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingVertical: spacing[6],
            }}
          >
            {Cardcolors.map((color, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    borderRadius: 20,
                    marginRight: 20,
                  }}
                  onPress={() => setNotesColor(color)}
                ></Pressable>
              )
            })}
          </View>

          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <Button Action={createdNotes} style={styles.btn}>
                {' '}
                Save{' '}
              </Button>
            )}
          </View>
        </View>
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

  btn: {
    backgroundColor: colors.yellow,
    padding: spacing[3],
    marginTop: spacing[3],
    borderRadius: 30,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
})
