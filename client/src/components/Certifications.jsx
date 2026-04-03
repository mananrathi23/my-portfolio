import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const certs = [
  {
    title: 'Learn Python',
    issuer: 'CodeChef',
    date: 'Aug 2023',
    icon: '🐍',
    color: '#3b82f6',
    url: 'https://www.codechef.com/certificates/public/735003c',
    desc: 'Completed all lessons and practice projects in Python — covering data types, loops, functions, OOP, and file handling.',
  },
  {
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI',
    date: '2023',
    icon: '🤖',
    color: '#f06595',
    url: 'https://coursera.org/share/aa0c3250119adfd2aa6c5dd25a6c5731',
    desc: 'Completed 100% of the course covering AI strategy, ML workflows, and building AI-powered products for non-technical and technical audiences alike.',
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    date: '2024',
    icon: '✨',
    color: '#4ade80',
    url: 'https://coursera.org/share/8ec2d90f0bfe20f7580dcbed7a63cedf',
    desc: 'Completed Google Cloud\'s foundational course on Generative AI — covering large language models, prompt engineering, and practical GenAI applications.',
  },
  {
    title: 'Exploring C (Course 1 of 4)',
    issuer: 'Coursera',
    date: '2023',
    icon: '⚙️',
    color: '#f59e0b',
    url: 'https://coursera.org/share/78407929862997b8cbc4849eac056801',
    desc: 'Completed the first course in the C programming specialization — covering fundamentals, memory management, pointers, and structured programming in C.',
  },
  {
    title: 'Matrix Algebra for Engineers',
    issuer: 'The Hong Kong University of Science and Technology',
    date: '2024',
    icon: '🔢',
    color: '#a78bfa',
    url: 'https://coursera.org/share/810ed3b732a5d7bda0df6e8b184acb98',
    desc: 'Completed 100% of this engineering mathematics course — covering matrix operations, eigenvalues, linear systems, and applications in engineering contexts.',
  },
]

function CertCard({ cert, index, inView }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-52 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        className="relative"
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border dark:border-white/5 border-gray-200 dark:bg-[#14141e] bg-white shadow-sm hover:border-gray-300 dark:hover:border-white/10 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
            >
              {cert.icon}
            </div>
            <div className="text-right">
              <div className="font-mono text-xs dark:text-gray-600 text-gray-500">{cert.date}</div>
              <div className="font-mono text-xs mt-0.5 truncate max-w-[120px]" style={{ color: cert.color }}>
                {cert.issuer}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold dark:text-white text-gray-900 leading-snug mb-2">{cert.title}</h3>
            <div className="font-mono text-[11px] dark:text-gray-600 text-gray-500">Click to see details →</div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border shadow-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `${cert.color}10`,
            borderColor: `${cert.color}30`,
          }}
        >
          <p className="dark:text-gray-300 text-gray-700 text-sm leading-relaxed">{cert.desc}</p>
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: `${cert.color}40`, color: cert.color }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            View Certificate
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  const [ref, inView] = useInView()

  return (
    <section id="certifications" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Certifications &amp; <span className="gradient-text">Awards</span></h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-xl mb-12">
            Click any card to flip it and see details and verification link.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}