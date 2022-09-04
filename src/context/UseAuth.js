import { useContext } from 'react'
import { UserContext } from './UserContext'

export default function UseAuth() {
  return useContext(UserContext)
}
