import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const categories = [
  {
    label: 'Web Development',
    icon: '🎨',
    description: 'Focusing on modular React components, Angular, and high-performance user interfaces with clean, scalable architecture.',
    project: 'Alumni Portal',
    projectDesc: 'University-wide alumni networking platform built with React, Node.js, Express & MongoDB.',
    videoSrc: null, // Replace with your YouTube embed URL or local path e.g. '/videos/alumni-portal.mp4'
    skills: [
      { name: 'React.js',      pct: 85, note: 'Built University Alumni Portal' },
      { name: 'JavaScript',    pct: 82, note: '3+ yrs across multiple projects' },
      { name: 'TypeScript',    pct: 72, note: 'Used in Student Mgmt System' },
      { name: 'Angular',       pct: 78, note: 'Enhanced features at Axestrack' },
      { name: 'Tailwind CSS',  pct: 80, note: 'Daily driver for UI styling' },
    ]
  },
  {
    label: 'Systems & Databases',
    icon: '⚙️',
    description: 'Building secure, scalable backends with Java Spring Boot and Node.js, supporting both relational and NoSQL architectures.',
    project: 'Student Management System',
    projectDesc: 'Full-stack system with many-to-many DB mappings, teacher mark entry, and course enrollment.',
    videoSrc: null, // e.g. '/videos/student-mgmt.mp4'
    skills: [
      { name: 'Java (Spring Boot)', pct: 80, note: 'Built many-to-many DB mappings' },
      { name: 'Node.js / Express',  pct: 78, note: 'Integrated secure REST APIs at Axestrack' },
      { name: 'PostgreSQL',         pct: 80, note: 'Used in 4+ full-stack projects' },
      { name: 'MongoDB',            pct: 75, note: 'Mongoose & Atlas, Alumni Portal' },
      { name: 'REST APIs',          pct: 85, note: 'Design + implementation across projects' },
    ]
  },
  {
    label: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Bridging the gap between software and hardware with real-time AI inference and deep learning deployed on edge devices.',
    project: 'ASL Detection on Raspberry Pi 4',
    projectDesc: 'Real-time American Sign Language detection using MediaPipe & Deep Learning deployed on edge hardware.',
    videoSrc: null, // e.g. '/videos/asl-detection.mp4'
    skills: [
      { name: 'Python',        pct: 85, note: 'Model training & data processing' },
      { name: 'Deep Learning', pct: 78, note: 'ASL Detection — LNMIIT Research Internship' },
      { name: 'MediaPipe',     pct: 82, note: 'Real-time gesture tracking' },
      { name: 'YOLOv8',        pct: 75, note: 'Logistics prediction models — Axestrack' },
    ]
  },
  {
    label: 'Tools & DevOps',
    icon: '🔧',
    description: 'Version control, API testing, and deployment workflows that keep projects moving fast and staying reliable.',
    project: 'JKLU Feedback System',
    projectDesc: 'University feedback platform with structured student reviews and PostgreSQL-backed insights.',
    videoSrc: null, // e.g. '/videos/feedback-system.mp4'
    skills: [
      { name: 'Git / GitHub', pct: 88, note: 'Daily use, version control' },
      { name: 'Postman',      pct: 82, note: 'API testing & documentation' },
      { name: 'Vercel',       pct: 78, note: 'Frontend deploys' },
      { name: 'Render',       pct: 72, note: 'Backend deploys' },
      { name: 'VS Code',      pct: 92, note: 'Primary IDE' },
    ]
  },
]

const tagCloud = [
  'React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'Java', 'Spring Boot', 'JavaScript', 'TypeScript', 'Python',
  'YOLOv8', 'MediaPipe', 'Deep Learning', 'REST API', 'Git',
  'Tailwind CSS', 'Framer Motion', 'DSA', 'C++', 'Postman', 'Vite',
]

function SkillBar({ name, pct, note, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-sm text-gray-300">{name}</span>
        <span className="font-mono text-xs text-accent">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7c6af7, #f06595)' }}
        />
      </div>
      {hovered && (
        <div className="absolute right-0 -top-8 glass border border-accent/20 px-3 py-1 rounded-lg text-xs font-mono text-accent whitespace-nowrap z-20">
          {note}
        </div>
      )}
    </div>
  )
}

function VideoCard({ category }) {
  const { icon, label, project, projectDesc, videoSrc, description } = category

  return (
    <motion.div
      key={project}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col"
    >
      {/* Background glow blobs */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-accent2/10 rounded-full blur-2xl pointer-events-none" />

      {/* ── Video / Placeholder area ── */}
      <div className="relative w-full aspect-video bg-black/40 overflow-hidden">
        {videoSrc ? (
          videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
            // YouTube embed — ?loop=1&playlist=ID required for YouTube loop
            <iframe
              src={`${videoSrc}${videoSrc.includes('?') ? '&' : '?'}loop=1&playlist=${videoSrc.split('/').pop().split('?')[0]}&autoplay=1&mute=1`}
              title={project}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Local mp4 — loop + autoPlay + muted (muted required for autoplay to work in browsers)
            <video
              src={videoSrc}
              controls
              loop
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          )
        ) : (
          // Placeholder — replace videoSrc above to swap this out
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 select-none">
            {/* Gradient wash */}
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'linear-gradient(135deg, #7c6af7 0%, #f06595 100%)' }}
            />
            {/* Scanlines */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)',
              }}
            />

            {/* Animated play button */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full border border-accent/30 animate-ping opacity-30" />
              <div className="absolute w-14 h-14 rounded-full border border-accent/50 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Text */}
            <div className="relative z-10 text-center px-6">
              <p className="font-mono text-xs text-accent/80 mb-1">📹 Demo coming soon</p>
              <p className="font-mono text-xs text-gray-600">
                Set <code className="text-gray-400">videoSrc</code> in categories to enable
              </p>
            </div>

            {/* Top-right badge */}
            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md bg-black/40 border border-white/10 font-mono text-xs text-gray-500">
              {icon} {label}
            </div>
          </div>
        )}
      </div>

      {/* ── Project info below video ── */}
      <div className="relative z-10 p-5 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-gray-400">Project Highlight</span>
          </div>
          <h3 className="text-base font-bold text-white">{project}</h3>
          <p className="text-xs text-gray-500 leading-relaxed mt-1">{projectDesc}</p>
        </div>
        <p className="text-xs text-gray-600 italic border-t border-white/5 pt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)

  return (
    <section id="skills" className="section dark:bg-dark-bg2/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">Tech I <span className="gradient-text">work with</span></h2>
          <p className="text-gray-400 max-w-xl mb-12">
            Grouped by domain. Hover any bar to see depth of experience.
          </p>

          {/* Category tabs */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {categories.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-full font-mono text-xs border transition-all duration-200 ${
                  active === i
                    ? 'bg-accent text-white border-accent shadow-[0_0_20px_rgba(124,106,247,0.4)]'
                    : 'border-white/10 text-gray-400 hover:border-accent/40 hover:text-accent'
                }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {/* Skill bars + video card */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Left — skill bars */}
            <div className="space-y-6 pt-2">
              {categories[active].skills.map(s => (
                <SkillBar key={s.name} {...s} inView={inView} />
              ))}
            </div>

            {/* Right — video card (switches per tab) */}
            <VideoCard category={categories[active]} />
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-3 justify-center">
            {tagCloud.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="tech-badge cursor-default select-none"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}