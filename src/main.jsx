import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css';
import { getRuntimeConfig } from './config';
import { initApi } from './lib/api';

getRuntimeConfig().then((config) => {
  window.API_BASE = config.VITE_API_BASE;
  initApi(); // 初始化 axios 实例

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
