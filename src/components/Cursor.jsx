import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    const addListeners = () => {
      document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <motion.div animate={{ x: pos.x - 4, y: pos.y - 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ position:'fixed',top:0,left:0,width:8,height:8,background:'#00d4ff',borderRadius:'50%',pointerEvents:'none',zIndex:99999 }} />
      <motion.div animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovered ? 2 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ position:'fixed',top:0,left:0,width:32,height:32,border:'1.5px solid rgba(0,212,255,0.6)',borderRadius:'50%',pointerEvents:'none',zIndex:99998 }} />
    </>
  )
}
