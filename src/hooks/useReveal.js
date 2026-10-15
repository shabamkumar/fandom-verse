import { useEffect } from 'react'

const SELECTOR =
  '.section-head,.category-card,.card,.mini-card,.event-card,.product-card,.profile-card,.gallery-grid img,.page-hero,.category-hero>div,.info-grid>*'

// Re-creates the original initReveal(): fade/slide elements in as they scroll into view.
// `deps` should change whenever the page's content changes (e.g. route or filtered list).
export default function useReveal(deps = []) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = [...document.querySelectorAll(SELECTOR)]
    els.forEach((el, i) => {
      el.classList.add('reveal-item')
      el.style.setProperty('--reveal-delay', `${Math.min((i % 6) * 55, 275)}ms`)
    })

    if (reduce) {
      els.forEach((el) => el.classList.add('revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -35px' }
    )
    els.forEach((el) => io.observe(el))

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
