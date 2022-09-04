import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text'
import { spacing } from '../../Theme/spacing'
import Button from '../../components/Button'
import { colors } from '../../Theme/colors'
import Input from '../../components/Input'
import useFirebase from '../../hooks/Usefirebase'

export default function SignUp({ navigation }) {
  const { NewUser, Loading } = useFirebase()

  const [gender, setGenders] = useState(null)
  const [email, setEmail] = useState('')
  const [Age, SetAge] = useState('')
  const [Name, setName] = useState('')
  const [password, setPassowrd] = useState('')

  const Optiongenders = ['Male', 'Female']

  const Regester = () => {
    NewUser(email, password, Name, Age, gender)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input placeHolder={'Email'} changeText={(text) => setEmail(text)} />
      <Input
        placeHolder="Password"
        changeText={(text) => setPassowrd(text)}
        secureTextEntry={true}
      />
      <Input placeHolder="Full Name" changeText={(text) => setName(text)} />
      <Input
        placeHolder="Age"
        keyboardType="numeric"
        changeText={(text) => SetAge(text)}
      />
      <View>
        <Text preset="h4" style={{ paddingVertical: spacing[3] }}>
          Select you gender:{' '}
        </Text>

        {Optiongenders.map((Sellectedgender) => {
          const selected = gender === Sellectedgender
          return (
            <Pressable
              onPress={() => setGenders(Sellectedgender)}
              key={Sellectedgender}
              style={styles.circleContainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedouterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedinnerCircle,
                  ]}
                ></View>
              </View>
              <Text style={styles.radioText}>{Sellectedgender}</Text>
            </Pressable>
          )
        })}
      </View>

      {Loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Button Action={Regester} style={styles.btn}>
          {' '}
          Sign Up{' '}
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
        <Pressable onPress={() => navigation.navigate('Signin')}>
          <View>
            <Text preset="h4">
              Already have an account?{' '}
              <Text preset="h4" style={{ color: 'green' }}>
                {' '}
                Sign in
              </Text>{' '}
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
    borderRadius: 40,
    marginTop: spacing[5],
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },

  circleContainer: {
    marginBottom: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
  },

  outerCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 55,
    borderColor: 'grey',
    borderWidth: 1.5,
  },

  radioText: {
    marginLeft: 5,
  },

  selectedouterCircle: {
    borderColor: colors.orange,
  },

  selectedinnerCircle: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
})
