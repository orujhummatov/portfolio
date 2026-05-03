import { useState, useEffect, useRef } from 'react'

const ROLES = ['Innovation PM', 'Startup Founder', 'Cyber Security MSc', 'Builder from Baku 🇦🇿']

const PROJECTS = [
  {
    name: 'gAIde',
    desc: 'AI-powered city discovery mobile app. 1km landmark detection, dark theme with mint/blue palette, freemium model.',
    tags: ['AI', 'Mobile', 'Travel'],
    color: 'mint'
  },
  {
    name: 'StarTap',
    desc: 'Student startup mentorship program at BEU. 14 mentor tracks, weekly English-only sessions, monthly expert events.',
    tags: ['EdTech', 'Community', 'BEU'],
    color: 'blue'
  },
  {
    name: 'NUSH',
    desc: "Azerbaijan's first certified home-cook marketplace. Co-founded with Nihad Maharramov & Mahammad Rza Cahangirov. Applied to IsDB Innovation Pitch 2026 & KOBİA grant.",
    tags: ['FoodTech', 'Marketplace'],
    color: 'orange'
  },
  {
    name: 'EkoEthanol',
    desc: 'Zero-waste bio-refinery converting bread waste & sheep wool into ethanol, biogenic CO₂, and agro-composite fertilizer. TEKNOFEST 2026 Biotechnology finalist.',
    tags: ['GreenTech', 'Biotech', 'TEKNOFEST'],
    color: 'green'
  },
  {
    name: 'BEU Technopark Platform',
    desc: 'Commercial services platform (ddp.beu.edu.az) with 4 pillars: Lab Service, Specialist Service, Corporate Academy, Resident Office (Bronze/Silver/Gold tiers).',
    tags: ['B2B', 'SaaS', 'Platform'],
    color: 'purple'
  },
  {
    name: 'Schedify',
    desc: 'AI-powered university timetable scheduling SaaS for Azerbaijan & Central Asia.',
    tags: ['AI', 'EdTech', 'SaaS'],
    color: 'pink'
  }
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
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true) }, { threshold })
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

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

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

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>...
      // Rest of JSX...
    </>
  )
}