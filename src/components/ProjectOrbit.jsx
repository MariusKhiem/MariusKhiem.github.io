import { useEffect, useRef, useState } from 'react'
import './ProjectOrbit.css'

const STEP = 17 // grader mellom kortene
const AUTO_MS = 4500 // tid mellom hvert automatiske bytte
const RESUME_MS = 6000 // ekstra pause etter at noen har brukt hjulet selv

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Prosjektkort på en stor sirkel, inspirert av «Orbit» av rico.
// Hjulet går rundt av seg selv, og stopper mens du holder musen over eller bruker det.
// Dra, klikk på et kort, eller bruk pilene for å bytte prosjekt.
export default function ProjectOrbit({ projects, title, titleId }) {
  const n = projects.length
  const mid = Math.floor((n - 1) / 2)
  const [active, setActive] = useState(mid)
  const [shown, setShown] = useState(mid) // prosjektet teksten under viser (bytter etter en kort overgang)
  const [fading, setFading] = useState(false)

  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const motion = useRef({ pos: mid, target: mid, dragging: false, moved: false, sx: 0, sp: 0 })
  const auto = useRef({ next: performance.now() + AUTO_MS, hover: false, focus: false, inView: false })

  const clampIdx = (i) => Math.max(0, Math.min(n - 1, i))
  // når noen bruker hjulet selv, venter den automatiske rotasjonen litt ekstra
  const poke = () => { auto.current.next = performance.now() + AUTO_MS + RESUME_MS }
  const go = (i) => { motion.current.target = clampIdx(i); poke() }

  // Animasjonen kjører utenfor React, så den ikke tegner hele siden på nytt hvert bilde
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const m = motion.current
      const dt = Math.min(now - last, 64)
      last = now
      const a = auto.current
      const paused = m.dragging || a.hover || a.focus || !a.inView || document.hidden
      if (paused) a.next = Math.max(a.next, now + AUTO_MS)
      else if (!reduceMotion && n > 1 && now >= a.next) {
        // neste prosjekt; etter det siste går hjulet tilbake til det første
        m.target = (Math.round(m.target) + 1) % n
        a.next = now + AUTO_MS
      }
      if (!m.dragging) m.pos += (m.target - m.pos) * (reduceMotion ? 1 : 1 - Math.exp(-dt / 140))
      if (Math.abs(m.target - m.pos) < 0.0005) m.pos = m.target
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const d = i - m.pos
        const dist = Math.abs(d)
        el.style.transform = `rotate(${d * STEP}deg)`
        el.style.zIndex = String(100 - Math.round(dist * 10))
        el.style.opacity = dist > 3.2 ? '0' : '1'
        el.style.filter = `brightness(${1 - Math.min(dist, 3) * 0.06})`
      })
      setActive(clampIdx(Math.round(m.target)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [n])

  // Tekst under hjulet: tones ut og inn når prosjektet bytter
  useEffect(() => {
    if (active === shown) return
    if (reduceMotion) { setShown(active); return }
    setFading(true)
    const t = setTimeout(() => { setShown(active); setFading(false) }, 180)
    return () => clearTimeout(t)
  }, [active, shown])

  // Dra med mus eller finger
  useEffect(() => {
    const stage = stageRef.current
    const m = motion.current
    const down = (e) => {
      m.dragging = true; m.moved = false; m.sx = e.clientX; m.sp = m.pos
      stage.classList.add('is-dragging')
    }
    const move = (e) => {
      if (!m.dragging) return
      const dx = e.clientX - m.sx
      if (Math.abs(dx) > 4) m.moved = true
      let p = m.sp - dx / (stage.clientWidth * 0.22)
      // gummistrikk forbi første og siste kort
      if (p < 0) p = -Math.sqrt(-p) * 0.3
      if (p > n - 1) p = n - 1 + Math.sqrt(p - (n - 1)) * 0.3
      m.pos = p
      m.target = p
    }
    const up = () => {
      if (!m.dragging) return
      m.dragging = false
      stage.classList.remove('is-dragging')
      m.target = clampIdx(Math.round(m.pos))
      poke()
      setTimeout(() => { m.moved = false }, 0)
    }
    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [n])

  // rotasjonen går bare når hjulet er synlig på skjermen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { auto.current.inView = e.isIntersecting }, { threshold: 0.35 })
    io.observe(stageRef.current)
    return () => io.disconnect()
  }, [])

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { go(active - 1); e.preventDefault() }
    if (e.key === 'ArrowRight') { go(active + 1); e.preventDefault() }
  }

  const p = projects[shown]

  return (
    <>
      <div className="section-head wrap">
        <h2 id={titleId}>{title}</h2>
        <div className="orbit-arrows">
          <button type="button" onClick={() => go(active - 1)} disabled={active <= 0} aria-label="Forrige prosjekt">←</button>
          <button type="button" onClick={() => go(active + 1)} disabled={active >= n - 1} aria-label="Neste prosjekt">→</button>
        </div>
      </div>

      <div
        className="orbit-stage"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') auto.current.hover = true }}
        onPointerLeave={() => { auto.current.hover = false }}
        onFocus={() => { auto.current.focus = true }}
        onBlur={() => { auto.current.focus = false }}
        aria-roledescription="karusell"
        aria-labelledby={titleId}
      >
        <div className="orbit-planet" aria-hidden="true" />
        {projects.map((proj, i) => (
          <button
            key={proj.title}
            type="button"
            ref={(el) => { cardRefs.current[i] = el }}
            className={`orbit-card orbit-card-${i % 3}${proj.image ? ' has-image' : ''}`}
            tabIndex={-1}
            aria-label={proj.title}
            onClick={() => { if (!motion.current.moved) go(i) }}
          >
            {proj.image
              ? <img src={proj.image} alt="" draggable="false" />
              : <span className="orbit-card-title">{proj.title}</span>}
          </button>
        ))}
      </div>

      <div className={`orbit-info wrap${fading ? ' is-fading' : ''}`}>
        <h3>{p.title}</h3>
        <div className="orbit-info-side">
          <p>{p.description}</p>
          <ul className="tags" aria-label="Verktøy">
            {p.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          {p.href && <a className="orbit-more" href={p.href} target="_blank" rel="noreferrer">Se prosjektet ↗</a>}
        </div>
      </div>
    </>
  )
}
