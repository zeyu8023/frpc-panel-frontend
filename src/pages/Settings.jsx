import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Settings() {
  const [frpcIniPath, setFrpcIniPath] = useState('')
  const [containerName, setContainerName] = useState('')
  const [loading, setLoading] = useState(true)

  // 加载当前配置
  useEffect(() => {
    axios.get('/api/settings')
      。then(res => {
        setFrpcIniPath(res.data.frpc_ini || '')
        setContainerName(res.data.container_name || '')
      })
      。catch(() => alert('无法加载设置'))
      。finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      await axios.post('/api/settings', {
        frpc_ini: frpcIniPath,
        container_name: containerName
      })
      alert('配置已保存 ✅')
    } catch {
      alert('保存失败 ❌')
    }
  }

  if (loading) return <div className="p-6">加载中...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">⚙️ 设置</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">frpc.ini 路径</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={frpcIniPath}
          onChange={(e) => setFrpcIniPath(e.target.value)}
          placeholder="/etc/frpc/frpc.ini"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-gray-300">frpc 容器名称</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={containerName}
          onChange={(e) => setContainerName(e.target.value)}
          placeholder="frpc_client"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        💾 保存配置
      </button>
    </div>
  )
}
