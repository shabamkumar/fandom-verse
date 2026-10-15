export function ArticleModalBody({ item, onExploreCategory, related = [], onOpenRelated }) {
  let sourceHost = null
  if (item.source) {
    try {
      sourceHost = new URL(item.source).hostname.replace('www.', '')
    } catch {
      sourceHost = null
    }
  }

  const paragraphs = Array.isArray(item.body) && item.body.length
    ? item.body
    : [item.description].filter(Boolean)
  const imageSrc = item.image || '/images/hero section bg image.jpg'

  return (
    <article className="fv-article-reader">
      <div className="fv-article-hero">
        <img
          src={imageSrc}
          alt={item.title}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/hero section bg image.jpg'
          }}
        />
      </div>

      <div className="fv-article-reader-inner">
        <span className="fv-article-category">{item.category}</span>
        <h2 className="fv-article-title">{item.title}</h2>
        <div className="fv-article-copy">
          {paragraphs.map((para, i) => <p key={`${item.id}-paragraph-${i}`}>{para}</p>)}
        </div>
        {sourceHost && <p className="fv-article-source">Source: {sourceHost}</p>}

        {related.length > 0 && (
          <div className="fv-related-content">
            <h3>Related stories</h3>
            <div className="fv-related-grid">
              {related.slice(0, 3).map((r) => (
                <button key={r.id} type="button" onClick={() => onOpenRelated?.(r)}>
                  <img
                    src={r.image || '/images/hero section bg image.jpg'}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/images/hero section bg image.jpg'
                    }}
                  />
                  <span>{r.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button className="primary fv-explore-article" type="button" onClick={() => onExploreCategory?.(item.category)}>
          Explore related {item.category} content
        </button>
      </div>
    </article>
  )
}

export function VideoModalBody({ item }) {
  return (
    <>
      <h2>{item.title}</h2>
      <div style={{ aspectRatio: '16/9' }}>
        <iframe
          width="100%"
          height="100%"
          src={item.video}
          title="Video preview"
          allowFullScreen
          style={{ border: 0, borderRadius: 14 }}
        />
      </div>
      <p className="muted">Use the player controls for playback and sound.</p>
    </>
  )
}

export function ImageModalBody({ src, title }) {
  return (
    <>
      <img src={src} alt={title} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain' }} />
      <h3>{title}</h3>
    </>
  )
}

export function AuthModalBody({ mode, onSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    localStorage.setItem('fvLocalUser', email)
    onSuccess(mode === 'login' ? 'Welcome back' : 'Profile ready')
  }
  return (
    <div className="auth">
      <div className="eyebrow">FANDOMVERSE ACCESS</div>
      <h2>{mode === 'login' ? 'Welcome back' : 'Join FandomVerse'}</h2>
      <p className="muted">Sign in to personalize your local FandomVerse experience on this browser.</p>
      <form className="form" onSubmit={handleSubmit}>
        {mode === 'signup' && <input placeholder="Display name" required />}
        <input name="email" type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="primary">{mode === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
    </div>
  )
}
