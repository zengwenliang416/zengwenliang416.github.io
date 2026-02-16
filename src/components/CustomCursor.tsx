import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const pos = useRef({ cx: 0, cy: 0, mx: 0, my: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      const p = pos.current
      p.cx += (p.mx - p.cx) * 0.15
      p.cy += (p.my - p.cy) * 0.15
      if (ring.current) {
        ring.current.style.left = p.cx + 'px'
        ring.current.style.top = p.cy + 'px'
      }
      if (dot.current) {
        dot.current.style.left = p.mx + 'px'
        dot.current.style.top = p.my + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const hoverEls = document.querySelectorAll('a, button, .cursor-hover')
    const enter = () => ring.current?.classList.add('!w-16', '!h-16', '!bg-green/5')
    const leave = () => ring.current?.classList.remove('!w-16', '!h-16', '!bg-green/5')
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        className="fixed top-0 left-0 w-5 h-5 border-2 border-green rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-200 mix-blend-difference hidden md:block"
      />
      <div
        ref={dot}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-green rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  )
}
