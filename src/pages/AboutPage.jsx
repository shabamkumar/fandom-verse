import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

export default function AboutPage() {
  useReveal([])
  return (
    <div className="content-page">
      <Breadcrumb current="About Us" />
      <div className="page-hero">
        <div className="eyebrow">ABOUT FANDOMVERSE</div>
        <h1>One universe for every kind of fan.</h1>
        <p className="muted">FandomVerse brings Anime, Gaming, Movies, TV Shows, K-Pop, Comics and Manga together in one visually rich place built for discovery.</p>
      </div>
      <div className="about-intro card"><div className="copy"><h2>Why FandomVerse?</h2><p>Fans often jump between different sites to find stories, characters, trailers, events, releases and collectibles. FandomVerse organizes those experiences into one clear portal, so visitors can move from one fandom to another without losing the feeling of a connected universe.</p><p>Each category has its own hub with articles, character profiles, galleries, videos, podcasts, events, merchandise and upcoming releases. Global search, filters and sorting make it easier to find something specific, while bookmarks and personal notes help visitors keep track of what catches their attention.</p></div></div>
      <div className="info-grid about-grid">
        <div className="card"><div className="copy"><h2>Discover more</h2><p>Explore seven fandom hubs, open detailed stories, browse visual galleries and move between related content through a responsive interface designed around quick discovery.</p></div></div>
        <div className="card"><div className="copy"><h2>Built around interaction</h2><p>Save favorites, add session notes, explore a temporary merchandise cart, check events and releases, and use FandomBot for quick navigation and recommendations.</p></div></div>
        <div className="card"><div className="copy"><h2>Lightweight by design</h2><p>The experience runs in the browser using React and structured JSON content. Local browser storage supports personal features without requiring a server-side account or database.</p></div></div>
        <div className="card"><div className="copy"><h2>Made for every screen</h2><p>The layout adapts across desktop, tablet and mobile so the same categories, media and navigation remain comfortable to use on different screen sizes.</p></div></div>
      </div>
    </div>
  )
}
