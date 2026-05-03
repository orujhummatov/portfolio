import { motion } from 'framer-motion'
import { competitionsData } from '../data'
const items = competitionsData
export default function Competitions() {
  return (
    <section id="competitions" style={{ padding:'100px 2rem' }}>
      <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{ textAlign:'center',fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,marginBottom:'4rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Competitions & Applications</motion.h2>
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.6}}
              whileHover={{scale:1.01,boxShadow:'0 0 25px rgba(0,212,255,0.15)'}}
              style={{ background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'1.25rem 1.75rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'0.75rem' }}>
              <div>
                <p style={{ fontWeight:700,color:'#fff',fontSize:'1rem' }}>{item.comp}</p>
                <p style={{ color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',marginTop:'0.2rem' }}>{item.project}</p>
              </div>
              <span style={{ padding:'0.35rem 1rem',background:'rgba(0,0,0,0.3)',border:`1px solid ${item.color}66`,borderRadius:'50px',fontSize:'0.8rem',color:item.color,fontWeight:600,whiteSpace:'nowrap' }}>{item.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}