import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <span style={{
        background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        fontWeight: 600, fontSize: '0.9rem'
      }}>
        Oruj Hummatov © 2026
      </span>
    </motion.footer>
  )
}