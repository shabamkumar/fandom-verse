import { useApp } from '../context/AppContext'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function CartPage() {
  const { DATA, cart, removeFromCart } = useApp()

  const items = cart.map((id) => DATA.merchandise.find((x) => x.id === id)).filter(Boolean)
  const total = items.reduce((s, x) => s + x.price, 0)

  useReveal([items.length])

  return (
    <div className="content-page">
      <Breadcrumb current="Cart" />
      <div className="page-hero">
        <div className="eyebrow">YOUR COLLECTION</div>
        <h1>Your Cart</h1>
        <p className="muted">
          Review the fan picks you’ve added and see your collection total. This showcase does not process checkout
          or payments.
        </p>
      </div>
      {items.length ? (
        <>
          {items.map((x, i) => (
            <div className="cart-row" key={x.id + '-' + i}>
              <img loading="lazy" decoding="async" src={x.image} alt="" />
              <div>
                <b>{x.name}</b>
                <small className="muted" style={{ display: 'block' }}>
                  {x.category}
                </small>
              </div>
              <b>${x.price.toFixed(2)}</b>
              <button className="ghost" onClick={() => removeFromCart(i)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      ) : (
        <div className="empty">Your cart is empty.</div>
      )}
    </div>
  )
}
