import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ArticleModalBody } from '../ModalBodies'

export default function ArticleCard({ item }) {
  const { DATA, isBookmarked, toggleBookmark, openModal, closeModal } = useApp()
  const navigate = useNavigate()

  const openArticle = (article = item) => {
    const related = DATA.articles.filter((x) => x.category === article.category && x.id !== article.id)
    openModal(
      <ArticleModalBody item={article} related={related} onOpenRelated={openArticle}
        onExploreCategory={(cat) => { navigate('/category/' + cat); closeModal() }} />
    )
  }

  return (
    <article className="card">
      <img loading="lazy" decoding="async" src={item.image} alt={item.title} onError={(e) => { e.currentTarget.onerror=null; e.currentTarget.src='/images/hero section bg image.jpg' }} />
      <div className="copy">
        <span className="tag">{item.category}</span>
        <h3>{item.title}</h3>
        <p className="muted">{item.description}</p>
        <div className="card-actions">
          <button className="primary" onClick={() => openArticle(item)}>
            Read
          </button>
          <button
            className={`ghost bookmark-btn${isBookmarked(item.id) ? ' active' : ''}`}
            onClick={() => toggleBookmark(item.id, 'article')}
          >
            ♡
          </button>
        </div>
      </div>
    </article>
  )
}
