import React, { useEffect, useState } from 'react';
import User from './components/CreateMessage/CreateMessageForm';
import ScreenLogin from './components/Login/Login';
import '../src/style/style.css';
import Users from './components/Users/Users';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';


function App() {


  
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    // Verifique se há um token JWT no Local Storage (ou outro local seguro)
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
      console.log('Há um token');
    } else {
      setIsLoggedIn(false);
      console.log('Não há token');
    }
  }); 
  return (
    <div className="App">
     
      <div>

        {isLoggedIn ? (
          <>
           <Router>
        <div id='buttonUsuarios'>
          <Link to="/usuarios/Registrados">  Usuarios</Link>
          <Routes>
            <Route path="/usuarios/Registrados" element={<Users />} />
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








