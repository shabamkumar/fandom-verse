import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import useReveal from '../hooks/useReveal'
import Breadcrumb from '../components/Breadcrumb'

const DEFAULT_MAP_SRC =
  'https://www.google.com/maps?q=Aptech%20Metro%20Star%20Gate%2C%20Ground%20Floor%2C%20Metro%20Cash%20%26%20Carry%2C%20Star%20Gate%2C%20Karachi&output=embed'

export default function ContactPage() {
  const { toast, visits } = useApp()
  const [mapSrc, setMapSrc] = useState(DEFAULT_MAP_SRC)
  const [gpsResult, setGpsResult] = useState('')
  const [clock, setClock] = useState(new Date().toLocaleString())
  const [submitted, setSubmitted] = useState(false)

  useReveal([])
  useEffect(() => { const t=setInterval(()=>setClock(new Date().toLocaleString()),1000); return()=>clearInterval(t) }, [])

  const useGps = () => {
    if (!navigator.geolocation) { setGpsResult('GPS is not supported.'); return }
    navigator.geolocation.getCurrentPosition(
      (p) => { const lat=p.coords.latitude.toFixed(5), lng=p.coords.longitude.toFixed(5); setGpsResult(`Map centered near your location: ${lat}, ${lng}`); setMapSrc(`https://www.google.com/maps?q=${lat},${lng}&output=embed`) },
      () => setGpsResult('Location permission was not granted.')
    )
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return }
    setSubmitted(true)
    toast('Message submitted successfully')
  }

  return (
    <div className="content-page">
      <Breadcrumb current="Contact Us" />
      <div className="page-hero">
        <div className="eyebrow">CONTACT</div><h1>Connect with the Verse</h1>
        <p className="muted">Reach the FandomVerse team, find Aptech Metro Star Gate on the map, or use GPS to view your current location.</p>
      </div>
      <div className="info-grid">
        {submitted ? (
          <div className="form-success" role="status"><div className="success-mark">✓</div><h2>Message sent</h2><p>Thanks for reaching out. Your message has been submitted successfully.</p><button className="ghost" onClick={()=>setSubmitted(false)}>Send another message</button></div>
        ) : (
          <form className="form contact-form" onSubmit={submitForm} noValidate={false}>
            <label>Full name<input name="name" type="text" placeholder="Your name" required minLength="2" maxLength="50" pattern="[A-Za-z][A-Za-z .'-]{1,49}" title="Enter 2–50 characters. Use letters, spaces, apostrophes, dots or hyphens only." autoComplete="name" /></label>
            <label>Email address<input name="email" type="email" placeholder="name@example.com" required minLength="6" maxLength="254" pattern="[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+" title="Enter a complete email such as name@example.com." autoComplete="email" /></label>
            <label>Message<textarea name="message" placeholder="How can we help?" required minLength="10" maxLength="1000"></textarea><small className="field-hint">10–1000 characters</small></label>
            <button className="primary" type="submit">Send Message</button>
          </form>
        )}
        <div className="map real-map">
          <iframe title="FandomVerse map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="map-actions"><button className="ghost" onClick={useGps}>⌖ Use My GPS</button><p className="muted">{gpsResult}</p></div>
        </div>
      </div>
      <section className="section" style={{ paddingLeft: 0 }}><h2>Live Portal Status</h2><p>Visitor counter: <b>{visits || 1}</b></p><p>Current time: <span className="clock">{clock}</span></p></section>
    </div>
  )
}
