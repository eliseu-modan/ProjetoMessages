import React, { useEffect, useState } from 'react';
import Register from './Register';
import api from '../../services/api';

interface dataFormI {
  email: string,
  password: string
}
const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  console.log(showLogin)
  const [dataForm, setdataFormLogin] = useState<dataFormI>({
    email: '',
    password: ''
  })
  function Cadastrar() {
    setShowLogin(false);
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setdataFormLogin(prevData => ({
      ...dataForm,
      [name]: value
    })
    )
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const response = await api.post('/users/login', dataForm)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } else {
        console.log('erro')
      }
    } catch (error) {
      setErrorMessage('Usuario ou senha incorreto')
      setInterval(() => {
        window.location.reload()
      }, 1000)
    }
  }
  return (
    <>
      {errorMessage && <p id='StatusLogin'>{errorMessage}</p>}
      {showLogin ? (
        <div id='screenOff'>
          <div className='tituleScreenLogin'><span id='styleScreenLogin'>Efetuar o Login</span></div>
          <form id='styleFormLogin' onSubmit={handleSubmit}>
            <label id='labelEmailLogin'>Email</label>
            <input id='inputEmailLogin' type="email" name='email' value={dataForm.email} onChange={handleInputChange} placeholder='Digite o Email' />
            <label id='labelPasswordLogin'>Senha</label>
            <input id='inputPasswordLogin' type="text" name='password' value={dataForm.password} onChange={handleInputChange} placeholder='Digite a Senha' />
            <button id='buttonLogin' type='submit'>Login</button>
            <button id='buttonRegisterLogin' onClick={Cadastrar}>Cadastrar</button>
          </form>
        </div>
      ) : (
        <div id='sreenRegister'>
          <Register></Register>
        </div>
      )}
    </>
  );
}
export default Login;
