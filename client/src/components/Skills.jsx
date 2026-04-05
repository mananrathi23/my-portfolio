import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const categories = [
  {
    label: 'Web Development',
    icon: '🎨',
    description: 'Focusing on modular React components, Angular, and high-performance user interfaces with clean, scalable architecture.',
    project: 'Alumni Portal',
    projectDesc: 'University-wide alumni networking platform built with React, Node.js, Express & MongoDB.',
    videoSrc: null,
    skills: [
      { name: 'React.js',      pct: 85, note: 'Built University Alumni Portal' },
      { name: 'JavaScript',    pct: 82, note: '3+ yrs across multiple projects' },
      { name: 'TypeScript',    pct: 72, note: 'Used in Student Mgmt System' },
      { name: 'Angular',       pct: 78, note: 'Enhanced features at Axestrack' },
      { name: 'Tailwind CSS',  pct: 80, note: 'Daily driver for UI styling' },
    ],
    terminal: [
      { cmd: 'git clone https://github.com/me/alumni-portal', delay: 0 },
      { cmd: 'cd alumni-portal && npm install', delay: 800, out: 'added 312 packages in 4.2s' },
      { cmd: 'npm run dev', delay: 600, out: '➜ Local: http://localhost:5173' },
      { cmd: 'git add . && git commit -m "feat: alumni dashboard"', delay: 900, out: '[main a3f9c12] feat: alumni dashboard' },
      { cmd: 'vercel --prod', delay: 700, out: '✓ Deployed to https://alumni-portal.vercel.app' },
    ]
  },
  {
    label: 'Systems & Databases',
    icon: '⚙️',
    description: 'Building secure, scalable backends with Java Spring Boot and Node.js, supporting both relational and NoSQL architectures.',
    project: 'Student Management System',
    projectDesc: 'Full-stack system with many-to-many DB mappings, teacher mark entry, and course enrollment.',
    videoSrc: null,
    skills: [
      { name: 'Java (Spring Boot)', pct: 80, note: 'Built many-to-many DB mappings' },
      { name: 'Node.js / Express',  pct: 78, note: 'Integrated secure REST APIs at Axestrack' },
      { name: 'PostgreSQL',         pct: 80, note: 'Used in 4+ full-stack projects' },
      { name: 'MongoDB',            pct: 75, note: 'Mongoose & Atlas, Alumni Portal' },
      { name: 'REST APIs',          pct: 85, note: 'Design + implementation across projects' },
    ],
    terminal: [
      { cmd: 'psql -U postgres -c "CREATE DATABASE student_db"', delay: 0, out: 'CREATE DATABASE' },
      { cmd: './mvnw spring-boot:run', delay: 800, out: 'Started StudentApp in 3.4s (JVM running)' },
      { cmd: 'curl -X POST /api/enroll -d \'{"studentId":42}\'', delay: 900, out: '{"status":"enrolled","course":"CS401"}' },
      { cmd: 'pgdump student_db > backup.sql', delay: 700, out: 'pg_dump: backup complete' },
    ]
  },
  {
    label: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Bridging the gap between software and hardware with real-time AI inference and deep learning deployed on edge devices.',
    project: 'ASL Detection on Raspberry Pi 4',
    projectDesc: 'Real-time American Sign Language detection using MediaPipe & Deep Learning deployed on edge hardware.',
    videoSrc: null,
    skills: [
      { name: 'Python',        pct: 85, note: 'Model training & data processing' },
      { name: 'Deep Learning', pct: 78, note: 'ASL Detection — LNMIIT Research Internship' },
      { name: 'MediaPipe',     pct: 82, note: 'Real-time gesture tracking' },
      { name: 'YOLOv8',        pct: 75, note: 'Logistics prediction models — Axestrack' },
    ],
    terminal: [
      { cmd: 'pip install mediapipe opencv-python torch', delay: 0, out: 'Successfully installed 14 packages' },
      { cmd: 'python train.py --epochs 50 --batch 32', delay: 900, out: 'Epoch 50/50 — loss: 0.041 — acc: 98.3%' },
      { cmd: 'python export.py --format tflite', delay: 800, out: 'Model saved → asl_model.tflite (4.2 MB)' },
      { cmd: 'scp asl_model.tflite pi@raspberrypi:~/model/', delay: 700, out: 'asl_model.tflite     100%  4.2MB  1.1MB/s' },
      { cmd: 'ssh pi@raspberrypi "python infer.py"', delay: 800, out: '✓ Inference running at 24 FPS' },
    ]
  },
  {
    label: 'Tools & DevOps',
    icon: '🔧',
    description: 'Version control, API testing, and deployment workflows that keep projects moving fast and staying reliable.',
    project: 'JKLU Feedback System',
    projectDesc: 'University feedback platform with structured student reviews and PostgreSQL-backed insights.',
    videoSrc: null,
    skills: [
      { name: 'Git / GitHub', pct: 88, note: 'Daily use, version control' },
      { name: 'Postman',      pct: 82, note: 'API testing & documentation' },
      { name: 'Vercel',       pct: 78, note: 'Frontend deploys' },
      { name: 'Render',       pct: 72, note: 'Backend deploys' },
      { name: 'VS Code',      pct: 92, note: 'Primary IDE' },
    ],
    terminal: [
      { cmd: 'git checkout -b feat/feedback-form', delay: 0, out: "Switched to branch 'feat/feedback-form'" },
      { cmd: 'npm run build', delay: 800, out: '✓ Built in 1.43s — dist/ ready' },
      { cmd: 'git push origin feat/feedback-form', delay: 700, out: 'Branch pushed → open PR on GitHub' },
      { cmd: 'vercel --prod', delay: 900, out: '✓ Deployed to https://jklu-feedback.vercel.app' },
      { cmd: 'curl https://jklu-feedback.vercel.app/api/health', delay: 600, out: '{"status":"ok","uptime":"99.9%"}' },
    ]
  },
]

