import { createContext } from 'react'
import useFirebase from '../hooks/Usefirebase'

export const UserContext = createContext()

export default function AuthWrapper({ children }) {
  const info = useFirebase()
  console.log(info)

  return <UserContext.Provider value={info}> {children}</UserContext.Provider>
}

// const UserAuth = userContext(UserContext)
