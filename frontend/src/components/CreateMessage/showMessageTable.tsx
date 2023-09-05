import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import '../../style/style.css';
import UpdateTable from './UpdateTable'

interface Iuser {
  id: number;
  email: string;
  name: string;
  subject: string;
}

function GetUsers() {
  const [getusers, setgetUsers] = useState<Iuser[]>([]);
  const [userDeleted, setUserDeleted] = useState(false); // Estado para sinalizar exclusão
  useEffect(() => {



    api.get<Iuser[]>('/users/getData').then(response => {
      setgetUsers(response.data);
    });
  
  // fetchData()
  }, [userDeleted]); // Adicione userDeleted como dependência


  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      console.log('Usuário excluído com sucesso');
      setUserDeleted(prevState => !prevState); // Alternar o estado para sinalizar a exclusão
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <div id="editTituleTable">
        <div id="editTitleName">Nome</div>
        <div id="editTitleEmail">Email</div>
        <div id="editSubjectTitle">Mensagem</div>
      </div>
      <div>
        {getusers.map(user => (
          <div id='overflow'>

            <table border={1}  key={user.id}>
              <tbody id="editData">
                <tr id="editName">{user.name} </tr>
                <tr id="editEmail">{user.email}</tr>
                <tr id="editSubject">{user.subject}</tr>
                <button id='buttonDelete' onClick={() => handleDelete(user.id)}>Excluir</button>
                <UpdateTable ids={user.id} names={user.name} emails={user.email} subjects={user.subject}></UpdateTable>
              </tbody>
            </table>
          </ div>
    
        ))}
      </div>
    </div>
  );
}
export default GetUsers;
