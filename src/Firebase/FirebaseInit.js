// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './Firebase.Config'

// Initialize Firebase

const FirebaseInit = () => {
  initializeApp(firebaseConfig)
}

export default FirebaseInit
