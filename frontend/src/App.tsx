import React, { Children, useEffect, useState } from 'react';
import User from './components/CreateMessage/CreateMessageForm';
import ScreenLogin from './components/Login/Login';
import '../src/style/style.css';
import Users from './components/Users/Users';
import api from './services/api';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AdminContextProvider } from './services/Context';
import {useAdminContext} from './services/Context'


function App() {
  const{isAdmin} = useAdminContext()

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log('token chegou em App', token)
    if (token) {
      setIsLoggedIn(true);
      console.log('Há um token');
    } else {
      setIsLoggedIn(false);
      console.log('Não há token');
    }
  }, [])

  return (
    <div className="App">

        
      <div>
        {isLoggedIn ? (
          <>
          {isAdmin ? (
            <Router>
              <div id='buttonUsuarios'>
                <Link to="/usuarios/Users"> Usuarios</Link>
                <Routes>
                  <Route path="/usuarios/Users" element={<Users />} />
                </Routes>
              </div>
            </Router>
          ) : (' ') }
            <User></User>
          </>
        ) : (
          <ScreenLogin></ScreenLogin>
          )}
      </div>
    </div>
  );
}

export default App;








