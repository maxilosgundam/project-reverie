import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { WorldContextProvider } from './context/WorldContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>  
        <WorldContextProvider>
        <App />  
        </WorldContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);