import { useEffect, useRef, useState } from 'react'
import { UsersList } from './components/UsersList'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }


  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=100')
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch((err) => { console.log(err) })
  }, [])

  const filteredUsers = filterCountry
    ? users.filter((user) => {
      return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
    })
    : users

  const sortedUsers = sortByCountry
    ? [...filteredUsers].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers

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
          <button onClick={handleReset}>
            Reiniciar lista
          </button>
          <input type="text" placeholder="filtrar por pais" onChange={(e) => { setFilterCountry(e.target.value) }} />
        </header>
        <main>
          <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
