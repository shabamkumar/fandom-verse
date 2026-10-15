import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function SideNav() {
  const navigate = useNavigate()
  const { menuOpen, setMenuOpen } = useApp()

  return (
    <aside className="side-nav">
      <button className="brand" aria-label="FandomVerse home" onClick={() => navigate('/')}>
        <span>FV</span>
      </button>
      <button
        className={`menu-toggle${menuOpen ? ' open' : ''}`}
        aria-label="Open menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="rail-copy">ONE UNIVERSE • ALL FANDOMS</div>
    </aside>
  )
}
