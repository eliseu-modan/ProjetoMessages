import React, { useEffect, useState } from 'react';
import Register from './Register';
import api from '../../services/api';
import { addAuthorizationHeader } from '../../MiddlewareToken';


interface dataFormI {
  email: string,
  password: string
}


const Login: React.FC = () => {




  useEffect(() => {
    addAuthorizationHeader();
  }, [])
  // Chame a função fetchData quando o componente for montado




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


  console.log(errorMessage)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const response = await api.post('/users/login', dataForm)



      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } else {
        console.log('erro no Token')
      }

    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("erro 401 : ", error.response.data.message)

        setErrorMessage(error.response.data.message)

        setInterval(() => {
          window.location.reload()
        }, 2000)
      }
    }
  }

  return (
    <>
      {errorMessage && <div id='container'><p id='StatusLogin'>{errorMessage}</p></div>}
      {showLogin ? (
        <div id='screenOff'>
          <form className='form' onSubmit={handleSubmit}>
            <p className='form-title'>sign in to your account</p>
            <div className='input-container'>
              <input type="email" name='email' value={dataForm.email} onChange={handleInputChange} placeholder='Enter Email' />
              <span></span>
            </div>
            <div className='input-container'>
              <input type="text" name='password' value={dataForm.password} onChange={handleInputChange} placeholder='Digite a Senha' />
            </div>
            <button className='submit' type='submit'>Login</button>
            <p className='signup-link'>No account?
              <button onClick={Cadastrar}> Cadastrar</button></p>
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
