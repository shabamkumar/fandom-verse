import { useApp } from '../../context/AppContext'

export default function EventCard({ item }) {
  const { isBookmarked, toggleBookmark } = useApp()

  return (
    <article className="event-card">
      <div className="copy">
        <span className="tag">{item.category}</span>
        <h3>{item.title}</h3>
        <p className="muted">
          {item.date} • {item.location}
        </p>
        <p>{item.description}</p>
        <div className="card-actions">
          <button
            className={`ghost bookmark-btn${isBookmarked(item.id) ? ' active' : ''}`}
            onClick={() => toggleBookmark(item.id, 'event')}
          >
            ♡ Bookmark
          </button>
          {item.source && (
            <button className="ghost" onClick={() => window.open(item.source, '_blank')}>
              Official Site ↗
            </button>
          )}
        </div>
      </div>
      <img loading="lazy" decoding="async" src={item.image} alt="" />
    </article>
  )
}
