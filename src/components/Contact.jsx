import { motion } from 'framer-motion'
import { useState } from 'react'
import { contactData } from '../data'
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(contactData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="contact" style={{ padding:'100px 2rem',textAlign:'center',position:'relative',overflow:'hidden' }}>
      <motion.div animate={{scale:[1,1.1,1],opacity:[0.15,0.25,0.15]}} transition={{duration:6,repeat:Infinity}}
        style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)',borderRadius:'50%',filter:'blur(40px)',pointerEvents:'none' }} />
      <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
        style={{ fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,marginBottom:'1rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>Let us Connect</motion.h2>
      <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2,duration:0.6}}
        style={{ color:'rgba(255,255,255,0.5)',marginBottom:'3rem',fontSize:'1.05rem' }}>{contactData.tagline}</motion.p>
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3,duration:0.6}}
        style={{ display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap' }}>
        <motion.button onClick={copy} whileHover={{scale:1.05,boxShadow:'0 0 30px rgba(0,212,255,0.4)'}} whileTap={{scale:0.97}}
          style={{ padding:'1rem 2rem',background:'rgba(0,212,255,0.1)',border:'1.5px solid rgba(0,212,255,0.4)',borderRadius:'50px',color:'#00d4ff',fontWeight:700,fontSize:'0.95rem',cursor:'pointer' }}>
          {copied ? 'Copied!' : contactData.email}
        </motion.button>
        <motion.a href={contactData.linkedin} target="_blank" rel="noreferrer"
          whileHover={{scale:1.05,boxShadow:'0 0 30px rgba(139,92,246,0.4)'}} whileTap={{scale:0.97}}
          style={{ padding:'1rem 2rem',background:'rgba(139,92,246,0.1)',border:'1.5px solid rgba(139,92,246,0.4)',borderRadius:'50px',color:'#8b5cf6',fontWeight:700,fontSize:'0.95rem',textDecoration:'none',display:'inline-flex',alignItems:'center' }}>LinkedIn</motion.a>
      </motion.div>
    </section>
  )
}