import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL || '/api'

// ── Login form ─────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [pwd, setPwd]   = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setBusy(true)
    try {
      const { data } = await axios.post(`${API}/auth/login`, { password: pwd })
      localStorage.setItem('admin_token', data.token)
      onLogin(data.token)
      toast.success('Welcome back, Admin')
    } catch {
      toast.error('Wrong password')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm glass border border-white/10 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="font-mono text-accent text-sm mb-2">// admin access</div>
          <h1 className="font-heading text-2xl text-white">Portfolio CMS</h1>
          <p className="text-gray-500 text-xs mt-1 font-mono">Restricted — owner only</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-mono text-xs text-gray-500 block mb-2">Password</label>
            <input
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-gray-700 outline-none focus:border-accent/50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full justify-center py-3 disabled:opacity-60"
          >
            {busy ? 'Verifying…' : 'Enter'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ── Dashboard ───────────────────────────────────────────────
function Dashboard({ token, onLogout }) {
  const [tab,       setTab]       = useState('messages')
  const [messages,  setMessages]  = useState([])
  const [projects,  setProjects]  = useState([])
  const [stats,     setStats]     = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [form,      setForm]      = useState({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '' })

  const headers = { Authorization: `Bearer ${token}` }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [msg, proj, stat] = await Promise.all([
        axios.get(`${API}/contact`,  { headers }),
        axios.get(`${API}/projects`, { headers }),
        axios.get(`${API}/stats`,    { headers }),
      ])
      setMessages(msg.data)
      setProjects(proj.data)
      setStats(stat.data)
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        toast.error('Session expired')
        onLogout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const addProject = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean)
      }
      const { data } = await axios.post(`${API}/projects`, payload, { headers })
      setProjects(p => [data, ...p])
      setForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '' })
      toast.success('Project added!')
    } catch {
      toast.error('Failed to add project')
    }
  }

  const deleteProject = async id => {
    if (!confirm('Delete this project?')) return
    try {
      await axios.delete(`${API}/projects/${id}`, { headers })
      setProjects(p => p.filter(x => x._id !== id))
      toast.success('Deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  const tabs = [
    { id: 'messages', label: `Messages (${messages.length})` },
    { id: 'projects', label: `Projects (${projects.length})` },
    { id: 'stats',    label: 'System Stats' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Top bar */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-accent text-sm">// admin</span>
          <span className="font-heading text-lg">Portfolio CMS</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="font-mono text-xs text-gray-500 hover:text-accent transition-colors">← View Site</a>
          <button onClick={onLogout} className="font-mono text-xs text-gray-500 hover:text-red-400 transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats strip */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Messages',   value: stats.totalMessages  ?? 0 },
              { label: 'Downloads',  value: stats.totalDownloads ?? 0 },
              { label: 'DB Latency', value: `${stats.dbLatency ?? '?'}ms` },
              { label: 'Uptime',     value: `${Math.floor((stats.uptime || 0) / 60)}m` },
            ].map(s => (
              <div key={s.label} className="card border border-white/5 text-center">
                <div className="font-heading text-2xl text-accent">{s.value}</div>
                <div className="font-mono text-xs text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-3 mb-8 border-b border-white/5 pb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-mono text-xs px-4 py-2 rounded-lg transition-all ${
                tab === t.id ? 'bg-accent text-white' : 'text-gray-500 hover:text-accent'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Messages tab */}
        {tab === 'messages' && (
          <div className="space-y-4">
            {loading && <p className="font-mono text-xs text-gray-600">Loading…</p>}
            {messages.length === 0 && !loading && (
              <p className="font-mono text-xs text-gray-600">No messages yet.</p>
            )}
            {messages.map(m => (
              <div key={m._id} className="card border border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-heading text-sm text-white">{m.name}</span>
                    <span className="font-mono text-xs text-gray-500 ml-3">{m.email}</span>
                  </div>
                  <span className="font-mono text-xs text-gray-600">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{m.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects tab */}
        {tab === 'projects' && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="card border border-accent/10">
              <h3 className="font-mono text-xs text-accent mb-4">// Add New Project</h3>
              <form onSubmit={addProject} className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'title',       label: 'Title',            placeholder: 'E-Commerce App' },
                  { name: 'techStack',   label: 'Tech (comma sep)', placeholder: 'React, Node.js, MongoDB' },
                  { name: 'githubUrl',   label: 'GitHub URL',       placeholder: 'https://github.com/...' },
                  { name: 'liveUrl',     label: 'Live URL',         placeholder: 'https://...' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="font-mono text-xs text-gray-500 block mb-1">{f.label}</label>
                    <input
                      value={form[f.name]}
                      onChange={e => setForm(x => ({ ...x, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-white/3 border border-white/8 rounded-lg px-3 py-2 font-mono text-xs text-white placeholder-gray-700 outline-none focus:border-accent/40"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="font-mono text-xs text-gray-500 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm(x => ({ ...x, description: e.target.value }))}
                    placeholder="What does this project do?"
                    className="w-full bg-white/3 border border-white/8 rounded-lg px-3 py-2 font-mono text-xs text-white placeholder-gray-700 outline-none focus:border-accent/40 resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary text-xs px-6 py-2.5">Add Project</button>
                </div>
              </form>
            </div>

            {/* List */}
            {projects.map(p => (
              <div key={p._id} className="card border border-white/5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm text-white mb-1">{p.title}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.techStack?.map(t => <span key={t} className="tech-badge text-[10px]">{t}</span>)}
                  </div>
                </div>
                <button
                  onClick={() => deleteProject(p._id)}
                  className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stats tab */}
        {tab === 'stats' && stats && (
          <div className="card border border-white/5">
            <h3 className="font-mono text-xs text-accent mb-6">// Live System Metrics</h3>
            <div className="space-y-3">
              {Object.entries(stats).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="font-mono text-xs text-gray-500">{k}</span>
                  <span className="font-mono text-xs text-white">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Admin page ─────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  if (!token) return <LoginForm onLogin={setToken} />
  return <Dashboard token={token} onLogout={logout} />
}
