import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SectionHead from '../components/SectionHead'
import ArticleCard from '../components/cards/ArticleCard'
import EventCard from '../components/cards/EventCard'
import ProductCard from '../components/cards/ProductCard'
import ReleaseCard from '../components/cards/ReleaseCard'
import TrailerCard from '../components/cards/TrailerCard'
import { ArticleModalBody } from '../components/ModalBodies'
import useReveal from '../hooks/useReveal'

export default function Home() {
  const { DATA, openModal, closeModal } = useApp()
  const navigate = useNavigate()
  const trailerRef = useRef(null)
  const releaseRef = useRef(null)
  const catsRef = useRef(null)

  useReveal([])

  const a = DATA.articles.slice(0, 4)

  const openFirstArticle = () => {
    openModal(
      <ArticleModalBody
        item={a[0]}
        onExploreCategory={(cat) => {
          navigate('/category/' + cat)
          closeModal()
        }}
      />
    )
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">ONE UNIVERSE • ALL FANDOMS</div>
          <h1>
            Explore Your
            <br />
            <span className="gradient">Fandom World</span>
          </h1>
          <p>
            From Anime to Gaming, Movies to K-Pop — discover stories, characters, trailers, events, releases and
            fan collections in one interactive universe.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => catsRef.current?.scrollIntoView()}>
              ✦ Start Exploring
            </button>
            <button className="ghost" onClick={() => navigate('/trailers')}>
              ▶ Watch Trailers
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="cats" ref={catsRef}>
        <SectionHead
          title="Explore Fandom Categories"
          sub="Choose a fandom and explore stories, characters, videos, events and more."
        />
        <div className="category-grid">
          {DATA.categories.map((c) => (
            <button
              key={c.slug}
              className="category-card"
              style={{ backgroundImage: `url('${c.image}')` }}
              onClick={() => navigate('/category/' + c.slug)}
            >
              <div>
                <b>{c.name}</b>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Featured Articles" sub="Fresh stories from across the verse." to="/articles" />
        <div className="featured-layout">
          <article className="feature-main" style={{ backgroundImage: `url('${a[0].image}')` }}>
            <div className="feature-copy">
              <span className="tag">{a[0].category}</span>
              <h3>{a[0].title}</h3>
              <p>{a[0].description}</p>
              <button className="primary" onClick={openFirstArticle}>
                Read More →
              </button>
            </div>
          </article>
          <div className="stack">
            {a.slice(1).map((x) => (
              <MiniArticleCard key={x.id} item={x} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead
          title="Latest Trailers"
          sub="Muted previews play automatically — use the YouTube controls to turn sound on."
        />
        <div className="section-tools">
          <button
            className="slider-arrow"
            aria-label="Previous trailers"
            onClick={() => trailerRef.current?.scrollBy({ left: -430, behavior: 'smooth' })}
          >
            ←
          </button>
          <button
            className="slider-arrow"
            aria-label="Next trailers"
            onClick={() => trailerRef.current?.scrollBy({ left: 430, behavior: 'smooth' })}
          >
            →
          </button>
          <button className="text-link" onClick={() => navigate('/trailers')}>
            View All →
          </button>
        </div>
        <div className="trailer-slider" ref={trailerRef}>
          {DATA.trailers.slice(0, 7).map((t) => (
            <TrailerCard key={t.id} item={t} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Upcoming Events" sub="Upcoming pop-culture events worth adding to your radar." to="/events" />
        <div className="event-grid">
          {[...DATA.events].filter((e) => e.date >= new Date().toISOString().slice(0, 10)).sort((a,b) => a.date.localeCompare(b.date)).slice(0, 3).map((e) => (
            <EventCard key={e.id} item={e} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead
          title="Featured Merchandise"
          sub="Collectibles, apparel and fan favorites from across the FandomVerse."
          to="/merch"
        />
        <div className="product-grid">
          {DATA.merchandise.slice(0, 4).map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Upcoming Releases" sub="Keep an eye on what’s arriving next across your favorite fandoms." />
        <div className="section-tools release-tools">
          <button
            className="slider-arrow"
            aria-label="Previous releases"
            onClick={() => releaseRef.current?.scrollBy({ left: -360, behavior: 'smooth' })}
          >
            ←
          </button>
          <button
            className="slider-arrow"
            aria-label="Next releases"
            onClick={() => releaseRef.current?.scrollBy({ left: 360, behavior: 'smooth' })}
          >
            →
          </button>
        </div>
        <div className="release-slider" ref={releaseRef}>
          {DATA.releases.map((r) => (
            <ReleaseCard key={r.id} item={r} />
          ))}
        </div>
      </section>
    </>
  )
}

function MiniArticleCard({ item }) {
  const { openModal, closeModal } = useApp()
  const navigate = useNavigate()

  return (
    <article className="mini-card hover-lift">
      <img loading="lazy" decoding="async" src={item.image} alt="" />
      <div>
        <span className="tag">{item.category}</span>
        <h4>{item.title}</h4>
        <button
          className="text-link"
          onClick={() =>
            openModal(
              <ArticleModalBody
                item={item}
                onExploreCategory={(cat) => {
                  navigate('/category/' + cat)
                  closeModal()
                }}
              />
            )
          }
        >
          Read →
        </button>
      </div>
    </article>
  )
}
