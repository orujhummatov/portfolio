import { useState, useEffect, useRef } from 'react'
import { timelineData } from '../data'

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
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
          <p style={{ color: '#00d4ff', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.75rem', fontWeight: 600 }}>// 05</p>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Experience & Education
          </h2>
        </div>
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div style={{ position: 'absolute', left: '7px', top: 0, width: '2px', height: visible ? '100%' : '0%', background: 'linear-gradient(to bottom, #00d4ff, #8b5cf6)', transition: 'height 1.5s ease' }} />
          {timelineData.map((item, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '2.5rem', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
              <div style={{ position: 'absolute', left: '-1.65rem', top: '6px', width: item.current ? '14px' : '10px', height: item.current ? '14px' : '10px', borderRadius: '50%', background: item.current ? '#00d4ff' : 'rgba(255,255,255,0.2)', border: item.current ? '2px solid rgba(0,212,255,0.4)' : '2px solid rgba(255,255,255,0.15)', boxShadow: item.current ? '0 0 12px rgba(0,212,255,0.6)' : 'none' }} />
              <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                {item.current && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 500 }}>{item.date}</span>
                  {item.current && <span style={{ padding: '0.15rem 0.6rem', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '50px', fontSize: '0.7rem', color: '#00d4ff', fontWeight: 600 }}>Current</span>}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.org}</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}