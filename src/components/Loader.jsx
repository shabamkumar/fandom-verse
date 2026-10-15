import { useEffect, useState } from 'react'

export default function Loader() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="loader" className={hide ? 'hide' : ''}>
      <div className="orbit">
        <span></span>
      </div>
      <strong>FandomVerse</strong>
      <small>Entering the universe…</small>
    </div>
  )
}
