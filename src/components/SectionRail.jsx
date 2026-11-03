import { useEffect, useState } from 'react'
import './SectionRail.css'

// Snarveier på høyre side som viser hvor på siden du er.
// Dukker opp når du har scrollet forbi toppen.
export default function SectionRail({ sections }) {
  const [active, setActive] = useState(sections[0].id)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4 // en seksjon er aktiv når toppen har passert 40 % av skjermen
      let current = sections[0].id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      // helt nederst er siste seksjon aktiv, selv om den er kort
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id
      }
      setActive(current)
      setVisible(window.scrollY > window.innerHeight * 0.35)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [sections])

  return (
    <nav className={`rail${visible ? ' is-visible' : ''}`} aria-label="Seksjoner">
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : undefined}
              aria-current={active === s.id ? 'location' : undefined}
              tabIndex={visible ? undefined : -1}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
