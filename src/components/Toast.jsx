import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toastMsg } = useApp()
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!toastMsg) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [toastMsg])

  if (!toastMsg || !visible) return null
  const isCartToast = toastMsg.text === 'Added to cart'

  return (
    <button
      type="button"
      className={`site-toast${isCartToast ? ' cart-toast' : ''}`}
      onClick={() => {
        if (isCartToast) {
          setVisible(false)
          navigate('/cart')
        }
      }}
      aria-label={isCartToast ? 'Added to cart. Open cart.' : toastMsg.text}
    >
      <span>{toastMsg.text}</span>
      {isCartToast && <strong>View Cart →</strong>}
    </button>
  )
}
