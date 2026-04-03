import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL || '/api'

const validate = ({ name, email, message }) => {
  const errs = {}
  if (!name.trim() || name.trim().length < 2)           errs.name    = 'Name must be at least 2 characters'
  if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))  errs.email   = 'Please enter a valid email'
  if (!message.trim() || message.trim().length < 10)    errs.message = 'Message must be at least 10 characters'
  return errs
}

const links = [
  {
    label: 'GitHub',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    href: 'https://github.com/mananrathi23',
    color: '#ffffff'
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://www.linkedin.com/in/manan-rathi-873a282a4/',
    color: '#0077b5'
  },
  {
    label: 'Email',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    href: 'mailto:MananRathi.p@gmail.com',
    color: '#7c6af7'
  },
]

const inputBase = [
  'w-full rounded-xl px-4 py-3',
  'font-mono text-sm',
  'transition-all duration-200 outline-none resize-none',
  'bg-[#12121c] text-[#e8e8f0] placeholder-[#4a4a5a]',
  '[color-scheme:dark]',
].join(' ')

const inputClass = (field, errors) =>
  [
    inputBase,
    errors[field]
      ? 'border border-red-500/60 focus:border-red-500'
      : 'border border-white/10 focus:border-[#7c6af7]/60 focus:shadow-[0_0_0_3px_rgba(124,106,247,0.12)]',
  ].join(' ')

export default function Contact() {
  const [ref, inView] = useInView()
  const [form,    setForm]    = useState({ name: '', email: '', message: '', website: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (form.website) return
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await axios.post(`${API}/contact`, form)
      toast.success("Message sent! I'll reply within 24h ✓")
      setForm({ name: '', email: '', message: '', website: '' })
      setErrors({})
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section dark:bg-dark-bg2/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16"
        >
          <div>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm actively looking for internships and full-time MERN stack roles.
              Whether you have a project, an opportunity, or just want to say hi — my inbox is always open.
            </p>
            <div className="space-y-3 mb-10">
              {[
                { label: 'Response time', value: 'Within 24 hours',          icon: '⚡' },
                { label: 'Availability',  value: 'Immediate start',           icon: '📅' },
                { label: 'Location',      value: 'Jaipur, India (Remote OK)', icon: '📍' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-500">{item.label}:</span>
                  <span className="text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  title={l.label}
                  className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:-translate-y-1 hover:border-white/25"
                  onMouseEnter={e => { e.currentTarget.style.color = l.color }}
                  onMouseLeave={e => { e.currentTarget.style.color = '' }}
                >
                  {l.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter Your Name"
                  autoComplete="name"
                  className={inputClass('name', errors)}
                />
                {errors.name && <p className="mt-1.5 font-mono text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Enter Your Email"
                  autoComplete="email"
                  className={inputClass('email', errors)}
                />
                {errors.email && <p className="mt-1.5 font-mono text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Message"
                  className={inputClass('message', errors)}
                />
                {errors.message && <p className="mt-1.5 font-mono text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}