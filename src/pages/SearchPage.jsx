import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function SearchPage() {
  const { DATA } = useApp()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState('all')
  const [type, setType] = useState('all')

  const results = useMemo(() => {
    const pools = [
      ['article', DATA.articles],
      ['character', DATA.characters],
      ['event', DATA.events],
      ['merch', DATA.merchandise],
      ['release', DATA.releases],
      ['video', DATA.trailers],
      ['gallery', DATA.galleries],
      ['audio', DATA.audio],
    ]
    const res = []
    pools.forEach(([t, arr]) => {
      if (type !== 'all' && type !== t) return
      arr.forEach((x) => {
        if ((cat === 'all' || x.category === cat) && JSON.stringify(x).toLowerCase().includes(q.toLowerCase())) {
          res.push([t, x])
        }
      })
    })
    return res
  }, [DATA, q, cat, type])

  useReveal([results.length])
  const fallbackImage = (x) => DATA.categories.find(c => c.slug === x.category)?.image || '/images/hero section bg image.jpg'

  return (
    <div className="content-page">
      <Breadcrumb current="Search" />
      <div className="page-hero">
        <div className="eyebrow">GLOBAL SEARCH</div>
        <h1>Discover the Verse</h1>
        <p className="muted">
          Search across articles, characters, videos, audio, galleries, events, merchandise and releases.
        </p>
      </div>
      <div className="toolbar">
        <input placeholder="Search everything…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {DATA.categories.map((c) => (
            <option value={c.slug} key={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All content</option>
          <option value="article">Articles</option>
          <option value="character">Characters</option>
          <option value="event">Events</option>
          <option value="merch">Merchandise</option>
          <option value="release">Releases</option>
          <option value="video">Videos</option>
          <option value="gallery">Galleries</option>
          <option value="audio">Audio & Podcasts</option>
        </select>
      </div>
      <div className="cards-grid">
        {results.length === 0 && <div className="empty">Start typing to discover content.</div>}
        {results.map(([t, x]) => (
          <article className="card" key={t + '-' + x.id}>
            <img loading="lazy" decoding="async" src={x.image || fallbackImage(x)} alt={x.title || x.name || `${x.category} content`} onError={(e) => { e.currentTarget.onerror=null; e.currentTarget.src=fallbackImage(x) }} />
            <div className="copy">
              <span className="tag">{t}</span>
              <h3>{x.title || x.name}</h3>
              <p className="muted">{x.description || x.bio || x.series || ''}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
