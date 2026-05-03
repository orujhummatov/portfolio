import { useState, useEffect, useRef } from 'react'

const ROLES = ['Innovation PM', 'Startup Founder', 'Cyber Security MSc', 'Builder from Baku 🇦🇿']

const PROJECTS = [
  { name: 'gAIde', desc: 'AI-powered city discovery mobile app. 1km landmark detection, dark theme with mint/blue palette, freemium model.', tags: ['AI', 'Mobile', 'Travel'], color: 'mint' },
  { name: 'StarTap', desc: 'Student startup mentorship program at BEU. 14 mentor tracks, weekly English-only sessions, monthly expert events.', tags: ['EdTech', 'Community', 'BEU'], color: 'blue' },
  { name: 'NUSH', desc: "Azerbaijan's first certified home-cook marketplace. Co-founded with Nihad Maharramov & Mahammad Rza Cahangirov. Applied to IsDB Innovation Pitch 2026 & KOBİA grant.", tags: ['FoodTech', 'Marketplace'], color: 'orange' },
  { name: 'EkoEthanol', desc: 'Zero-waste bio-refinery converting bread waste & sheep wool into ethanol, biogenic CO₂, and agro-composite fertilizer. TEKNOFEST 2026 Biotechnology finalist.', tags: ['GreenTech', 'Biotech', 'TEKNOFEST'], color: 'green' },
  { name: 'BEU Technopark Platform', desc: 'Commercial services platform (ddp.beu.edu.az) with 4 pillars: Lab Service, Specialist Service, Corporate Academy, Resident Office (Bronze/Silver/Gold tiers).', tags: ['B2B', 'SaaS', 'Platform'], color: 'purple' },
  { name: 'Schedify', desc: 'AI-powered university timetable scheduling SaaS for Azerbaijan & Central Asia.', tags: ['AI', 'EdTech', 'SaaS'], color: 'pink' }
]

const TIMELINE = [
  { date: '2024 — Present', title: 'Innovation & Startup PM', org: 'BEU Technopark' },
  { date: '2024 — Present', title: 'Founder & Lead', org: 'StarTap Program' },
  { date: '2023 — Present', title: 'MSc Cyber Security', org: 'Baku Engineering University' },
  { date: '2019 — 2023', title: 'B.Sc. Information Technologies', org: 'BEU (Erasmus+ Exchange)' },
  { date: '2022 — 2023', title: 'Engineer', org: 'Global Protech' }
]

const STATS = [
  { target: 6, suffix: '+', label: 'Active Projects' },
  { target: 14, suffix: '', label: 'Mentor Tracks (StarTap)' },
  { target: 3, suffix: '', label: 'International Competitions' },
  { target: 2, suffix: '', label: 'Accelerator Programs' }
]

const SKILLS = ['Product Management', 'Startup Strategy', 'UX Research', 'React', 'Python', 'Cybersecurity', 'AI/ML', 'Grant Writing']

function useIntersection(ref, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return isVisible
}

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const visible = useIntersection(ref)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = Math.ceil(target / 40)
    const interval = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(interval) }
      else setCount(start)
    }, 40)
    return () => clearInterval(interval)
  }, [visible, target])
  return <div ref={ref} className="stat-number">{count}{suffix}</div>
}

