import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'

import Signin from './src/screens/auth/Signin'
import SignUp from './src/screens/auth/SignUp'
import Home from './src/screens/notes/Notes'
import EditNotes from './src/screens/notes/EditNotes'
import CreateNotes from './src/screens/notes/CreateNotes'
import useFirebase from './src/hooks/Usefirebase'
import FlashMessage from 'react-native-flash-message'
import { ActivityIndicator, View } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App() {
  const { users, Loading } = useFirebase()
  const [fontsLoaded] = useFonts({
    NunitoSansBold: require('./src/fonts/NunitoSans-Bold.ttf'),
    NunitoSansRegular: require('./src/fonts/NunitoSans-Regular.ttf'),
    NunitoSansSemiBoold: require('./src/fonts/NunitoSans-SemiBold.ttf'),
  })

  if (Loading && fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }

  const Apptheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme,
      background: '#fff',
    },
  }

  return (
    <>
      <NavigationContainer theme={Apptheme}>
        <Stack.Navigator>
          {users ? (
            <>
              <Stack.Screen options={{ headerShown: false }} name="Home">
                {(props) => <Home {...props} user={users} />}
              </Stack.Screen>
              <Stack.Screen
                options={{ headerShown: false }}
                name="EditNots"
                component={EditNotes}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="CreateNotes"
                component={CreateNotes}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Signin"
                options={{
                  headerShown: false,
                }}
                component={Signin}
              />
              <Stack.Screen
                name="SignUp"
                options={{
                  title: 'Sign Up',
                  headerTintColor: '#0F0F0F',

                  headerStyle: {
                    backgroundColor: '#fff',
                  },
                }}
                component={SignUp}
              />
            </>
          )}
        </Stack.Navigator>

        <FlashMessage position="top" />
      </NavigationContainer>
    </>
  )
}
