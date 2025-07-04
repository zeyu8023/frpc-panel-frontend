import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Proxies() {
  const [proxies, setProxies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', local_ip: '', local_port: '', remote_port: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  const loadProxies = () => {
    axios.get('/api/proxies')
      .then(res => setProxies(res.data))
      .catch(() => alert('加载映射失败'))
  }

  useEffect(() => {
    loadProxies()
  }, [])

  const handleSave = async () => {
    try {
      if (editingIndex !== null) {
        await axios.put(`/api/proxies/${form.name}`, form)
      } else {
        await axios.post('/api/proxies', form)
      }
      setShowForm(false)
      setForm({ name: '', local_ip: '', local_port: '', remote_port: '' })
      setEditingIndex(null)
      loadProxies()
    } catch {
      alert('保存失败')
    }
  }

  const handleEdit = (proxy) => {
    setForm(proxy)
    setEditingIndex(proxy.name)
    setShowForm(true)
  }

  const handleDelete = async (name) => {
    if (!confirm(`确定要删除映射 ${name} 吗？`)) return
    try {
      await axios.delete(`/api/proxies/${name}`)
      loadProxies()
    } catch {
      alert('删除失败')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📋 端口映射管理</h2>
        <button
          onClick={() => {
            setForm({ name: '', local_ip: '', local_port: '', remote_port: '' })
            setEditingIndex(null)
            setShowForm(true)
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          ➕ 添加映射
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-2">名称</th>
              <th className="p-2">本地 IP</th>
              <th className="p-2">本地端口</th>
              <th className="p-2">远程端口</th>
              <th className="p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {proxies.map((p) => (
              <tr key={p.name} className="border-b border-gray-700">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.local_ip}</td>
                <td className="p-2">{p.local_port}</td>
                <td className="p-2">{p.remote_port}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-400 hover:underline">编辑</button>
                  <button onClick={() => handleDelete(p.name)} className="text-red-400 hover:underline">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{editingIndex ? '编辑映射' : '添加映射'}</h3>
            {['name', 'local_ip', 'local_port', 'remote_port'].map((field) => (
              <div key={field} className="mb-3">
                <label className="block mb-1 text-sm capitalize">{field.replace('_', ' ')}</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-700"
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  disabled={field === 'name' && editingIndex !== null}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-600 rounded">取消</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
