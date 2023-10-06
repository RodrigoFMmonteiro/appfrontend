import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import logo from './assets/logo.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id='logo'>
      <img src={logo} alt="Logo" />
    </div>
    <App />
  </React.StrictMode>
);


