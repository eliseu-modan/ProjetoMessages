import react, { useEffect, useState } from 'react'
import api from '../../services/api'


interface UsersCreated {
  id: number
  email: String
}
const Users = () => {
  const [dataUser, setDataUser] = useState<UsersCreated[]>([])
  const [updateUser, setupdateUsers] = useState(false)
  useEffect(() => {
    api.get<UsersCreated[]>('/users/Users').then(response => {
      setDataUser(response.data)
    })
  }, [])
  if (updateUser === true) {
    window.location.reload()
  }
  const removeUser = async (ids: number) => {
    console.log('USUARIO ', ids)
    try {
      setupdateUsers(true)
      await api.delete(`/users/deleteUsers/${ids}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div id='editUsers'>
        <a href="/">Voltar</a>
        {dataUser.map(user => (
          <div id='overflow'>
                  <div id='editNameUsers'> Usuarios Cadastrados</div>
         
            <table key={user.id} id='editPostionUsers'>
              <tbody id='editBody'>
                <tr >&nbsp;&nbsp;&nbsp; Usuario  {user.id} : &nbsp; </tr>
                <tr > {user.email}</tr>
              </tbody>
            </table>
            <button id='buttonDeleteUsers' onClick={() => removeUser(user.id)}>excluir</button>
          </ div>
        ))}
      </div>
    </>
  )
}
export default Users
