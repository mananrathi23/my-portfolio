import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || '/api'

export default function SystemStatus() {
  const [open,   setOpen]   = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/stats`)
      setStatus(data)
    } catch {
      setStatus({ status: 'error', db: 'unreachable' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const id = setInterval(fetchStatus, 30000)
    return () => clearInterval(id)
  }, [])

  const isOnline = status?.status === 'online'

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Toggle pill */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 font-mono text-xs text-gray-400 hover:border-accent/30 hover:text-accent transition-all duration-200"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        sys.status
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-10 left-0 w-64 glass border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-accent">// System Status</span>
              <button onClick={fetchStatus} className="text-gray-600 hover:text-accent transition-colors" title="Refresh">
                <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
            </div>

            {status ? (
              <div className="space-y-2.5">
                {[
                  {
                    label: 'API Server',
                    value: status.status === 'online' ? 'Online' : 'Offline',
                    ok: status.status === 'online'
                  },
                  {
                    label: 'Database',
                    value: status.db === 'connected' ? 'Connected' : status.db,
                    ok: status.db === 'connected'
                  },
                  {
                    label: 'DB Latency',
                    value: status.dbLatency !== undefined ? `${status.dbLatency}ms` : '—',
                    ok: (status.dbLatency || 0) < 200
                  },
                  {
                    label: 'Uptime',
                    value: status.uptime ? `${Math.floor(status.uptime / 60)}m ${status.uptime % 60}s` : '—',
                    ok: true
                  },
                  {
                    label: 'Messages recv.',
                    value: status.totalMessages ?? '—',
                    ok: true
                  },
                  {
                    label: 'CV Downloads',
                    value: status.totalDownloads ?? '—',
                    ok: true
                  },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-600">{row.label}</span>
                    <span className={`font-mono text-xs ${row.ok ? 'text-green-400' : 'text-red-400'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}

                <div className="pt-2 border-t border-white/5">
                  <span className="font-mono text-[10px] text-gray-700">
                    Last checked: {new Date(status.timestamp || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="font-mono text-xs text-gray-600 text-center py-2">
                {loading ? 'Fetching...' : 'Could not connect'}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
