import { useEffect, useRef, useState } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import ProjectOrbit from './components/ProjectOrbit.jsx'
import SectionRail from './components/SectionRail.jsx'
import ProjectView from './components/ProjectView.jsx'
import { profile, projects as rawProjects, about, slugify } from './content.js'

const projects = rawProjects.map((p) => ({ ...p, slug: slugify(p.title) }))
const HASH = '#prosjekt-'
const slugFromHash = () => (location.hash.startsWith(HASH) ? location.hash.slice(HASH.length) : null)

function Nav() {
  return (
    <header className="nav">
      <a className="nav-mark" href="#top" aria-label={`${profile.name}, til toppen`}>MN</a>
      <nav aria-label="Hovedmeny">
        <a href="#arbeid">Arbeid</a>
        <a href="#om">Om</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </header>
  )
}

const SECTIONS = [
  { id: 'start', label: 'Start' },
  { id: 'arbeid', label: 'Prosjekter' },
  { id: 'om', label: 'Om meg' },
  { id: 'kontakt', label: 'Kontakt' },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  // åpent prosjekt styres av adressen (#prosjekt-navn), så tilbake-knappen og delte lenker virker
  const [openSlug, setOpenSlug] = useState(slugFromHash)
  const pushed = useRef(false)

  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const openProject = (slug) => {
    if (slug === openSlug) return
    if (openSlug) history.replaceState(null, '', HASH + slug)
    else { history.pushState(null, '', HASH + slug); pushed.current = true }
    setOpenSlug(slug)
  }
  const closeProject = () => {
    if (pushed.current) { pushed.current = false; history.back() }
    else { history.replaceState(null, '', location.pathname + location.search); setOpenSlug(null) }
  }

  const openIndex = projects.findIndex((p) => p.slug === openSlug)
  const openP = openIndex >= 0 ? projects[openIndex] : null

  // fjern den mørke startbakgrunnen fra index.html når lasteskjermen er ferdig
  useEffect(() => {
    if (!loading) document.body.style.background = ''
  }, [loading])

  return (
    <>
      <div className="site" id="top" aria-hidden={loading || !!openP}>
        <Nav />
        <SectionRail sections={SECTIONS} />
        <main>
          <section className="hero wrap" id="start">
            <h1>{profile.intro}</h1>
          </section>

          <section className="work" id="arbeid" aria-labelledby="arbeid-tittel">
            <ProjectOrbit
              projects={projects}
              title="Utvalgte prosjekter"
              titleId="arbeid-tittel"
              onOpen={(i) => openProject(projects[i].slug)}
              paused={!!openP}
            />
          </section>

          <section className="about wrap" id="om" aria-labelledby="om-tittel">
            <h2 id="om-tittel">Om meg</h2>
            <div className="about-body">
              <p className="about-text">{about.text}</p>
              <ul className="skills" aria-label="Ferdigheter">
                {about.skills.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </section>

          <section className="contact wrap" id="kontakt" aria-labelledby="kontakt-tittel">
            <h2 id="kontakt-tittel">Ser du etter en utvikler? Ta gjerne kontakt!</h2>
            <a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <ul className="links">
              {profile.links.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a></li>
              ))}
            </ul>
          </section>
        </main>
        <footer className="footer wrap">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>
      {openP && !loading && (
        <ProjectView
          key="prosjekt"
          project={openP}
          index={openIndex}
          next={projects[(openIndex + 1) % projects.length] === openP ? null : projects[(openIndex + 1) % projects.length]}
          onClose={closeProject}
          onOpen={openProject}
        />
      )}
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
    </>
  )
}
