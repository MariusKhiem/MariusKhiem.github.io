import { useEffect, useRef, useState } from 'react'
import './ProjectView.css'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Egen side for ett prosjekt. Legger seg over porteføljen og lukkes med knappen, Esc eller tilbake-knappen.
export default function ProjectView({ project, index, next, onClose, onOpen }) {
  const [closing, setClosing] = useState(false)
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  const close = () => {
    if (reduceMotion) return onClose()
    setClosing(true)
    setTimeout(onClose, 380)
  }

  // lås scrolling bak, flytt fokus inn, og lukk med Esc
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // nytt prosjekt: start øverst
  useEffect(() => { panelRef.current?.scrollTo(0, 0) }, [project])

  return (
    <div
      className={`pv${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pv-title"
      ref={panelRef}
    >
      <div className="pv-bar">
        <div className="pv-bar-inner wrap">
          <button type="button" className="pv-back" onClick={close}>← Alle prosjekter</button>
          <button type="button" className="pv-close" onClick={close} ref={closeRef} aria-label="Lukk prosjektet">✕</button>
        </div>
      </div>

      <article className="pv-body wrap">
        <header className="pv-head">
          <h1 id="pv-title">{project.title}</h1>
          <p className="pv-lead">{project.description}</p>
        </header>

        <div className={`pv-image${project.image ? '' : ` pv-image-${index % 3}`}`}>
          {project.image
            ? <img src={project.image} alt={project.title} />
            : <span>{project.title}</span>}
        </div>

        <div className="pv-text">
          <div className="pv-details">
            {(project.details || []).map((d, i) => <p key={i}>{d}</p>)}
          </div>
          <div className="pv-side">
            <ul className="tags" aria-label="Verktøy">
              {project.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {project.href && (
              <a className="pv-link" href={project.href} target="_blank" rel="noreferrer">Se på GitHub ↗</a>
            )}
          </div>
        </div>
      </article>

      {next && (
        <button type="button" className="pv-next wrap" onClick={() => onOpen(next.slug)} aria-label={`Neste prosjekt: ${next.title}`}>
          <span className="pv-next-title">{next.title} →</span>
        </button>
      )}
    </div>
  )
}
