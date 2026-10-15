import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import ArticleCard from '../components/cards/ArticleCard'
import EventCard from '../components/cards/EventCard'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function ListPage({ title, sub, items, type }) {
  const { DATA } = useApp()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('newest')

  const results = useMemo(() => {
    let arr = items.filter(
      (x) => (cat === 'all' || x.category === cat) && JSON.stringify(x).toLowerCase().includes(q.toLowerCase())
    )
    arr = [...arr]
    if (sort === 'az') arr.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
    if (sort === 'popular') arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    if (sort === 'newest') arr.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    if (type === 'event' && sort === 'upcoming') {
      const today = new Date().toISOString().slice(0, 10)
      arr = arr.filter((x) => (x.date || '') >= today).sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    }
    if (type === 'event' && sort === 'past') {
      const today = new Date().toISOString().slice(0, 10)
      arr = arr.filter((x) => (x.date || '') < today).sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    }
    return arr
  }, [items, q, cat, sort])

  useReveal([results.length, q, cat, sort])

  return (
    <div className="content-page">
      <Breadcrumb current={title} />
      <div className="page-hero">
        <div className="eyebrow">FANDOMVERSE</div>
        <h1>{title}</h1>
        <p className="muted">{sub}</p>
      </div>
      <div className="toolbar">
        <input
          placeholder={`Search ${title.toLowerCase()}…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {DATA.categories.map((c) => (
            <option value={c.slug} key={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          {type === 'event' && <option value="upcoming">Upcoming</option>}
          {type === 'event' && <option value="past">Past Events</option>}
          <option value="az">A–Z</option>
          <option value="popular">Popularity</option>
        </select>
      </div>
      <div className={type === 'event' ? 'event-grid' : 'cards-grid'}>
        {results.length === 0 && <div className="empty">No results found.</div>}
        {results.map((x) =>
          type === 'event' ? <EventCard key={x.id} item={x} /> : <ArticleCard key={x.id} item={x} />
        )}
      </div>
    </div>
  )
}
