import React, { useState } from 'react'
import api from '../../services/api'

interface dataFormI {
    email: string
    password: string
}
const Screenregister : React.FC = () => {

    const [dataForm, setDataForm] = useState<dataFormI>({
        email: '',
        password: ''

    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) :  void =>{
        if(dataForm.email ===  '' || dataForm.password === ''){
            return
        }
        try {
            api.post('/users/create' ,dataForm)
            console.log(dataForm)
        } catch (error) {
            console.error('Erro ao enviar os dados ', error)
        }
      }
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setDataForm(prevData => ({
          ...dataForm,
          [name]: value,
        }))
    };
    return (
        <>
            <div className='tituleScreenRegister' ><span id='styleScreenRegister'>Efetuar o Registro</span></div>
            <form id='styleFormRegister' onSubmit={handleSubmit}>
                <label id='labelEmailRegister'>Email</label>
                <input name='email' id='inputEmailRegister'  value={dataForm.email} onChange={handleInputChange} type="email" placeholder='Digite o Email' />
                <label id='labelPasswordRegister'>Senha</label>
                <input name='password' id='inputPasswordRegister'  value={dataForm.password} onChange={handleInputChange} type="text" placeholder='Digite a Senha' />
                <button id='buttonRegister' type='submit'>Registrar</button>
                <button id='buttonRegisterCancel' type='submit'>Cancelar</button>


            </form>
        </>
    )
}
export default Screenregister

