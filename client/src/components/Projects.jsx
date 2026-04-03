import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STATIC_PROJECTS = [
  {
    _id: '1',
    title: 'Alumni Networking Portal',
    description: 'A university-wide platform connecting students with graduates for mentorship and career opportunities. Built for JK Lakshmipat University.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    githubUrl: 'https://github.com/mananrathi23/Alumni_Portal',
    liveUrl: 'https://frontend-ten-nu-30.vercel.app/',
    challenge: 'Architected a scalable mentorship request system and integrated secure role-based access for students and alumni.',
    status: 'In Progress',
  },
  {
    _id: '2',
    title: 'ASL Detection (Edge AI)',
    description: 'Real-time American Sign Language detection system that translates hand gestures into text using deep learning and MediaPipe.',
    techStack: ['Python', 'Deep Learning', 'MediaPipe', 'Raspberry Pi'],
    githubUrl: 'https://github.com/Aman018-gif/asl-recognition',
    liveUrl: null,
    challenge: 'Deployed on Raspberry Pi 4 for real-time edge inference, optimizing model performance for low-power hardware constraints.',
    status: 'Completed',
  },
  {
    _id: '3',
    title: 'Student Management System',
    description: 'Full-stack system to manage student records, teacher-entered marks, and course enrollments using many-to-many database mappings.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'HTML/CSS'],
    githubUrl: 'https://github.com/mananrathi23',
    liveUrl: null,
    challenge: 'Designed many-to-many course enrollment mappings in PostgreSQL and built a secure REST API layer using Spring Boot for all CRUD operations.',
    status: 'Completed',
  },
  {
    _id: '4',
    title: 'Triply – Travel Platform',
    description: "Group travel management app with real-time expense splitting and itinerary planning. Built during LNMIIT's LNMHacks 7.0 Hackathon.",
    techStack: ['Java', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
    githubUrl: 'https://github.com/mananrathi23/Triply_LnmHacks/tree/master',
    liveUrl: null,
    challenge: 'Managed complex many-to-many database mappings in PostgreSQL for shared group itineraries and real-time expense splitting across multiple users.',
    status: 'Hackathon',
  },
  {
    _id: '5',
    title: 'JKLU Feedback System',
    description: 'University feedback platform enabling structured student reviews for courses, events, and workshops with PostgreSQL-backed insights for faculty.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
    githubUrl: 'https://github.com/mananrathi23/Student_Feedback_System',
    liveUrl: null,
    challenge: 'Built a structured review and insights dashboard backed by PostgreSQL to help university administrators track and improve course quality.',
    status: 'Completed',
  },
  {
    _id: '6',
    title: 'Image Captioning System',
    description: 'An end-to-end Deep Learning pipeline that generates descriptive natural language captions for uploaded images.',
    techStack: ['Python', 'PyTorch', 'CNN (InceptionV3)', 'RNN (LSTM)', 'NLTK'],
    githubUrl: 'https://github.com/mananrathi23/Image_Captioning_Project',
    liveUrl: null,
    challenge: 'Solved the vanishing gradient problem in the LSTM decoder and optimized the CNN-RNN encoder-decoder architecture for faster inference.',
    status: 'Completed',
  },
]

const ALL_TAGS = ['All', 'Web Projects', 'Machine Learning']

const CATEGORY_MAP = {
  'Web Projects':     ['1', '3', '4', '5'],
  'Machine Learning': ['2', '6'],
}

const STATUS_STYLES = {
  'In Progress': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  'Completed':   'bg-green-400/10  text-green-400  border-green-400/20',
  'Hackathon':   'bg-accent/10     text-accent     border-accent/20',
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      className="card border border-white/5 hover:border-accent/30 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          {project.status && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${STATUS_STYLES[project.status]}`}>
              {project.status}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.techStack?.slice(0, 4).map(t => (
          <span key={t} className="tech-badge text-[11px] px-2 py-0.5">{t}</span>
        ))}
        {project.techStack?.length > 4 && (
          <span className="tech-badge text-[11px] px-2 py-0.5 opacity-60">+{project.techStack.length - 4}</span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-gray-600 group-hover:text-accent/60 transition-colors">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Click for technical deep-dive
      </div>
    </motion.div>
  )
}

function Modal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-dark-card border border-accent/20 rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-xl text-white">{project.title}</h3>
            {project.status && (
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${STATUS_STYLES[project.status]}`}>
                {project.status}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-400 mb-6 leading-relaxed mt-4">{project.description}</p>

        {project.challenge && (
          <div className="mb-6 p-4 rounded-xl bg-accent/5 border border-accent/10">
            <div className="font-mono text-xs text-accent mb-2">// Technical Challenge Solved</div>
            <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline text-xs px-5 py-2.5">
              View Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary text-xs px-5 py-2.5">
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [filter, setFilter]   = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All'
    ? STATIC_PROJECTS
    : STATIC_PROJECTS.filter(p => CATEGORY_MAP[filter]?.includes(p._id))

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've <span className="gradient-text">Built</span></h2>
          <p className="text-gray-400 max-w-xl mb-8">
            Click any card for a technical deep-dive. Filter by category.
          </p>

          <div className="flex gap-2 flex-wrap mb-10">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs border transition-all duration-200 ${
                  filter === tag
                    ? 'bg-accent text-white border-accent shadow-[0_0_16px_rgba(124,106,247,0.35)]'
                    : 'border-white/10 text-gray-400 hover:border-accent/40 hover:text-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-gray-600 font-mono text-sm"
              >
                No projects in <span className="text-accent">"{filter}"</span> yet.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <ProjectCard key={p._id} project={p} onClick={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}