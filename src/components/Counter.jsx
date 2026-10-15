import { useEffect, useState } from 'react'

// Mirrors the original animateCounters(): counts up from 0 to `target`.
export default function Counter({ target, plus }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let current = 0
      const steps = 55
      const inc = target / steps
      const timer = setInterval(() => {
        current += inc
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setN(Math.floor(current))
      }, 55)
    }, 260)
    return () => clearTimeout(startDelay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return (
    <b className="count">
      {n}
      {plus ? '+' : ''}
    </b>
  )
}
