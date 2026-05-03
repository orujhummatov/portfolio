import { motion } from 'framer-motion'
const letters = 'ORUJ HUMMATOV'.split('')
export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ position:'fixed',inset:0,zIndex:9999,background:'#0a0a0f',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem' }}
    >
      <div style={{ display:'flex', gap:'2px' }}>
        {letters.map((l, i) => (
          <motion.span key={i}
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.07, duration: 0.5 }}
            style={{ fontSize:'clamp(2rem,6vw,4rem)',fontWeight:900,background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',display:'inline-block',minWidth:l===' '?'1rem':'auto' }}
          >{l}</motion.span>
        ))}
      </div>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:0.6}}
        style={{color:'rgba(255,255,255,0.4)',fontSize:'0.9rem',letterSpacing:'0.3em'}}>PORTFOLIO</motion.p>
      <motion.div initial={{width:0}} animate={{width:'200px'}} transition={{delay:0.5,duration:1.8}}
        style={{height:'2px',background:'linear-gradient(90deg,#00d4ff,#8b5cf6)',borderRadius:'2px',marginTop:'1rem'}} />
    </motion.div>
  )
}