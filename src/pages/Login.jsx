import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'mock-token');
      navigate('/');
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">登录</h1>
      <input className="mb-2 p-2 bg-gray-800 border border-gray-600" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="mb-4 p-2 bg-gray-800 border border-gray-600" placeholder="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 px-4 py-2 rounded" onClick={handleLogin}>登录</button>
    </div>
  );
}
