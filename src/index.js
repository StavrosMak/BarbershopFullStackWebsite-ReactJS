import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style.css'
import { AuthProvider } from './Context/AuthContext';
import { ModalProvider } from './Context/ModalContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ModalProvider>
      <AuthProvider>
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      </AuthProvider>
    </ModalProvider>
  </BrowserRouter >
);

