import { useState, useEffect, useRef } from 'react'
import { timelineData } from '../data'

const expItems = timelineData.filter(i => i.type === 'experience')
const eduItems = timelineData.filter(i => i.type === 'education')

function TimelineColumn({ items, color, visible }) {
  return (
    <div style={{ position: 'relative', paddingLeft: '2rem', flex: 1 }}>
      <div style={{ position: 'absolute', left: '7px', top: 0, width: '2px', height: visible ? '100%' : '0%', background: `linear-gradient(to bottom, ${color}, transparent)`, transition: 'height 1.5s ease' }} />
      {items.map((item, i) => (
        <div key={i} style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '2.5rem', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)', transition: `all 0.6s ease ${i * 0.15}s` }}>
          <div style={{ position: 'absolute', left: '-1.65rem', top: '6px', width: item.current ? '14px' : '10px', height: item.current ? '14px' : '10px', borderRadius: '50%', background: item.current ? color : 'rgba(255,255,255,0.2)', border: `2px solid ${item.current ? color + '66' : 'rgba(255,255,255,0.15)'}`, boxShadow: item.current ? `0 0 12px ${color}99` : 'none' }} />
          <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
            {item.current && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{item.date}</span>
              {item.current && <span style={{ padding: '0.1rem 0.5rem', background: color + '1a', border: `1px solid ${color}4d`, borderRadius: '50px', fontSize: '0.65rem', color, fontWeight: 600 }}>Current</span>}
            </div>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.2rem' }}>{item.title}</h3>
            <p style={{ color, fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>{item.org}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} style={{ padding: '100px 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
          <p style={{ color: '#00d4ff', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.75rem', fontWeight: 600 }}>// 05</p>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Experience & Education
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
              <span style={{ fontSize: '1.3rem' }}>💼</span>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#00d4ff', margin: 0 }}>Experience</h3>
            </div>
            <TimelineColumn items={expItems} color="#00d4ff" visible={visible} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
              <span style={{ fontSize: '1.3rem' }}>🎓</span>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#8b5cf6', margin: 0 }}>Education</h3>
            </div>
            <TimelineColumn items={eduItems} color="#8b5cf6" visible={visible} />
          </div>
        </div>
      </div>
    </section>
  )
}