import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Logs() {
  const [logs, setLogs] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const logRef = useRef(null)

  const fetchLogs = async () => {
    try {
      const res = await axios.get('/api/logs')
      setLogs(res.data.logs || '')
    } catch {
      setLogs('❌ 无法获取日志')
    }
  }

  useEffect(() => {
    fetchLogs()
    let interval
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 3000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📜 frpc 容器日志</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
            />
            自动刷新
          </label>
          <button
            onClick={fetchLogs}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
          >
            🔄 手动刷新
          </button>
        </div>
      </div>

      <div
        ref={logRef}
        className="bg-black text-green-400 font-mono text-sm p-4 rounded h-[60vh] overflow-y-auto whitespace-pre-wrap"
      >
        {logs}
      </div>
    </div>
  )
}
