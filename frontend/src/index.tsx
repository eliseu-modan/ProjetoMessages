import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminContextProvider } from './services/Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AdminContextProvider>


    <App />
    </AdminContextProvider>
  </React.StrictMode>
);


