import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersList } from './components/UsersList'
import './App.css'
import { SortBy, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <>
      <div>
        <h1>Prueba Tecnica Mid-Level React + Typescript</h1>
        <header>
          <button onClick={toggleColors}>
            Colorear filas
          </button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'Desordenar por pais' : 'Ordenar por Pais'}
          </button>
          <button onClick={handleReset}>
            Reiniciar lista
          </button>
          <input type="text" placeholder="filtrar por pais" onChange={(e) => { setFilterCountry(e.target.value) }} />
        </header>
        <main>
          <UsersList changeSortering={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
