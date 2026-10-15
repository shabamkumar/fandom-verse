import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import TrailerCard from '../components/cards/TrailerCard'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function TrailersPage() {
  const { DATA } = useApp()
  const [cat, setCat] = useState('all')
  const [status, setStatus] = useState('all')

  const results = useMemo(
    () =>
      DATA.trailers.filter(
        (x) => (cat === 'all' || x.category === cat) && (status === 'all' || x.status === status)
      ),
    [DATA, cat, status]
  )

  useReveal([results.length])

  return (
    <div className="content-page">
      <Breadcrumb current="Trailers" />
      <div className="page-hero">
        <div className="eyebrow">MEDIA</div>
        <h1>Trailers & Videos</h1>
        <p className="muted">Filter previews by category and release status.</p>
      </div>
      <div className="toolbar">
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {DATA.categories.map((c) => (
            <option value={c.slug} key={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option>upcoming</option>
          <option>recent</option>
        </select>
      </div>
      <div className="cards-grid">
        {results.map((x) => (
          <TrailerCard key={x.id} item={x} />
        ))}
      </div>
    </div>
  )
}
