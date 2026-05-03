import { useState, useEffect, useRef } from 'react'
import { timelineData } from '../data'

const ITEMS = timelineData

export default function Timeline() {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="timeline-section section" id="experience" ref={ref}>
      <div className="container">
        <div className={`section__header fade-up${visible ? ' visible' : ''}`}>{/* 05 */}
          <span className="section__label">// 05</span>
          <h2 className="section__title">Experience & Education</h2>
          <div className="section__line" />
        </div>
        <div className="timeline">
          <div ref={lineRef} className={`timeline__line${visible ? ' timeline__line--drawn' : ''}`} />
          {ITEMS.map((item, i) => (
            <div key={i} className={`timeline__item${i % 2 === 0 ? ' timeline__item--left' : ' timeline__item--right'} fade-up${visible ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className={`timeline__dot${item.current ? ' timeline__dot--active' : ''}`} style={{ animationDelay: `${i * 0.12 + 0.3}s` }} />
              <div className="timeline__card">
                <span className="timeline__date">{item.date}</span>
                {item.current && <span className="timeline__badge">Current</span>}
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__org">{item.org}</p>
                <p className="timeline__desc">{item.desc}</p>
                <div className="timeline__card-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}