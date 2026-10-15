import { useApp } from '../context/AppContext'
import { getNote, setNote } from '../utils/storage'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function BookmarksPage() {
  const { DATA, bookmarks, toggleBookmark } = useApp()

  useReveal([bookmarks.length])

  const findItem = (id) =>
    [...DATA.articles, ...DATA.characters, ...DATA.events, ...DATA.trailers, ...DATA.audio, ...DATA.galleries].find((x) => x.id === id)

  const exportBookmarks = () => {
    const all = [...DATA.articles, ...DATA.characters, ...DATA.events, ...DATA.trailers, ...DATA.audio, ...DATA.galleries]
    const text = bookmarks
      .map((z, i) => {
        const x = all.find((a) => a.id === z.id)
        return `${i + 1}. ${x?.title || x?.name || z.id} [${z.type}]\nNote: ${getNote(z.id)}`
      })
      .join('\n\n')
    const blob = new Blob([text || 'No bookmarks'], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'FandomVerse-Bookmarks.txt'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="content-page">
      <Breadcrumb current="Bookmarks" />
      <div className="page-hero">
        <div className="eyebrow">LOCAL STORAGE</div>
        <h1>Bookmarks</h1>
        <p className="muted">Favorites persist in this browser. Notes are stored for this browser session.</p>
        <button className="ghost" onClick={exportBookmarks}>
          Export List
        </button>
      </div>
      {bookmarks.length ? (
        <div className="cards-grid">
          {bookmarks.map((z) => {
            const x = findItem(z.id)
            if (!x) return null
            return (
              <article className="card" key={z.id}>
                <img loading="lazy" decoding="async" src={x.image} alt="" />
                <div className="copy">
                  <span className="tag">{z.type}</span>
                  <h3>{x.title || x.name}</h3>
                  <textarea
                    style={{ width: '100%' }}
                    className="note"
                    defaultValue={getNote(z.id)}
                    placeholder="Session-only personal note…"
                    onInput={(e) => setNote(z.id, e.target.value)}
                  />
                  <button className="ghost" onClick={() => toggleBookmark(z.id, z.type)}>
                    Remove
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="empty">No bookmarks yet. Save articles, characters, media or events using the ♡ buttons.</div>
      )}
    </div>
  )
}
