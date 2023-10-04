import { useEffect, useState } from 'react'
import { UsersLists } from './components/UsersList'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=100')
      .then(async res => await res.json())
      .then(data => { setUsers(data.results) })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <>
      <div>
        <h1>Prueba</h1>
        <UsersLists users={users} />
      </div>
    </>
  )
}

export default App
