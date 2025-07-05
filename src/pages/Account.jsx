import React, { useEffect, useState } from 'react';
import { getApi } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getApi()
      .get('/account')
      .then((res) => setUser(res.data))
      .catch(() => setError('账户信息加载失败'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="p-4">加载中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">账户信息</h2>
      {user ? (
        <div className="space-y-2">
          <div><strong>用户名：</strong>{user.username}</div>
          <div><strong>角色：</strong>{user.role || '普通用户'}</div>
          <div><strong>登录时间：</strong>{user.login_time || '未知'}</div>
          <button className="mt-4 bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      ) : (
        <div>未获取到用户信息</div>
      )}
    </div>
  );
}
