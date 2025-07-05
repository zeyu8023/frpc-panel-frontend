import React, { useEffect, useState } from 'react';
import { getApi } from '../lib/api';

export default function Proxies() {
  const [proxies, setProxies] = useState([]);
  const [form, setForm] = useState({ name: '', local_port: '', remote_port: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProxies = async () => {
    setLoading(true);
    const res = await getApi().get('/proxies');
    setProxies(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadProxies();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await getApi().put(`/proxies/${editingId}`, form);
    } else {
      await getApi().post('/proxies', form);
    }
    setForm({ name: '', local_port: '', remote_port: '' });
    setEditingId(null);
    loadProxies();
  };

  const handleDelete = async (id) => {
    await getApi().delete(`/proxies/${id}`);
    loadProxies();
  };

  const handleEdit = (proxy) => {
    setForm(proxy);
    setEditingId(proxy.id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">端口映射管理</h2>

      <div className="space-y-2 mb-6">
        <input className="p-2 bg-gray-800 border border-gray-600 w-full" placeholder="名称" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="p-2 bg-gray-800 border border-gray-600 w-full" placeholder="本地端口" value={form.local_port} onChange={(e) => setForm({ ...form, local_port: e.target.value })} />
        <input className="p-2 bg-gray-800 border border-gray-600 w-full" placeholder="远程端口" value={form.remote_port} onChange={(e) => setForm({ ...form, remote_port: e.target.value })} />
        <button className="bg-blue-600 px-4 py-2 rounded" onClick={handleSubmit}>
          {editingId ? '保存修改' : '添加映射'}
        </button>
      </div>

      {loading ? (
        <div>加载中...</div>
      ) : (
        <ul className="space-y-2">
          {proxies.map((proxy) => (
            <li key={proxy.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
              <span>{proxy.name}：{proxy.local_port} → {proxy.remote_port}</span>
              <div className="space-x-2">
                <button className="bg-yellow-600 px-2 py-1 rounded" onClick={() => handleEdit(proxy)}>编辑</button>
                <button className="bg-red-600 px-2 py-1 rounded" onClick={() => handleDelete(proxy.id)}>删除</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
