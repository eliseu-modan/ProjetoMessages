import react, { useEffect , useState} from 'react'
import api from '../../services/api'


interface UsersCreated {
    id : number
    email :String
}
const Users = () =>{
     const [dataUser , setDataUser]=useState <UsersCreated[]>([])
  useEffect(()=>{
    api.get<UsersCreated[]>('/users/Users').then(response =>{
     setDataUser(response.data)
    })
  }, [])
    return ( 
<>
          <div id='editUsers'>
          <a href="/">Voltar</a>
        {dataUser.map(user => (
            <div id='overflow'>

                <div id='editNameUsers'>Email do Usuario Cadastrado</div>
            <table   key={user.id} id='editPostionUsers'>
              <tbody id='editBody'>
                <tr id='hidden'>{user.id}</tr>
                <tr >{user.email}</tr>
               
              </tbody>
            </table>
          </ div>
))}
</div>
</>
)      
}



export default Users
