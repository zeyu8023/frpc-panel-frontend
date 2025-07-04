import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex flex-wrap justify-between items-center">
      <div className="text-xl font-bold">frpc 面板</div>
      <div className="flex flex-wrap gap-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-blue-400">仪表盘</Link>
        <Link to="/proxies" className="hover:text-blue-400">映射管理</Link>
        <Link to="/logs" className="hover:text-blue-400">日志</Link>
        <Link to="/settings" className="hover:text-blue-400">设置</Link>
        <Link to="/account" className="hover:text-blue-400">账户</Link>
      </div>
    </nav>
  )
}
