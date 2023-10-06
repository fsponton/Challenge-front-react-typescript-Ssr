import { SortBy, type User } from '../types.d'

interface Props {
  changeSortering: (sort: SortBy) => void
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
}

export function UsersList ({ changeSortering, deleteUser, users, showColors }: Props) {
  return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={() => { changeSortering(SortBy.NAME) }}>Nombre</th>
                    <th className="pointer" onClick={() => { changeSortering(SortBy.LAST) }}>Apellido</th>
                    <th className="pointer" onClick={() => { changeSortering(SortBy.COUNTRY) }}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                      const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                      const color = showColors ? backgroundColor : 'transparent'

                      return (
                            <tr key={user.email} style={{ backgroundColor: color }}>
                                <td><img src={user.picture.thumbnail} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button onClick={() => { deleteUser(user.email) }}>borrar</button></td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
  )
}

// table, thead, tbody
// tr row, td cell