function FadeSection({ children, className = '' }) {
  const ref = useRef(null)
  const visible = useIntersection(ref, 0.1)
  return (
    <div ref={ref} className={`fade-in${visible ? ' visible' : ''} ${className}`}>  
      {children}
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const role = ROLES[roleIndex]
    let i = typing ? displayed.length : displayed.length - 1
    const timeout = setTimeout(() => {
      if (typing) {
        setDisplayed(role.slice(0, i + 1))
        if (i + 1 === role.length) setTimeout(() => setTyping(false), 1500)
      } else {
        setDisplayed(role.slice(0, i))
        if (i === 0) { setTyping(true); setRoleIndex((roleIndex + 1) % ROLES.length) }
      }
    }, typing ? 80 : 40)
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>  
      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>  
        <a className="nav-logo" href="#hero">OH.</a>
        <ul className="nav-links">  
          <li><a href="#about" onClick={e => { e.preventDefault(); scrollTo('about') }}>About</a></li>
          <li><a href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects') }}>Projects</a></li>
          <li><a href="#experience" onClick={e => { e.preventDefault(); scrollTo('experience') }}>Experience</a></li>
          <li><a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="dot-grid" />
        <div className="hero-content">  
          <p className="hero-label">// PORTFOLIO</p>
          <h1>ORUJ <span>HUMMATOV</span></h1>
          <div className="hero-typewriter">
            &gt; {displayed}<span className="cursor">_</span>
          </div>
          <p className="hero-subtitle">Building startups. Shaping ecosystems. One product at a time.</p>
          <div className="hero-ctas">  
            <a className="btn-primary" href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects') }}>View Projects</a>
            <a className="btn-outline" href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Contact Me</a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about">  
        <FadeSection>
          <p className="section-label">// 02</p>
          <h2 className="section-title">About Me</h2>
        </FadeSection>
        <div className="about-grid">  
          <FadeSection>  
            <p className="about-bio">
              I'm an Innovation &amp; Startup PM at BEU Technopark and founder of StarTap — a university-level startup mentorship program. I build tech products across edtech, foodtech, biotech, and AI travel. Currently pursuing an MSc in Cyber Security at BEU.
            </p>
            <div className="skills-tags">
              {SKILLS.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </FadeSection>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card">  
                <AnimatedCounter target={s.target} suffix={s.suffix} />
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects">  
        <FadeSection>
          <p className="section-label">// 03</p>
          <h2 className="section-title">Projects</h2>
        </FadeSection>
        <div className="projects-grid">  
          {PROJECTS.map((p, i) => (
            <FadeSection key={i}>  
              <div className={`project-card ${p.color}`}>  
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">  
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE & EDUCATION */}
      <section id="experience">  
        <FadeSection>
          <p className="section-label">// 04</p>
          <h2 className="section-title">Experience &amp; Education</h2>
        </FadeSection>
        <div className="timeline">  
          <div className="timeline-track">  
            <div className="timeline-line" />
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item">  
                <div className="timeline-dot" />
                <p className="timeline-date">{item.date}</p>
                <p className="timeline-title">{item.title}</p>
                <p className="timeline-org">{item.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact">  
        <div className="contact-inner">  
          <FadeSection>  
            <p className="section-label">// 05</p>
            <h2 className="section-title">Contact</h2>
            <p className="contact-tagline">Open to collaborations, partnerships, and new ideas.</p>
            <div className="contact-links">  
              <a className="contact-link" href="mailto:ohummatov@beu.edu.az">
                📧 ohummatov@beu.edu.az
              </a>
              <a className="contact-link" href="https://linkedin.com/in/oruj-hummatov" target="_blank" rel="noreferrer">
                💼 linkedin.com/in/oruj-hummatov
              </a>
              <span className="contact-link">📍 Baku, Azerbaijan 🇦🇿</span>
            </div>
          </FadeSection>
          <FadeSection>  
            <form className="contact-form" onSubmit={handleSubmit}>  
              <input  
                className="form-input"  
                type="text"  
                placeholder="Your Name"  
                value={formData.name}  
                onChange={e => setFormData({ ...formData, name: e.target.value })}  
                required  
              />  
              <input  
                className="form-input"  
                type="email"  
                placeholder="Your Email"  
                value={formData.email}  
                onChange={e => setFormData({ ...formData, email: e.target.value })}  
                required  
              />  
              <textarea  
                className="form-textarea"  
                placeholder="Your Message"  
                value={formData.message}  
                onChange={e => setFormData({ ...formData, message: e.target.value })}  
                required  
              />  
              <button className="form-btn" type="submit">SEND MESSAGE</button>
            </form>
          </FadeSection>
        </div>
      </section>

      <footer className="footer">  
        <p>© 2026 Oruj Hummatov. Built with React + Vite.</p>
      </footer>
    </>
  )
}