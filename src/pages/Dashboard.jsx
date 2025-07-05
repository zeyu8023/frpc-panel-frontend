import React, { useEffect, useState } from 'react';
import { getApi } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getApi().get('/dashboard')
      .then((res) => setStats(res.data))
      .catch(() => setError('仪表盘数据加载失败'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">加载中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">仪表盘</h2>
      <pre className="bg-gray-800 p-2 rounded">{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
