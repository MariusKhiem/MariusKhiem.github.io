import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import { profile, projects, about } from './content.js'

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

function ProjectImage({ project, index }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} loading="lazy" />
  }
  return (
    <div className={`placeholder placeholder-${index % 3}`} role="img" aria-label={`Plassholder for bilde av ${project.title}`}>
      <span>Prosjektbilde</span>
    </div>
  )
}

function Project({ project, index }) {
  return (
    <article className="project">
      <a className="project-image" href={project.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
        <ProjectImage project={project} index={index} />
      </a>
      <div className="project-info">
        <div className="project-head">
          <h3>
            <a href={project.href} target="_blank" rel="noreferrer">{project.title}</a>
          </h3>
          <p className="project-meta">{project.role} · {project.year}</p>
        </div>
        <p className="project-desc">{project.description}</p>
        <ul className="tags" aria-label="Verktøy">
          {project.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // fjern den mørke startbakgrunnen fra index.html når lasteskjermen er ferdig
  useEffect(() => {
    if (!loading) document.body.style.background = ''
  }, [loading])

  return (
    <>
      <div className="site" id="top" aria-hidden={loading}>
        <Nav />
        <main>
          <section className="hero wrap">
            <p className="eyebrow">{profile.role} · {profile.location}</p>
            <h1>{profile.intro}</h1>
            <p className="status"><span className="dot" aria-hidden="true" />{profile.available}</p>
          </section>

          <section className="work wrap" id="arbeid" aria-labelledby="arbeid-tittel">
            <div className="section-head">
              <h2 id="arbeid-tittel">Utvalgte prosjekter</h2>
              <p className="count">{String(projects.length).padStart(2, '0')} prosjekter</p>
            </div>
            <div className="projects">
              {projects.map((p, i) => <Project key={p.title} project={p} index={i} />)}
            </div>
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
            <p className="eyebrow">Kontakt</p>
            <h2 id="kontakt-tittel">La oss lage noe sammen.</h2>
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
          <p>Bygget med React og Three.js</p>
        </footer>
      </div>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
    </>
  )
}
