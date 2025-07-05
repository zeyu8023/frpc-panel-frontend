import React, { useState } from 'react';
import { getApi } from '../lib/api';

export default function Dashboard() {
  const [message, setMessage] = useState('');

  const handleRestart = async () => {
    try {
      await getApi().post('/restart');
      setMessage('? frpc 重启成功');
    } catch {
      setMessage('? 重启失败');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">仪表盘</h2>
      <button className="bg-red-600 px-4 py-2 rounded" onClick={handleRestart}>重启 frpc</button>
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
}
