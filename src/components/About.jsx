import { motion } from 'framer-motion'
const stats = [
  { number:'7+', label:'Projects', icon:'🚀' },
  { number:'3+', label:'Competitions', icon:'🏆' },
  { number:'2', label:'Active Startups', icon:'💡' },
  { number:'MSc', label:'Cyber Security', icon:'🎓' },
]
export default function About() {
  return (
    <section id="about" style={{ padding:'100px 2rem' }}>
      <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{ textAlign:'center',fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,marginBottom:'4rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>About Me</motion.h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'4rem',alignItems:'center' }}>
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <p style={{ color:'rgba(255,255,255,0.75)',lineHeight:1.9,fontSize:'1.05rem',marginBottom:'1.5rem' }}>I am a <strong style={{color:'#00d4ff'}}>Product Manager</strong>, <strong style={{color:'#8b5cf6'}}>Startup Founder</strong>, and <strong style={{color:'#00ff9d'}}>Cybersecurity Researcher</strong> based in Baku, Azerbaijan.</p>
            <p style={{ color:'rgba(255,255,255,0.75)',lineHeight:1.9,fontSize:'1.05rem',marginBottom:'1.5rem' }}>Currently pursuing my <strong style={{color:'#00d4ff'}}>MSc in Cyber Security</strong> at Baku Engineering University. Dissertation: quantum-based information protection in optical communication systems — QKD protocols, PLOB bound, hybrid QKD-PQC architectures.</p>
            <p style={{ color:'rgba(255,255,255,0.75)',lineHeight:1.9,fontSize:'1.05rem' }}>Founder of <strong style={{color:'#8b5cf6'}}>StarTap</strong>, a student mentorship and startup community. Innovation Manager at <strong style={{color:'#00ff9d'}}>BEU Technopark</strong>. Erasmus+ international exchange participant.</p>
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