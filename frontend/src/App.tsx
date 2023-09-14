import React, { useEffect, useState } from 'react';
import User from './components/CreateMessage/CreateMessageForm';
import ScreenLogin from './components/Login/Login';
import '../src/style/style.css';
import Users from './components/Users/Users';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';
import jwt from 'jsonwebtoken'
import api from './services/api';


function App() {
  
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const token = localStorage.getItem('token');
  useEffect(()=>{
    console.log('token em app', token)
    

    if (token) {
      setIsLoggedIn(true);
      console.log('Há um token');
    } else {
      setIsLoggedIn(false);
      console.log('Não há token');
    }
    
    
  },[])
    

 
  
  
  
  
  return (
    <div className="App">
     
      <div>

        {isLoggedIn ? (
          <>
           <Router>
        <div id='buttonUsuarios'>
          <Link to="/usuarios/Registrados">  Usuarios</Link>
          <Routes>
            <Route path="/usuarios/Registrados" element={<Users  />} />
          </Routes>
        </div>
      </Router>
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








