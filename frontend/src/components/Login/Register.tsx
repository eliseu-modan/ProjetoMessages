import React, { useState } from 'react'
import api from '../../services/api'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox } from 'antd';


interface dataFormI {
    email: string
    password: string
    admin : Boolean
}
const Screenregister: React.FC = () => {
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`Admin = ${e.target.checked}`);
        dataForm.admin = e.target.checked
      };
    const [errorMessage, setErrorMessage] = useState('');
    const [dataForm, setDataForm] = useState<dataFormI>({
        email: '',
        password: '',
        admin : false
    })
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
          console.log(dataForm)
          event.preventDefault()
          if (dataForm.email === '' || dataForm.password === '') {
              return
            }
            const dataToSend = {
                ...dataForm,
                admin: dataForm.admin ? true : false
              };
             api.post('/users/create', dataForm)
            .then(response => {
                
                setErrorMessage('Usuario Cadastrado')
                setInterval(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setErrorMessage(error.response.data.message);
                }
            })
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setDataForm(prevData => ({
            ...dataForm,
            [name]: value,
        }))
    };
    function cancelRegister() {
        window.location.reload()
    }
    return (
        <>
            <div id='screenOff'>
                <form className='form' onSubmit={handleSubmit}>
                    <p className='form-title'>sign in Register</p>
                    <div className='input-container'>
                        <input type="email" name='email' value={dataForm.email} onChange={handleInputChange} placeholder='Enter Email' />
                        <span></span>
                    </div>
                    <div className='input-container'>
                        <input type="text" name='password' value={dataForm.password} onChange={handleInputChange} placeholder='Digite a Senha' />
                    </div>
                    <button className='submit' type='submit'>Registrar</button>
                    <p className='signup-link'>
                        <button onClick={cancelRegister}> Cancel</button></p>
                        <Checkbox name='admin'  onChange={onChange}  >Admin ?</Checkbox>
                </form>
            </div>
            {errorMessage && <p id='editErrRegister'>{errorMessage}</p>}
            {errorMessage === 'Usuario Cadastrado' && <p id='editSuccess'>Usuario Cadastrado</p>}
        </>
    )
}
export default Screenregister

