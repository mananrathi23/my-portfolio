import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const stats = [
  { value: '8.9', label: 'Current CGPA' },
  { value: '100%', label: 'Scholarship' },
  { value: '100+', label: 'Students Mentored' },
  { value: '5+', label: 'Projects Built' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left – photo + floating badges */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl scale-75" />

            <div className="relative w-72 md:w-80" style={{ aspectRatio: '3/4' }}>
              <div className="absolute inset-0 rounded-2xl border border-accent/30 rotate-6" />
              <div className="absolute inset-0 rounded-2xl border border-accent2/20 -rotate-3" />
              <img
                src="/profile.jpg"
                alt="Manan Rathi"
                className="relative z-10 w-full h-full object-cover object-top rounded-2xl transition-all duration-500"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="absolute inset-0 z-10 hidden items-center justify-center bg-dark-card dark:bg-dark-card bg-white rounded-2xl border border-black/10 dark:border-white/10">
                <div className="font-heading text-7xl text-accent font-bold bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
                  MR
                </div>
              </div>

              {[
                { icon: '⚛', label: 'React', pos: '-top-8 -right-6' },
                { icon: '🟢', label: 'Node.js', pos: '-bottom-8 -right-6' },
                { icon: '☕', label: 'Spring Boot', pos: '-bottom-8 -left-6' },
                { icon: '🐍', label: 'Python / AI', pos: '-top-8 -left-6' },
              ].map(({ icon, label, pos }, i) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', delay: i * 0.6 }}
                  className={`absolute ${pos} z-20 glass border border-white/10 dark:border-white/10 border-black/10 rounded-lg px-3 py-2 text-xs font-mono flex items-center gap-1.5`}
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <span>{icon}</span>
                  <span className="dark:text-gray-300 text-gray-700">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right – bio */}
          <div>
            <span className="section-label">About me</span>
            <h2 className="section-title">
              The only way to go <span className="gradient-text">fast</span>, is to go <span className="gradient-text">well</span>.
            </h2>

            {/* Live status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-400/20 mb-6 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400">Status:</span>
              <span className="dark:text-gray-300 text-gray-700">Open for Internships · Jaipur, IN (UTC+5:30)</span>
            </div>

            <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-4">
              I'm a Full Stack Developer and AI enthusiast specialising in building scalable applications
              and intelligent systems. Currently serving as a{' '}
              <span className="dark:text-white text-gray-900 font-medium">Teaching Assistant for DSA</span> at JK Lakshmipat
              University, where I mentor 100+ students in algorithmic problem-solving. My work bridges
              the gap between high-level web architecture and real-world AI implementation.
            </p>
            <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-8">
              From developing a university-wide{' '}
              <span className="dark:text-white text-gray-900 font-medium">Alumni Networking Portal</span> using the MERN
              stack to deploying deep learning models on{' '}
              <span className="dark:text-white text-gray-900 font-medium">Raspberry Pi 4</span> for real-time edge
              inference — I focus on performance and practical utility, building software that solves
              real-world problems.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="card text-center">
                  <div className="font-heading text-3xl font-bold gradient-text">{value}</div>
                  <div className="font-mono text-xs dark:text-gray-500 text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}