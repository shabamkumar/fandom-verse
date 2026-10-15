import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Discover', to: '/search' },
  { label: 'Articles', to: '/articles' },
  { label: 'Trailers', to: '/trailers' },
  { label: 'Events', to: '/events' },
  { label: 'Merch', to: '/merch' },
  { label: 'Bookmarks', to: '/bookmarks' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function MenuOverlay() {
  const { DATA, menuOpen, setMenuOpen } = useApp()
  const navigate = useNavigate()
  const [activeSlug, setActiveSlug] = useState(DATA.categories[0]?.slug)

  const active = DATA.categories.find((c) => c.slug === activeSlug) || DATA.categories[0]

  const go = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
      <div className="menu-bg"></div>
      <div className="menu-shade"></div>
      <div className="menu-content">
        <nav className="links">
          {NAV_LINKS.map((l) => (
            <a key={l.to} onClick={() => go(l.to)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="center-area">
          <div className="menu-kicker">CHOOSE YOUR WORLD</div>
          <div className="locations">
            {DATA.categories.map((c) => (
              <button
                key={c.slug}
                className={`loc${c.slug === activeSlug ? ' active' : ''}`}
                style={{ backgroundImage: `url('${c.image}')` }}
                onMouseEnter={() => setActiveSlug(c.slug)}
                onFocus={() => setActiveSlug(c.slug)}
                onClick={() => go('/category/' + c.slug)}
              >
                <span className="badge">{c.name.slice(0, 2).toUpperCase()}</span>
                <span className="loc-title">
                  <b>{c.name}</b>
                </span>
              </button>
            ))}
          </div>
          <div className="category-copy">
            <b>{active?.name}</b>
            <p>{active?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
