import { useApp } from '../../context/AppContext'

export default function ProductCard({ item }) {
  const { addToCart, toast, DATA } = useApp()

  const fallbackImage = () => {
    const c = DATA.categories.find((x) => x.slug === item.category)
    return c ? c.image : 'images/anime.jpg'
  }

  return (
    <article className="product-card">
      <img
        src={item.image}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = fallbackImage()
        }}
      />
      <div className="copy">
        <span className="tag">{item.category}</span>
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>
        <div className="price">${item.price.toFixed(2)}</div>
        <div className="card-actions">
          <button
            className="primary"
            onClick={() => {
              addToCart(item.id)
              toast('Added to cart')
            }}
          >
            ＋ Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
