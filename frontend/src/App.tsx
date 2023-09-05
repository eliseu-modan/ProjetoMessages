import React, { useEffect, useState } from 'react';
import User from './components/CreateMessage/CreateMessageForm';
import ScreenLogin from './components/Login/Login';
import '../src/style/style.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
     console.log(isLoggedIn)
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
  }); // Certifique-se de incluir [] como dependência para que o useEffect seja executado apenas uma vez

  return (
    <div className="App">
      <div>

      {isLoggedIn ? (
        <User></User>
        ) : (
          <ScreenLogin></ScreenLogin>
          )}
    </div>
          </div>
  );
}

export default App;








