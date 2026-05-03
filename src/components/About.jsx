import { motion } from 'framer-motion'
import { aboutData } from '../data'
const stats = aboutData.stats
export default function About() {
  return (
    <section id="about" style={{ padding:'100px 2rem' }}>
      <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{ textAlign:'center',fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,marginBottom:'4rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>About Me</motion.h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'4rem',alignItems:'center' }}>
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            {aboutData.paragraphs.map((paragraph, i) => (
              <p key={i} style={{ color:'rgba(255,255,255,0.75)',lineHeight:1.9,fontSize:'1.05rem',marginBottom:'1.5rem' }}>{paragraph}</p>
            ))}
          </motion.div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem' }}>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.6}}
                whileHover={{scale:1.05,boxShadow:'0 0 30px rgba(0,212,255,0.2)'}}
                style={{ background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'1.5rem',textAlign:'center' }}>
                <div style={{ fontSize:'2rem',marginBottom:'0.5rem' }}>{s.icon}</div>
                <div style={{ fontSize:'2rem',fontWeight:900,background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.number}</div>
                <div style={{ color:'rgba(255,255,255,0.5)',fontSize:'0.85rem',marginTop:'0.25rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}