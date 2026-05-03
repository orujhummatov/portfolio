import { motion } from 'framer-motion'
import { projectsData } from '../data'
const projects = projectsData
export default function Projects() {
  return (
    <section id="projects" style={{ padding:'100px 2rem' }}>
      <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{ textAlign:'center',fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,marginBottom:'4rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Projects</motion.h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.6}}
              whileHover={{ scale:1.03, boxShadow:'0 0 40px rgba(0,212,255,0.25)', borderColor:'rgba(0,212,255,0.4)' }}
              style={{ background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'2rem',cursor:'default',transition:'border-color 0.3s' }}>
              <div style={{ fontSize:'2.5rem',marginBottom:'1rem' }}>{p.icon}</div>
              <h3 style={{ fontWeight:800,fontSize:'1.2rem',marginBottom:'0.75rem',color:'#fff' }}>{p.title}</h3>
              <p style={{ color:'rgba(255,255,255,0.6)',fontSize:'0.9rem',lineHeight:1.7,marginBottom:'1.25rem' }}>{p.desc}</p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:'0.5rem' }}>
                {p.tags.map((t, j) => (
                  <span key={j} style={{ padding:'0.25rem 0.75rem',background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.25)',borderRadius:'50px',fontSize:'0.75rem',color:'#00d4ff',fontWeight:600 }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}