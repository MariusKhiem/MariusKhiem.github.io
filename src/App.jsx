import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <main className="site" aria-hidden={loading}>
        <h1>Marius Nguyen</h1>
        <p>Porteføljen kommer snart.</p>
      </main>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
    </>
  )
}
