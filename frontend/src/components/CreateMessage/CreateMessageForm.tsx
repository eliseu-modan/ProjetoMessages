import React, { useState , useEffect} from 'react';
import api from '../../services/api';
import ShowMessageTable from '../CreateMessage/showMessageTable'

interface IFormData {
  email: string;
  name: string;
  subject: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    name: '',
    subject: '',
  });
  console.log(formData)
  

  const logout = () => {
    localStorage.removeItem('token'); // Remova o token do Local Storage ou de outro local
    // Redirecione para a página de login ou outra página apropriada
    window.location.href = '/users/login'; // Por exemplo, redirecione para a página de login
  };
  
    
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.name === '' || formData.email === '' || formData.subject === '') {
      console.log('Digite todos os campos')
      return
    }
    try {
      api.post('users/front', formData)
      console.log(formData);


    } catch (error) {
      console.error('Erro ao enviar os dados ', error)
    }
  };
  const updatePage = () => {
      window.location.reload()
    }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...formData,
      [name]: value,
    }))
  };


  return (
    <>

 <ShowMessageTable></ShowMessageTable>
    <div id='positionFormMessage'>
      <form id='editFormCreateMessage' onSubmit={handleSubmit}  >
        <div ><span id='tituleFormCreate'>Cadastrar Mensagem</span></div>
        <label id='labelnameFormMessage'>Digite o nome :</label>
        <input type="text" name="name" id='inputnameFormMesssage' value={formData.name} onChange={handleInputChange} placeholder='digite o nome' />
        <label id='labelEmailFormMessage'>Digite o Email :</label>
        <input type="email" name="email" id='inputemailFormMessage' value={formData.email} onChange={handleInputChange} placeholder='digite o email' />
        <label id='labelSubjectFormMessage'>Assunto </label>
        <input type="text" name="subject" id='inputSubjectFormMessage' value={formData.subject} onChange={handleInputChange} placeholder='digite o assunto' />
        <button id='editButtonFormMessage' onClick={updatePage} type="submit" >Submit</button>

      </form>
      
          <button id='logout' onClick={logout}>Sair</button>

    </div>
    </>
  );
};
export default MyForm
