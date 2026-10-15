export default function ReleaseCard({ item }) {
  const parsed = Date.parse(item.date)
  const validDate = !Number.isNaN(parsed)
  const d = validDate ? new Date(parsed) : null
  return (
    <article className="release-card">
      <div className="release-image-wrap">
        <img loading="lazy" decoding="async" src={item.image} alt={item.title} onError={(e)=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/hero section bg image.jpg'}} />
        <div className="calendar-badge" aria-label={validDate ? `Release date ${item.date}` : 'Release date to be announced'}>
          <span>{d ? d.toLocaleString('en',{month:'short'}).toUpperCase() : 'TBA'}</span>
          <b>{d ? d.getDate() : '—'}</b>
        </div>
      </div>
      <div className="copy"><span className="tag">{item.category}</span><h3>{item.title}</h3><p className="muted">{item.date}</p><p>{item.description}</p></div>
    </article>
  )
}
