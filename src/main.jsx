import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getRuntimeConfig } from './config';
import { initApi } from './lib/api';

getRuntimeConfig().then((config) => {
  window.API_BASE = config.VITE_API_BASE;
  initApi();

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
