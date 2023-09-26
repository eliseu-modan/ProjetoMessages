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
            .then(response => {
                setErrorMessage('Usuario Cadastrado')
                setInterval(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
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
                </form>
            </div>
            {errorMessage && <p id='editErrRegister'>{errorMessage}</p>}
            {errorMessage === 'Usuario Cadastrado' && <p id='editSuccess'>Usuario Cadastrado</p>}
        </>
    )
}
export default Screenregister

