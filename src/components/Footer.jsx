import { motion } from 'framer-motion'
export default function Footer() {
  return (
    <motion.footer initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6}}
      style={{ padding:'2rem',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.08)' }}>
      <span style={{ background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontWeight:600,fontSize:'0.9rem' }}>Oruj Hummatov © 2026</span>
    </motion.footer>
  )
}