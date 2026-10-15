import { useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { AuthModalBody } from './ModalBodies'

export default function TopBar() {
  const { DATA, openModal, closeModal, toast, cart } = useApp()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const searchOptions = useMemo(() => {
    const values = [
      ...DATA.categories.map((x) => x.name),
      ...DATA.articles.map((x) => x.title),
      ...DATA.characters.map((x) => x.name),
      ...DATA.trailers.map((x) => x.title),
      ...DATA.events.map((x) => x.title),
      ...DATA.merchandise.map((x) => x.name),
      ...DATA.releases.map((x) => x.title),
    ]
    return [...new Set(values)]
  }, [DATA])

  const runSearch = () => {
    const q = inputRef.current?.value || ''
    navigate('/search?q=' + encodeURIComponent(q))
  }

  const openAuth = (mode) => {
    openModal(
      <AuthModalBody
        mode={mode}
        onSuccess={(msg) => {
          closeModal()
          toast(msg)
        }}
      />
    )
  }

  return (
    <header className="topbar">
      <button className="wordmark" onClick={() => navigate('/')}>
        Fandom<span>Verse</span>
      </button>
      <div className="top-search">
        <input
          ref={inputRef}
          placeholder="Search FandomVerse content…"
          list="siteSearchOptions"
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
        />
        <button onClick={runSearch}>⌕</button>
      </div>
      <button className="icon-btn mobile-search-btn" title="Search" aria-label="Search" onClick={() => navigate('/search')}>⌕</button>
      <button className="icon-btn bookmark-header-btn" title="Bookmarks" aria-label="Bookmarks" onClick={() => navigate('/bookmarks')}>
        ♡
      </button>
      <button className="icon-btn cart-header-btn" title="Cart" aria-label={`Cart with ${cart.length} item${cart.length === 1 ? '' : 's'}`} onClick={() => navigate('/cart')}>
        <span className="cart-symbol">🛒</span>
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </button>
      <button className="ghost" onClick={() => openAuth('login')}>
        Login
      </button>
      <button className="primary small" onClick={() => openAuth('signup')}>
        Sign Up
      </button>
      <datalist id="siteSearchOptions">
        {searchOptions.map((v) => (
          <option value={v} key={v} />
        ))}
      </datalist>
    </header>
  )
}
