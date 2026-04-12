import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',         href: '#about',          id: 'about' },
  { label: 'Skills',        href: '#skills',         id: 'skills' },
  { label: 'Work',          href: '#projects',       id: 'projects' },
  { label: 'Journey',       href: '#timeline',       id: 'timeline' },
  { label: 'Certifications',href: '#certifications', id: 'certifications' },
  { label: 'Contact',       href: '#contact',        id: 'contact' },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeId,  setActiveId]  = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const sectionIds = links.map(l => l.id)
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleLinkClick = (id) => {
    setActiveId(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-accent font-semibold tracking-wider text-sm">
          &lt;<span className="text-white">MR</span> /&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => {
            const isActive = activeId === l.id
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => handleLinkClick(l.id)}
                  className={`relative font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-accent'
                      : 'text-gray-400 hover:text-accent'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title="Toggle theme"
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-200"
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

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
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
            className="md:hidden overflow-hidden bg-dark-bg/95 backdrop-blur-xl border-t border-white/5"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {links.map(l => {
                const isActive = activeId === l.id
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => handleLinkClick(l.id)}
                      className={`font-mono text-sm transition-colors flex items-center gap-2 ${
                        isActive ? 'text-accent' : 'text-gray-400 hover:text-accent'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      )}
                      {l.label}
                    </a>
                  </li>
                )
              })}
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