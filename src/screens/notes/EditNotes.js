import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import { spacing } from '../../Theme/spacing'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { colors } from '../../Theme/colors'
import UsefireStore from '../../hooks/UsefireStore'

export default function EditNotes({ route, navigation }) {
  const { EditDoc, loading } = UsefireStore()
  const notes = route.params

  const [Notestitle, setTitle] = useState(notes?.Title)
  const [NotsDescription, setDescripton] = useState(notes?.Description)
  const [noteColor, setNoteColor] = useState(notes.bgColor)
  const [docID, setDocId] = useState(notes?.id)
  const UpdateDoc = () => {
    EditDoc(docID, Notestitle, NotsDescription)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text preset={'h3'} style={{ fontSize: 22 }}>
        Edit Notes
      </Text>

      <View>
        <Input
          changeText={(text) => setTitle(text)}
          value={Notestitle}
          placeHolder={'Title'}
        />
        <Input
          changeText={(text) => setDescripton(text)}
          value={NotsDescription}
          placeHolder={'Description'}
        />

        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Button Action={UpdateDoc} style={styles.btn}>
              Update
            </Button>
          )}
        </View>
      </View>
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
