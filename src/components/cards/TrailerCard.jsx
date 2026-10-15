import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function TrailerCard({ item }) {
  const { isBookmarked, toggleBookmark } = useApp()
  const [playing, setPlaying] = useState(false)
  const id = item.youtubeId || item.video.split('/').pop().split('?')[0]

  return (
    <article className="trailer-live">
      <div className="video-wrap">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={item.title}
            frameBorder="0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button className="video-poster" type="button" aria-label={`Play ${item.title}`} onClick={() => setPlaying(true)}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="video-play" aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      <div className="trailer-copy">
        <span className="tag">{item.category}</span>
        <h3>{item.title}</h3>
        <button
          className={`ghost bookmark-btn${isBookmarked(item.id) ? ' active' : ''}`}
          onClick={() => toggleBookmark(item.id, 'video')}
        >
          ♡ Save
        </button>
      </div>
    </article>
  )
}