const tagCloud = [
  'React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'Java', 'Spring Boot', 'JavaScript', 'TypeScript', 'Python',
  'YOLOv8', 'MediaPipe', 'Deep Learning', 'REST API', 'Git',
  'Tailwind CSS', 'Framer Motion', 'DSA', 'C++', 'Postman', 'Vite',
]

function Typewriter({ text, speed = 22, onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    if (!text) { onDone?.(); return }
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); onDone?.() }
    }, speed)
    return () => clearInterval(iv)
  }, [text])

  return <span>{displayed}</span>
}

function TerminalCard({ category }) {
  const { icon, label, project, projectDesc, videoSrc, description, terminal } = category
  const [lines, setLines]     = useState([])
  const [step, setStep]       = useState(-1)
  const [running, setRunning] = useState(false)
  // ✅ FIX 1: ref points to the scrollable div, not a bottom sentinel
  const scrollRef = useRef(null)
  const timerRef  = useRef(null)
  // ✅ FIX 2: track current step in a ref so handleCmdDone always reads latest value
  const stepRef   = useRef(-1)

  const startSequence = () => {
    clearTimeout(timerRef.current)
    setLines([])
    setStep(-1)
    stepRef.current = -1
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    if (step === -1) {
      timerRef.current = setTimeout(() => {
        setStep(0)
        stepRef.current = 0
      }, 300)
      return
    }
    if (step >= terminal.length) {
      timerRef.current = setTimeout(() => {
        setLines([])
        setStep(0)
        stepRef.current = 0
      }, 2800)
      return
    }
    const entry = terminal[step]
    timerRef.current = setTimeout(() => {
      setLines(l => [...l, { type: 'cmd', text: entry.cmd, done: false, id: `cmd-${step}` }])
    }, step === 0 ? 0 : entry.delay)

    return () => clearTimeout(timerRef.current)
  }, [step, running])

  // ✅ FIX 1: scroll only the terminal div itself, never the page
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  // ✅ FIX 2: use stepRef instead of counting cmd lines
  const handleCmdDone = () => {
    const currentStep = stepRef.current
    const entry = terminal[currentStep]
    if (!entry) return

    setLines(l => l.map((ln, idx) => idx === l.length - 1 ? { ...ln, done: true } : ln))

    if (entry.out) {
      setTimeout(() => {
        setLines(l => [...l, { type: 'out', text: entry.out, id: `out-${currentStep}` }])
        setTimeout(() => {
          const next = currentStep + 1
          stepRef.current = next
          setStep(next)
        }, 220)
      }, 180)
    } else {
      setTimeout(() => {
        const next = currentStep + 1
        stepRef.current = next
        setStep(next)
      }, 220)
    }
  }

  useEffect(() => { startSequence() }, [label])
  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <motion.div
      key={project}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl border dark:border-white/5 border-gray-200 dark:bg-white/5 bg-white/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-sm"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-accent2/10 rounded-full blur-2xl pointer-events-none" />

      {videoSrc ? (
        <div className="relative w-full aspect-video dark:bg-black/40 bg-gray-100 overflow-hidden">
          {videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
            <iframe
              src={`${videoSrc}${videoSrc.includes('?') ? '&' : '?'}loop=1&playlist=${videoSrc.split('/').pop().split('?')[0]}&autoplay=1&mute=1`}
              title={project}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={videoSrc} controls loop autoPlay muted className="w-full h-full object-cover" />
          )}
        </div>
      ) : (
        <div className="relative w-full aspect-video flex flex-col overflow-hidden dark:bg-[#0d0d14] bg-gray-950 rounded-t-3xl">

          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b dark:border-white/5 border-white/10 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-gray-500">
              {icon} {label.toLowerCase().replace(/ /g, '-')} — zsh
            </span>
            <button
              onClick={startSequence}
              className="ml-auto font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              ↺ replay
            </button>
          </div>

          {/* ✅ FIX 1: scroll happens on THIS div only via scrollRef */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scrollbar-none"
          >
            {lines.map((ln) => (
              <div key={ln.id} className="font-mono text-xs leading-relaxed">
                {ln.type === 'cmd' ? (
                  <div className="flex gap-2">
                    <span className="text-green-400 shrink-0">❯</span>
                    <span className="text-gray-100">
                      {ln.done
                        ? ln.text
                        : <Typewriter text={ln.text} speed={22} onDone={handleCmdDone} />
                      }
                      {!ln.done && (
                        <span className="inline-block w-1.5 h-3.5 bg-gray-300 ml-0.5 align-middle animate-pulse" />
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="pl-5 text-emerald-400/80">{ln.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project info */}
      <div className="relative z-10 p-5 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs dark:text-gray-400 text-gray-500">Project Highlight</span>
          </div>
          <h3 className="text-base font-bold dark:text-white text-gray-900">{project}</h3>
          <p className="text-xs dark:text-gray-500 text-gray-600 leading-relaxed mt-1">{projectDesc}</p>
        </div>
        <p className="text-xs dark:text-gray-600 text-gray-500 italic border-t dark:border-white/5 border-gray-200 pt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function SkillBar({ name, pct, note, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-sm dark:text-gray-300 text-gray-700">{name}</span>
        <span className="font-mono text-xs text-accent">{pct}%</span>
      </div>
      <div className="h-1.5 dark:bg-white/5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7c6af7, #f06595)' }}
        />
      </div>
      {hovered && (
        <div className="absolute right-0 -top-8 dark:bg-[#14141e] bg-white border border-accent/20 px-3 py-1 rounded-lg text-xs font-mono text-accent whitespace-nowrap z-20 shadow-lg">
          {note}
        </div>
      )}
    </div>
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
          <p className="dark:text-gray-400 text-gray-600 max-w-xl mb-12">
            Grouped by domain. Hover any bar to see depth of experience.
          </p>

          <div className="flex gap-3 mb-10 flex-wrap">
            {categories.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-full font-mono text-xs border transition-all duration-200 ${
                  active === i
                    ? 'bg-accent text-white border-accent shadow-[0_0_20px_rgba(124,106,247,0.4)]'
                    : 'dark:border-white/10 border-gray-300 dark:text-gray-400 text-gray-600 hover:border-accent/40 hover:text-accent'
                }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6 pt-2">
              {categories[active].skills.map(s => (
                <SkillBar key={s.name} {...s} inView={inView} />
              ))}
            </div>
            <TerminalCard category={categories[active]} />
          </div>

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