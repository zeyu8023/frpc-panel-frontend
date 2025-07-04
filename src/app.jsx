import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Proxies from './pages/Proxies'
import Logs from './pages/Logs'
import Account from './pages/Account'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/proxies" element={<Proxies />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
