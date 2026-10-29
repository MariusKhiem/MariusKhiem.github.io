import { useEffect, useRef, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { useFrame } from '@react-three/fiber'
import './LoadingScreen.css'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const MIN_MS = reduceMotion ? 300 : 1800 // så skjermen ikke bare blinker forbi
const MAX_MS = 8000                        // gi opp å vente og vis siden uansett
const EXIT_MS = 1100                       // samme lengde som overgangen i CSS

// Sier fra når gradienten har tegnet sine første bilder
function FirstFrame({ onReady }) {
  const frames = useRef(0)
  useFrame(() => {
    frames.current += 1
    if (frames.current === 2) onReady()
  })
  return null
}

export default function LoadingScreen({ onFinished }) {
  const [shown, setShown] = useState(0) // 0..1, det telleren viser
  const [exiting, setExiting] = useState(false)
  const done = useRef({ fonts: false, page: false, gradient: false })
  const markGradient = useRef(() => { done.current.gradient = true })

  // Hva vi venter på: fonter, resten av siden og første bilde fra gradienten
  useEffect(() => {
    document.fonts?.ready.then(() => { done.current.fonts = true })
    if (document.readyState === 'complete') done.current.page = true
    else window.addEventListener('load', () => { done.current.page = true }, { once: true })
  }, [])

  // Telleren glir mot det som faktisk er lastet, men aldri raskere enn MIN_MS
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    let value = 0
    const tick = (now) => {
      const el = now - start
      const d = done.current
      const loaded = (d.fonts ? 0.3 : 0) + (d.page ? 0.3 : 0) + (d.gradient ? 0.4 : 0)
      const target = el > MAX_MS ? 1 : Math.min(loaded, el / MIN_MS, 0.98 + (loaded === 1 ? 0.02 : 0))
      value += (target - value) * 0.08
      if (target === 1 && value > 0.995) value = 1
      setShown(value)
      if (value < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setExiting(true), 350)
        setTimeout(onFinished, 350 + EXIT_MS)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onFinished])

  return (
    <div
      className={`loader${exiting ? ' is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Laster porteføljen, ${Math.round(shown * 100)} prosent`}
    >
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        lazyLoad={false}
        pointerEvents="none"
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate={reduceMotion ? 'off' : 'on'}
          uSpeed={0.15}
          uStrength={2.4}
          uDensity={1.4}
          uFrequency={5.5}
          uAmplitude={0}
          color1="#456990"
          color2="#1d2d47"
          color3="#9bb3d6"
          lightType="3d"
          brightness={1.1}
          grain="on"
          cDistance={3.4}
          cPolarAngle={80}
          cAzimuthAngle={180}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          positionX={0}
          positionY={0}
          positionZ={0}
          reflection={0.1}
        />
        <FirstFrame onReady={markGradient.current} />
      </ShaderGradientCanvas>
      <div className="loader-vignette" aria-hidden="true" />

      <svg width="0" height="0" className="loader-defs" aria-hidden="true">
        <filter id="liquid" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="3">
            {!reduceMotion && (
              <animate attributeName="baseFrequency" dur="9s" values="0.012 0.03;0.016 0.022;0.012 0.03" repeatCount="indefinite" />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="loader-center">
        <p className="loader-name" aria-hidden="true">
          <span>Marius</span>
          <span>Nguyen</span>
        </p>
        <div className="loader-pill" aria-hidden="true">
          <div className="loader-fill" style={{ transform: `scaleX(${shown})` }} />
          <div className="loader-readout">
            <span>Portefølje</span>
            <span className="loader-pct">{String(Math.round(shown * 100)).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
