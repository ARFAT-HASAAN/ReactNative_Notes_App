import FirebaseInit from '../Firebase/FirebaseInit'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { showMessage, hideMessage } from 'react-native-flash-message'
// import { async } from '@firebase/util'
// firebase init
// FirebaseInit()

const db = getFirestore(FirebaseInit())

const useFirebase = () => {
  const auth = getAuth()

  const [users, setUser] = useState({})
  const [Loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const AuthSubscripton = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        setUser(user)
        setLoading(false)
      } else {
        setUser()
        setLoading(false)
      }
    })

    return AuthSubscripton
  }, [users])

  const NewUser = async (email, password, Name, Age, Gender) => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user

      await addDoc(collection(db, 'users'), {
        Email: user.email,
        Name: Name,
        Gender: Gender,
        Age: Age,
        uid: user.uid,
      })
      setLoading(false)
      setError('')
    } catch (error) {
      showMessage({
        message: error.message,
        description: 'Try Again',
        type: 'error',
      })
      const errorCode = error.code
      const errorMessage = error.message

      setError(errorMessage)
      setLoading(false)
    }
  }

  const OldUser = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setLoading(false)
        setError('')
        // ...
      })
      .catch((error) => {
        showMessage({
          message: error.message,
          description: 'Try Again',
          type: 'error',
        })
        const errorCode = error.code
        const errorMessage = error.message
        setError(errorMessage)
        setLoading(false)
      })
  }

  const SiginOut = () => {
    signOut(auth)
      .then(() => {
        // setUser(User)
        setError('')
      })
      .catch((error) => {
        setError(errorMessage)
      })
  }

  return { NewUser, error, SiginOut, OldUser, users, Loading }
}
export default useFirebase
