import { getFirestore } from 'firebase/firestore'
import FirebaseInit from '../Firebase/FirebaseInit'
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { async } from '@firebase/util'
import { useEffect, useState } from 'react'
import useFirebase from './Usefirebase'
import UseAuth from '../context/UseAuth'

// db instance
const db = getFirestore(FirebaseInit())

const UsefireStore = () => {
  const { users } = useFirebase()
  // console.log('use auth er users')

  const [YourNotes, setYourNotes] = useState([])
  const [myNotes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const user = { uid: 'E62rZajt9IQ3FuCOcFsb0v4Nkr93' }
  useEffect(() => {
    const q = query(collection(db, 'notes'), where('uid', '==', user?.uid))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = []
      querySnapshot.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id })
      })

      setNotes(notes)
    })

    // return unsubscribe
  }, [users])

  const createNewNotes = async (newnotes) => {
    setLoading(true)
    try {
      const notes = await addDoc(collection(db, 'notes'), newnotes)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  // all notes
  const Notes = async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setYourNotes(doc.data)
    })
  }

  const DeleteDoc = async (id) => {
    await deleteDoc(doc(db, 'notes', id))
  }

  const EditDoc = async (id, title, desc) => {
    setLoading(true)
    try {
      const notes = doc(db, 'notes', id)
      await updateDoc(notes, {
        Title: title,
        Description: desc,
      })

      setLoading(false)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return {
    createNewNotes,
    Notes,
    YourNotes,
    myNotes,
    DeleteDoc,
    EditDoc,
    loading,
    error,
  }
}

export default UsefireStore
