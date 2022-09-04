import { useContext } from 'react'
import { Docancontext } from './StoreContext'

export default function UseStore() {
  return useContext(Docancontext)
}
