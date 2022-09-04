import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import banner from '../../assets/login-image.png'
import { spacing } from '../../Theme/spacing'
import Button from '../../components/Button'
import { colors } from '../../Theme/colors'
import Input from '../../components/Input'
import useFirebase from '../../hooks/Usefirebase'

export default function Signin({ navigation }) {
  const { OldUser, Loading } = useFirebase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Login = () => {
    OldUser(email, password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{ alignSelf: 'center' }} source={banner} />
      <Text preset="h3" style={{ textAlign: 'center', padding: spacing[3] }}>
        {' '}
        Never forget your notes{' '}
      </Text>
      <Input changeText={(text) => setEmail(text)} placeHolder={'Email'} />
      <Input
        changeText={(text) => setPassword(text)}
        placeHolder="Password"
        secureTextEntry
      />
      {Loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Button Action={Login} style={styles.btn}>
          {' '}
          Login{' '}
        </Button>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: spacing[6],
        }}
      >
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View>
            <Text preset="h4">
              Dont have an account?{' '}
              <Text style={{ color: colors.green }}> Sign up</Text>{' '}
            </Text>
          </View>
        </Pressable>
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

  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: spacing[2],
    fontSize: 17,
    marginVertical: spacing[3],
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
