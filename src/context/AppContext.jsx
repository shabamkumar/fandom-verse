import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import DATA from '../content.json'
import { get, set } from '../utils/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => get('fvBookmarks'))
  const [cart, setCart] = useState(() => get('fvCart'))
  const [visits, setVisits] = useState(0)
  const [modal, setModal] = useState(null) // React node or null
  const [toastMsg, setToastMsg] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const openModal = (content) => setModal(content)
  const closeModal = () => setModal(null)

  const toast = (text) => {
    setToastMsg({ text, key: Date.now() })
  }

  // Record a visit once per mount, same as the original visit() call in boot().
  useEffect(() => {
    const n = +(localStorage.getItem('fvVisits') || 0) + 1
    localStorage.setItem('fvVisits', n)
    setVisits(n)
  }, [])

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id)

  const toggleBookmark = (id, type) => {
    setBookmarks((prev) => {
      const i = prev.findIndex((b) => b.id === id)
      const next = i >= 0 ? prev.filter((_, idx) => idx !== i) : [...prev, { id, type, note: '' }]
      set('fvBookmarks', next)
      return next
    })
  }

  const addToCart = (id) => {
    setCart((prev) => {
      const next = [...prev, id]
      set('fvCart', next)
      return next
    })
  }

  const removeFromCart = (index) => {
    setCart((prev) => {
      const next = prev.filter((_, i) => i !== index)
      set('fvCart', next)
      return next
    })
  }

  const value = useMemo(
    () => ({
      DATA,
      bookmarks,
      isBookmarked,
      toggleBookmark,
      cart,
      addToCart,
      removeFromCart,
      visits,
      modal,
      openModal,
      closeModal,
      toastMsg,
      toast,
      menuOpen,
      setMenuOpen,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookmarks, cart, visits, modal, toastMsg, menuOpen]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
