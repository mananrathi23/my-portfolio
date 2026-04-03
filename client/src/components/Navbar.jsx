import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',   href: '#about' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Work',    href: '#projects' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'bg-[#f0efff]/85 backdrop-blur-xl border-b border-black/8 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-accent font-semibold tracking-wider text-sm">
          &lt;<span className={isDark ? 'text-white' : 'text-gray-900'}>MR</span> /&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title="Toggle theme"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:text-accent hover:border-accent/40 ${
              isDark
                ? 'border-white/10 text-gray-400'
                : 'border-black/10 text-gray-600'
            }`}
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9H21M3 12H2.34m15.07-6.07-.71.71M6.34 17.66l-.71.71M18.36 17.66l.71.71M5.64 6.64l.71.71M12 7a5 5 0 100 10A5 5 0 0012 7z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>

          {/* CV button */}
          <a
            href={`${import.meta.env.VITE_API_URL || '/api'}/cv/download/pdf`}
            target="_blank" rel="noreferrer"
            className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Resume
          </a>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden backdrop-blur-xl border-t ${
              isDark
                ? 'bg-dark-bg/95 border-white/5'
                : 'bg-[#f0efff]/95 border-black/8'
            }`}
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm transition-colors hover:text-accent ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`${import.meta.env.VITE_API_URL || '/api'}/cv/download/pdf`} className="btn-primary text-xs w-full justify-center py-2">
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}