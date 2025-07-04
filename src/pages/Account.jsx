import { useState } from 'react'
import axios from 'axios'

export default function Account() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('请填写所有字段')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('新密码不一致')
      return
    }

    try {
      await axios.post('/api/account/password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
      alert('密码修改成功 ✅')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      alert('密码修改失败 ❌')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">👤 修改密码</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">当前密码</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">新密码</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-gray-300">确认新密码</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
      >
        💾 保存密码
      </button>
    </div>
  )
}
