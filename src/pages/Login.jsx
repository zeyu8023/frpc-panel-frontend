import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', { username, password })
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch {
      alert('登录失败')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">登录</h2>
        <input
          type="text"
          placeholder="用户名"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          登录
        </button>
      </div>
    </div>
  )
}
