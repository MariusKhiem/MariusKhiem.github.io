import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import ProjectOrbit from './components/ProjectOrbit.jsx'
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
            <h1>{profile.intro}</h1>
          </section>

          <section className="work" id="arbeid" aria-labelledby="arbeid-tittel">
            <ProjectOrbit projects={projects} title="Utvalgte prosjekter" titleId="arbeid-tittel" />
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
