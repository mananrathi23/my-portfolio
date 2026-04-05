import { useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import ThreeBackground from './ThreeBackground'

export default function Hero() {
  const btnRef = useRef(null)

  const onMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const onMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)'
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent2/8 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Terminal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs dark:text-gray-400 text-gray-600">
            <span className="text-accent">~/</span> Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-heading text-6xl md:text-8xl font-bold mb-4 leading-none tracking-tight"
        >
          <span className="dark:text-white text-gray-900">Manan</span>{' '}
          <span className="gradient-text">Rathi</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-mono text-xl md:text-2xl dark:text-gray-400 text-gray-600 mb-8 h-10"
        >
          <span className="text-accent">$ </span>
          <TypeAnimation
            sequence={[
              'Full-Stack Developer', 2000,
              'Machine Learning and Deep Learning Enthusiast', 2000,
              'Node.js Backend Engineer', 2000,
              'DSA Teaching Assistant', 2000,
            ]}
            repeat={Infinity}
            speed={50}
            className="text-accent font-semibold"
          />
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I build performant, scalable web applications with clean code and great UX.
          Based in <span className="text-accent">Jaipur, India</span>. Currently open for internships and full-time roles.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="relative">
            <a
              ref={btnRef}
              href="/Resume.pdf"
              download="MananRathi_Resume.pdf"
              className="btn-primary text-sm px-8 py-4 transition-transform duration-200"
              style={{ display: 'inline-flex' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV (PDF)
            </a>
          </div>

          <a
            href="/Resume.docx"
            download="MananRathi_Resume.docx"
            className="btn-outline text-sm px-8 py-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV (DOCX)
          </a>

          <a href="#contact" className="font-mono text-sm dark:text-gray-400 text-gray-600 hover:text-accent transition-colors underline underline-offset-4">
            Let's talk →
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}