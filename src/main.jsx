import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css';
import { getRuntimeConfig } from './config';

getRuntimeConfig().then((config) => {
  window.API_BASE = config.VITE_API_BASE;

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
