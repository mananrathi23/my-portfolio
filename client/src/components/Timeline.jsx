import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const timelineData = [
  {
    year: 'Jan 2024 – Present',
    title: 'Teaching Assistant — C & DSA',
    org: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan',
    type: 'work',
    icon: '👨‍🏫',
    desc: 'Mentoring 100+ students in C programming and Data Structures and Algorithms. Developed and maintained comprehensive lab manuals and technical learning materials.',
    tags: ['DSA', 'C Programming', 'Mentoring', 'Documentation'],
  },
  {
    year: 'June 2025 – July 2025',
    title: 'Research Intern (LUSIP)',
    org: 'The LNM Institute of Information Technology',
    location: 'Jaipur, Rajasthan',
    type: 'work',
    icon: '🔬',
    desc: 'Engineered an American Sign Language (ASL) detection system using Deep Learning and MediaPipe. Successfully deployed the model on Raspberry Pi 4 for real-time edge inference.',
    tags: ['Deep Learning', 'MediaPipe', 'Python', 'Raspberry Pi'],
  },
  {
    year: 'May 2024 – July 2024',
    title: 'IT Intern',
    org: 'Axestrack',
    location: 'Jaipur, Rajasthan',
    type: 'work',
    icon: '💼',
    desc: 'Enhanced full-stack logistics features using Angular and Java. Trained YOLO-based ML models to improve prediction accuracy for supply chain use cases.',
    tags: ['Java', 'Angular', 'YOLOv8', 'REST APIs'],
  },
  {
    year: '2023 – 2027',
    title: 'B.Tech — Computer Science',
    org: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan',
    type: 'education',
    icon: '🎓',
    desc: "Awarded 100% scholarship. Featured on the Dean's Honors List. Maintaining a 8.9 CGPA while focusing on Full-Stack Dev and AI Research.",
    tags: ['8.9 CGPA', 'Honors List', '100% Scholarship'],
  },
  {
    year: '2020 – 2022',
    title: 'Higher Secondary (XII)',
    org: 'Maheshwari Public School',
    location: 'Jaipur, Rajasthan',
    type: 'education',
    icon: '📚',
    desc: 'Completed CBSE curriculum with 80% in the Science stream (PCM). Started building foundations in programming and web technologies.',
    tags: ['CBSE', 'PCM', '80%'],
  },
]

export default function Timeline() {
  const [ref, inView] = useInView()

  return (
    <section id="timeline" className="section dark:bg-dark-bg2/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">Education &amp; <span className="gradient-text">Experience</span></h2>
          <p className="text-gray-400 max-w-xl mb-16">My path from classroom to codebase.</p>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Center line — hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent -translate-x-1/2" />

            <div className="space-y-12">
              {timelineData.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className={`relative flex items-start gap-8
                      flex-col md:flex-row
                      ${!isLeft ? 'md:flex-row-reverse' : ''}
                    `}
                  >
                    {/* Card */}
                    <div className="flex-1 card border border-white/5 hover:border-accent/20 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${
                          item.type === 'work'
                            ? 'text-accent border-accent/30 bg-accent/5'
                            : 'text-accent2 border-accent2/30 bg-accent2/5'
                        }`}>
                          {item.type === 'work' ? '// experience' : '// education'}
                        </span>
                        <span className="font-mono text-xs text-gray-600">{item.year}</span>
                      </div>

                      <h3 className="font-heading text-lg text-white mb-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <div className="font-mono text-sm text-accent2 mb-1">{item.org}</div>
                      <div className="font-mono text-xs text-gray-600 mb-3 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        {item.location}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(t => (
                          <span key={t} className="tech-badge text-[11px]">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Center dot — only visible on md+ */}
                    <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 flex-col items-center">
                      <div className="w-10 h-10 rounded-full glass border border-accent/30 flex items-center justify-center text-lg z-10 shadow-[0_0_20px_rgba(124,106,247,0.2)]">
                        {item.icon}
                      </div>
                    </div>

                    {/* Spacer for opposite side on desktop */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}