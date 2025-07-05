import React, { useEffect, useState } from 'react';
import { getApi } from '../lib/api';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await getApi().get('/logs');
      setLogs(res.data);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">frpc 日志</h2>
      <pre className="bg-gray-800 p-2 rounded text-sm h-[500px] overflow-y-auto">
        {logs.join('\n')}
      </pre>
    </div>
  );
}
