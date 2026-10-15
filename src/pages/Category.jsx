import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SectionHead from '../components/SectionHead'
import ArticleCard from '../components/cards/ArticleCard'
import ProfileCard from '../components/cards/ProfileCard'
import EventCard from '../components/cards/EventCard'
import ProductCard from '../components/cards/ProductCard'
import ReleaseCard from '../components/cards/ReleaseCard'
import TrailerCard from '../components/cards/TrailerCard'
import useReveal from '../hooks/useReveal'

const TABS = [
  { id: 'catArticles', label: 'Articles' },
  { id: 'catCharacters', label: 'Characters' },
  { id: 'catGallery', label: 'Gallery' },
  { id: 'catMedia', label: 'Videos' },
  { id: 'catAudio', label: 'Audio' },
  { id: 'catEvents', label: 'Events' },
  { id: 'catMerch', label: 'Merch' },
  { id: 'catReleases', label: 'Releases' },
]

export default function Category() {
  const { slug } = useParams()
  const { DATA } = useApp()
  const navigate = useNavigate()
  const [contentFilter, setContentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [tagFilter, setTagFilter] = useState('all')
  const [seriesFilter, setSeriesFilter] = useState('all')
  const [videoType, setVideoType] = useState('all')
  const [audioType, setAudioType] = useState('all')

  const c = DATA.categories.find((x) => x.slug === slug) || DATA.categories[0]
  const f = (key) => {
    const items = DATA[key].filter((x) => x.category === c.slug)
    return [...items].sort((a,b) => {
      const an=(a.title||a.name||'').toLowerCase(), bn=(b.title||b.name||'').toLowerCase()
      if(sortBy==='az') return an.localeCompare(bn)
      if(sortBy==='za') return bn.localeCompare(an)
      if(sortBy==='newest') return String(b.date||b.releaseDate||b.id).localeCompare(String(a.date||a.releaseDate||a.id))
      return 0
    })
  }
  const visible = (type) => contentFilter === 'all' || contentFilter === type

  const tagOptions = useMemo(() => [...new Set(DATA.articles.filter(x => x.category === c.slug).flatMap(x => x.tags || []))].sort(), [DATA.articles, c.slug])
  const seriesOptions = useMemo(() => [...new Set(DATA.characters.filter(x => x.category === c.slug).map(x => x.series).filter(Boolean))].sort(), [DATA.characters, c.slug])
  const videoTypes = useMemo(() => [...new Set(DATA.trailers.filter(x => x.category === c.slug).map(x => x.mediaType || 'Trailer'))].sort(), [DATA.trailers, c.slug])
  const audioTypes = useMemo(() => [...new Set(DATA.audio.filter(x => x.category === c.slug).map(x => x.mediaType || 'Podcast'))].sort(), [DATA.audio, c.slug])
  const articleItems = f('articles').filter(x => tagFilter === 'all' || (x.tags || []).some(t => t.toLowerCase() === tagFilter.toLowerCase()))
  const characterItems = f('characters').filter(x => seriesFilter === 'all' || x.series === seriesFilter)
  const videoItems = f('trailers').filter(x => videoType === 'all' || (x.mediaType || 'Trailer') === videoType)
  const audioItems = f('audio').filter(x => audioType === 'all' || (x.mediaType || 'Podcast') === audioType)

  useEffect(() => {
    setContentFilter('all'); setSortBy('featured'); setTagFilter('all'); setSeriesFilter('all'); setVideoType('all'); setAudioType('all')
  }, [slug])

  useReveal([slug])

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <section className="category-hero" style={{ backgroundImage: `url('${c.image}')` }}>
        <div>
          <div className="breadcrumb">
            <button onClick={() => navigate('/')}>Home</button>
            <span>›</span>
            <span>{c.name}</span>
          </div>
          <div className="eyebrow">CATEGORY HUB / {c.name.toUpperCase()}</div>
          <h1>{c.name}</h1>
          <p>
            {c.description} Explore articles, characters, galleries, videos, podcasts, events, merchandise and upcoming
            releases from this fandom.
          </p>
        </div>
      </section>

      <div className="content-page">
        <div className="tabs">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => jump(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="category-controls" aria-label="Category content controls">
          <label>Filter content<select value={contentFilter} onChange={(e)=>setContentFilter(e.target.value)}><option value="all">All content</option><option value="articles">Articles</option><option value="characters">Characters</option><option value="gallery">Gallery</option><option value="videos">Videos</option><option value="audio">Audio</option><option value="events">Events</option><option value="merch">Merchandise</option><option value="releases">Releases</option></select></label>
          <label>Sort<select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}><option value="featured">Featured / Popular</option><option value="az">A–Z</option><option value="za">Z–A</option><option value="newest">Newest</option></select></label>
        </div>

        {visible('articles') && <section id="catArticles">
          <SectionHead title={`${c.name} Articles`} />
          <div className="subfilter-row"><label>Article tags<select value={tagFilter} onChange={(e)=>setTagFilter(e.target.value)}><option value="all">All tags</option>{tagOptions.map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
          <div className="cards-grid">
            {articleItems.map((x) => (
              <ArticleCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('characters') && <section id="catCharacters">
          <SectionHead title="Character Profiles" sub="Meet standout characters and personalities from this fandom." />
          <div className="subfilter-row"><label>Franchise / Series<select value={seriesFilter} onChange={(e)=>setSeriesFilter(e.target.value)}><option value="all">All series</option>{seriesOptions.map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
          <div className="profile-grid">
            {characterItems.map((x) => (
              <ProfileCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('gallery') && <section id="catGallery">
          <SectionHead title="Image Gallery" sub="Explore iconic characters and moments from this fandom." />
          <GalleryGrid items={f('galleries')} />
        </section>}

        {visible('videos') && <section id="catMedia">
          <SectionHead title="Videos" />
          <div className="subfilter-row"><label>Video type<select value={videoType} onChange={(e)=>setVideoType(e.target.value)}><option value="all">All video types</option>{videoTypes.map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
          <div className="category-video-grid">
            {videoItems.map((x) => (
              <TrailerCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('audio') && <section id="catAudio">
          <SectionHead title="Audio & Podcasts" sub={`Listen to podcasts selected for ${c.name} fans.`} />
          <div className="subfilter-row"><label>Audio type<select value={audioType} onChange={(e)=>setAudioType(e.target.value)}><option value="all">All audio types</option>{audioTypes.map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
          <div className="audio-grid">
            {audioItems.map((x) => (
              <AudioCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('events') && <section id="catEvents">
          <SectionHead title="Events" sub="Discover conventions, showcases and fan gatherings connected to this fandom." />
          <div className="event-grid">
            {f('events').map((x) => (
              <EventCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('merch') && <section id="catMerch">
          <SectionHead title="Merchandise" />
          <div className="product-grid">
            {f('merchandise').map((x) => (
              <ProductCard key={x.id} item={x} />
            ))}
          </div>
        </section>}

        {visible('releases') && <section id="catReleases">
          <SectionHead title="Upcoming Releases" />
          <div className="release-grid">
            {f('releases').map((x) => (
              <ReleaseCard key={x.id} item={x} />
            ))}
          </div>
        </section>}
      </div>
    </>
  )
}

function GalleryGrid({ items }) {
  const { openModal, isBookmarked, toggleBookmark } = useApp()
  return (
    <div className="gallery-grid">
      {items.map((g) => (
        <div className="gallery-item" key={g.id}><img
          src={g.image}
          alt={g.title}
          onClick={() =>
            openModal(
              <>
                <img
                  src={g.image}
                  alt={g.title}
                  style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain' }}
                />
                <h3>{g.title}</h3>
              </>
            )
          }
        /><button className={`gallery-save bookmark-btn${isBookmarked(g.id) ? ' active' : ''}`} onClick={() => toggleBookmark(g.id, 'gallery')}>♡ Save</button></div>
      ))}
    </div>
  )
}

function AudioCard({ item }) {
  const { isBookmarked, toggleBookmark } = useApp()
  return (
    <article className="audio-card">
      <div className="audio-card-copy">
        <span className="tag">PODCAST</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <audio className="native-audio" controls preload="none">
          <source src={item.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio player.
        </audio>
        <button className={`ghost bookmark-btn${isBookmarked(item.id) ? ' active' : ''}`} onClick={() => toggleBookmark(item.id, 'audio')}>♡ Save</button>
      </div>
    </article>
  )
}
