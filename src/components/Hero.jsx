import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
const roles = ['Product Manager','Startup Founder','Cybersecurity Researcher','Community Builder']
const nameLetters = 'Oruj Hummatov'.split('')
export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  useEffect(() => {
    let t
    const current = roles[roleIdx]
    if (typing) {
      if (displayed.length < current.length) t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      else t = setTimeout(() => setTyping(false), 1800)
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      else { setRoleIdx((roleIdx + 1) % roles.length); setTyping(true) }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, roleIdx])
  return (
    <section id="hero" style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 2rem',position:'relative',overflow:'hidden' }}>
      <motion.div animate={{ x:[0,30,0],y:[0,-20,0] }} transition={{ duration:8,repeat:Infinity,ease:'easeInOut' }}
        style={{ position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(0,212,255,0.15),transparent 70%)',borderRadius:'50%',filter:'blur(40px)',pointerEvents:'none' }} />
      <motion.div animate={{ x:[0,-30,0],y:[0,20,0] }} transition={{ duration:10,repeat:Infinity,ease:'easeInOut' }}
        style={{ position:'absolute',bottom:'10%',right:'5%',width:'350px',height:'350px',background:'radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%)',borderRadius:'50%',filter:'blur(40px)',pointerEvents:'none' }} />
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}
        style={{ color:'rgba(255,255,255,0.5)',fontSize:'1rem',marginBottom:'1rem',letterSpacing:'0.2em' }}>HI, I AM</motion.p>
      <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',marginBottom:'1rem' }}>
        {nameLetters.map((l, i) => (
          <motion.span key={i}
            initial={{ opacity:0,y:60 }} animate={{ opacity:1,y:0 }}
            transition={{ delay:0.3+i*0.05,duration:0.6,type:'spring',stiffness:200 }}
            style={{ fontSize:'clamp(2.5rem,7vw,5rem)',fontWeight:900,background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',display:'inline-block',minWidth:l===' '?'1.5rem':'auto' }}>
            {l}
          </motion.span>
        ))}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:0.8}}
        style={{ height:'2.5rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem' }}>
        <span style={{ fontSize:'clamp(1rem,2.5vw,1.4rem)',color:'#00d4ff',fontWeight:600 }}>{displayed}</span>
        <motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.8,repeat:Infinity}}
          style={{ display:'inline-block',width:2,height:'1.4em',background:'#00d4ff',verticalAlign:'middle' }} />
      </motion.div>
      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2,duration:0.6}}
        style={{ color:'rgba(255,255,255,0.5)',marginBottom:'2.5rem',fontSize:'0.95rem' }}>📍 Baku, Azerbaijan</motion.p>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.4,duration:0.6}}
        style={{ display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center' }}>
        <motion.a href="#projects" whileHover={{scale:1.05,boxShadow:'0 0 30px rgba(0,212,255,0.4)'}} whileTap={{scale:0.97}}
          style={{ padding:'0.85rem 2rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',borderRadius:'50px',color:'#fff',fontWeight:700,textDecoration:'none',fontSize:'0.95rem' }}>View Projects</motion.a>
        <motion.a href="#contact" whileHover={{scale:1.05,boxShadow:'0 0 30px rgba(139,92,246,0.4)'}} whileTap={{scale:0.97}}
          style={{ padding:'0.85rem 2rem',background:'transparent',border:'1.5px solid rgba(139,92,246,0.6)',borderRadius:'50px',color:'#fff',fontWeight:700,textDecoration:'none',fontSize:'0.95rem' }}>Contact Me</motion.a>
      </motion.div>
      <motion.div animate={{y:[0,10,0]}} transition={{duration:1.8,repeat:Infinity,ease:'easeInOut'}}
        style={{ position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',color:'rgba(255,255,255,0.3)',fontSize:'1.5rem' }}>↓</motion.div>
    </section>
  )
}