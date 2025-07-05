import React, { useEffect, useState } from 'react';
import { getApi } from '../lib/api';

export default function Settings() {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(true);

  const loadConfig = async () => {
    const res = await getApi().get('/settings');
    setConfig(JSON.stringify(res.data, null, 2));
    setLoading(false);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async () => {
    await getApi().put('/settings', JSON.parse(config));
    alert('配置已保存');
  };

  const handleRestore = async () => {
    await getApi().post('/settings/restore');
    loadConfig();
    alert('已恢复默认配置');
  };

  if (loading) return <div className="p-4">加载中...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">全局配置</h2>
      <textarea className="w-full h-64 bg-gray-800 p-2 rounded" value={config} onChange={(e) => setConfig(e.target.value)} />
      <div className="space-x-2 mt-4">
        <button className="bg-green-600 px-4 py-2 rounded" onClick={handleSave}>保存配置</button>
        <button className="bg-red-600 px-4 py-2 rounded" onClick={handleRestore}>恢复默认</button>
      </div>
    </div>
  );
}
