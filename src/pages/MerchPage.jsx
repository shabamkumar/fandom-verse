import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/cards/ProductCard'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function MerchPage() {
  const { DATA, cart } = useApp()
  const navigate = useNavigate()

  useReveal([])

  return (
    <div className="content-page">
      <Breadcrumb current="Merchandise" />
      <div className="page-hero">
        <div className="eyebrow">SHOWCASE</div>
        <h1>Merchandise</h1>
        <p className="muted">
          Explore collectibles, apparel and fan favorites across Anime, Movies, TV Shows, Comics and Manga.
        </p>
        <button className="ghost" onClick={() => navigate('/cart')}>
          View Cart ({cart.length})
        </button>
      </div>
      <div className="product-grid">
        {DATA.merchandise.map((x) => (
          <ProductCard key={x.id} item={x} />
        ))}
      </div>
    </div>
  )
}
