import { createContext } from 'react'
import UsefireStore from '../hooks/UsefireStore'

export const Docancontext = createContext()

export default function StoreContext({ children }) {
  const store = UsefireStore()
  return <Docancontext.Provider value={store}>{children}</Docancontext.Provider>
}
