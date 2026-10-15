import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Discover', to: '/search' },
  { label: 'Articles', to: '/articles' },
  { label: 'Trailers', to: '/trailers' },
  { label: 'Events', to: '/events' },
  { label: 'Merch', to: '/merch' },
  { label: 'Bookmarks', to: '/bookmarks' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer>
      <Link className="wordmark" to="/">
        Fandom<span>Verse</span>
      </Link>
      <p>One Universe. All Fandoms.</p>
      <div>
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
      </div>
      <small>© 2026 FandomVerse • Developed by Syntax Error</small>
    </footer>
  )
}
