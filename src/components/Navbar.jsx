import { motion } from 'framer-motion'
const links = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]
export default function Navbar({ scrolled, activeSection }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.a href="#hero" whileHover={{ scale: 1.05 }}
        style={{ fontWeight:900,fontSize:'1.4rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textDecoration:'none' }}>
        OH
      </motion.a>
      <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap' }}>
        {links.map((l, i) => (
          <motion.a key={l.href} href={l.href}
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ y: -2 }}
            style={{
              color: activeSection === l.id ? '#00d4ff' : 'rgba(255,255,255,0.7)',
              textDecoration:'none',fontSize:'0.9rem',fontWeight:500,position:'relative',transition:'color 0.2s'
            }}>
            {l.label}
            {activeSection === l.id && (
              <motion.div layoutId="navIndicator"
                style={{ position:'absolute',bottom:-4,left:0,right:0,height:2,background:'linear-gradient(90deg,#00d4ff,#8b5cf6)',borderRadius:2 }} />
            )}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}