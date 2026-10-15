import { useApp } from '../../context/AppContext'

export default function ProfileCard({ item }) {
  const { isBookmarked, toggleBookmark } = useApp()

  return (
    <article className="profile-card">
      <img loading="lazy" decoding="async" src={item.image} alt={item.name} />
      <div className="copy">
        <span className="tag">{item.category}</span>
        <h3>{item.name}</h3>
        <small className="muted">{item.series}</small>
        <p>{item.bio}</p>
        {item.traits?.length > 0 && (
          <div className="trait-list">
            {item.traits.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
        <button
          className={`ghost bookmark-btn${isBookmarked(item.id) ? ' active' : ''}`}
          onClick={() => toggleBookmark(item.id, 'character')}
        >
          ♡
        </button>
      </div>
    </article>
  )
}
