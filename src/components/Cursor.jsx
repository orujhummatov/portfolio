import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = e => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', move)

    const addListeners = () => {
      document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return (
    <> 
      <motion.div
        animate={{ x: pos.x - 5, y: pos.y - 5, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10,
          background: '#00d4ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
        }}
      />
      <motion.div
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: hovered ? 1.8 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          border: '1.5px solid rgba(0,212,255,0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          background: 'rgba(0,212,255,0.04)',
        }}
      />
    </>
  )
}