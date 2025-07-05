import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [proxyCount, setProxyCount] = useState(0)
  const [containerStatus, setContainerStatus] = useState('未知')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/api/proxies')
      .then((res) => {
        setProxyCount(res.data.length)
        setContainerStatus('运行中 ✅')
      })
      .catch(() => {
        setContainerStatus('无法连接 ❌')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">控制面板</h1>

      {loading ? (
        <p className="text-gray-400">加载中...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">映射数量</h2>
            <p className="text-3xl">{proxyCount}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">frpc 容器状态</h2>
            <p className="text-xl">{containerStatus}</p>
          </div>
        </div>
      )}
    </div>
  )
}
