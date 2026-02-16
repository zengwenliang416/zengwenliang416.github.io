import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  suffix?: string
  className?: string
}

export default function CountUp({ target, suffix = '', className = '' }: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const step = Math.ceil(target / 40)
          let cur = 0
          const timer = setInterval(() => {
            cur += step
            if (cur >= target) {
              cur = target
              clearInterval(timer)
            }
            setValue(cur)
          }, 30)
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  )
}
