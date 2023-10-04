import { type User } from './types.d'

interface Props {
    users: User[]
}
export function UsersLists({ users }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                        return (
                            <tr key={user.id.value}>
                                <td><img src={user.picture.thumbnail} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.country}</td>
                                <td><button>borrar</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

// table, thead, tbody
//tr row, td cell