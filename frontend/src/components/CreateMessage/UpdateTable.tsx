import React, { useState } from 'react';
import api from '../../services/api';

interface UpdateTableProps {
  ids: number; // Defina a prop "id" como um número
  name: string;
  email: string;
  subject: string
}
interface DataofBank {
  ids: number; // Defina a prop "id" como um número
  names: string;
  emails: string;
  subjects: string
}
const UpdateTable: React.FC<DataofBank> = ({ ids, names, emails, subjects }) => {
  const [showForm, setshowForm] = useState(false)
  const [valueData, setvalueData] = useState<UpdateTableProps>({
    ids: ids,
    name: names,
    email: emails,
    subject: subjects,
  })
  function EditData() {
    setshowForm(true)
  }
  console.log(valueData)
  const handleSbubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await api.put('/users/Update', valueData); // Enviar valueData como JSON
      console.log('dados atualizados para o back end');
    } catch (error) {
      console.error('Erro ao enviar os dados ', error);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setvalueData(prevData => ({
      ...valueData,
      [name]: value,
    }))
  };
  function updatePage() {
    window.location.reload()
  }
  return (
    <>
      {showForm ? (
        <div >
          <form id='editFormUpdate' onSubmit={handleSbubmit} >
            <input type="hidden" name='ids' value={valueData.ids} />
            <label htmlFor="" id='labelNameUpdate'>Nome</label>
            <input type="text" name='name' id='inputNameUpdate' value={valueData.name} onChange={handleInputChange} placeholder={names} />
            <label htmlFor="" id='labelEmailUpdate'>Email</label>
            <input type="text" name='email' id='inputEmailUpdate' value={valueData.email} onChange={handleInputChange} placeholder={emails} />
            <label htmlFor="" id='labelSubjectUpdate'>Assunto</label>
            <input type="text" name='subject' id='inputSubjectlUpdate' value={valueData.subject} onChange={handleInputChange} placeholder={subjects} />
            <button id='UpdateDataForm' onClick={updatePage} type='submit'>Alterar Dados</button>
          </form>
          <button id='cancelFormUpdate' onClick={() => setshowForm(false)}>Cancelar </button>
        </div>
      ) : (
        <div>
          <button id='Update' onClick={EditData}>Editar</button>
        </div>
      )}
    </>
  );
}
export default UpdateTable;
