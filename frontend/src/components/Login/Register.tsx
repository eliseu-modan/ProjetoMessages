import React, { useState } from 'react'
import api from '../../services/api'

interface dataFormI {
    email: string
    password: string
}
const Screenregister: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const [dataForm, setDataForm] = useState<dataFormI>({
        email: '',
        password: ''

    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (dataForm.email === '' || dataForm.password === '') {
            return
        }
        
            api.post('/users/create', dataForm)
            .then(response =>{
             setErrorMessage('Usuario Cadastrado')
             setInterval(()=>{
                window.location.reload()
            },1000)
                      })

            .catch (error => {
                if(error.response && error.response.status === 400){
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
        function cancelRegister(){
            window.location.reload()
        }
    
    return (
        <>
            <div className='tituleScreenRegister' ><span id='styleScreenRegister'>Efetuar o Registro</span></div>
            <form id='styleFormRegister' onSubmit={handleSubmit} >
                <label id='labelEmailRegister'>Email</label>
                <input name='email' id='inputEmailRegister' value={dataForm.email} onChange={handleInputChange} type="email" placeholder='Digite o Email' />
                <label id='labelPasswordRegister'>Senha</label>
                <input name='password' id='inputPasswordRegister' value={dataForm.password} onChange={handleInputChange} type="text" placeholder='Digite a Senha' />
                <button id='buttonRegister'  type='submit'>Registrar</button>
                <button id='buttonRegisterCancel' onClick={cancelRegister} type='submit'>Cancelar</button>


            </form>
            {errorMessage && <p id='editErrRegister'>{errorMessage}</p>}
            {errorMessage === 'Usuario Cadastrado' && <p id='editSuccess'>Usuario Cadastrado</p>}

        </>
    )
}
export default Screenregister

