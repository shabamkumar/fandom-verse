import { Link } from 'react-router-dom'

export default function SectionHead({ title, sub, to }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {to && (
        <Link className="text-link" to={to}>
          View All →
        </Link>
      )}
    </div>
  )
}
