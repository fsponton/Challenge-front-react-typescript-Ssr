import { useEffect, useState } from 'react'
import { UsersList } from './components/UsersList'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)


  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    console.log(email)
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }


  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=100')
      .then(async res => await res.json())
      .then(data => { setUsers(data.results) })
      .catch((err) => { console.log(err) })
  }, [])


  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <>
      <div>
        <h1>Prueba Tecnica Mid-Level React + Typescript</h1>
        <header>
          <button onClick={toggleColors}>
            Colorear filas
          </button>
          <button onClick={toggleSortByCountry}>
            {sortByCountry ? 'Desordenar por pais' : 'Ordenar por Pais'}
          </button>
        </header>
        <main>
          <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
