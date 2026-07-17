import { useEffect, useRef, lazy, Suspense, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import ShinyText from './ShinyText'
import { useDevicePerformance } from '../hooks/useDevicePerformance'

const GridDistortion = lazy(() => import('./GridDistortion'))
const FuzzyText = lazy(() => import('./FuzzyText'))

function HeroFallback() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-5 pt-20 pb-12 md:px-8 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/section-1-abstract.webp"
          alt=""
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1] pointer-events-none" />
      <div className="relative z-10 max-w-[720px]">
        <img src="/logo.webp" alt="Hallo Wok" className="h-32 md:h-96 mx-auto mb-3 md:mb-5" loading="eager" decoding="async" />
        <h1 className="text-[clamp(1.6rem,7vw,4rem)] font-[800] leading-[1.1] tracking-tight mb-3 md:mb-6 text-foreground">
          Ngobrol Tanpa Jeda
        </h1>
        <p className="text-sm md:text-lg max-w-[520px] mx-auto mb-6 md:mb-10 leading-relaxed text-muted-foreground">
          Hallo Wok bikin obrolan kamu jadi lebih hidup — DM, group chat, semuanya langsung sampai tanpa nunggu.
        </p>
        <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
          <a href="https://github.com/wafley/realchat-web/tree/develop" target="_blank" rel="noopener noreferrer"
            className="bg-primary text-primary-foreground border-none px-6 py-3 md:px-8 md:py-3.5 rounded-2xl text-sm md:text-base font-bold cursor-pointer transition-all hover:bg-primary/90 hover:-translate-y-0.5 shadow-[0_4px_24px_var(--color-primary-glow)] hover:shadow-[0_8px_32px_var(--color-primary-glow)] no-underline inline-block">
            Frontend
          </a>
          <a href="https://github.com/wafley/realchat-api/tree/develop" target="_blank" rel="noopener noreferrer"
            className="bg-transparent text-foreground border border-border px-6 py-3 md:px-8 md:py-3.5 rounded-2xl text-sm md:text-base font-semibold cursor-pointer transition-all hover:border-primary/50 hover:bg-card no-underline inline-block">
            Backend
          </a>
        </div>
      </div>
    </section>
  )
}

function GridSkeleton() {
  return <div className="w-full h-full bg-background" />
}

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const { isLowEnd, isMobile, reducedMotion, multiplier } = useDevicePerformance()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.eyebrow', '.hero-title', '.hero-subtitle', '.hero-buttons', '.scroll-indicator'], {
        opacity: 0, y: 30,
      })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.eyebrow', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-title', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const gridProps = useMemo(() => ({
    grid: isLowEnd ? 5 : 10,
    mouse: 0.1,
    strength: isLowEnd ? 0.08 : 0.15,
    relaxation: 0.9,
  }), [isLowEnd])

  const fuzzyProps = useMemo(() => ({
    fontSize: isMobile ? 'clamp(1.4rem, 7vw, 2.4rem)' : 'clamp(2.4rem, 5.5vw, 4rem)',
    fontWeight: 800,
    color: 'rgba(255,255,255,0.85)',
    enableHover: multiplier > 0,
    baseIntensity: isLowEnd ? 0.08 : 0.15,
    hoverIntensity: isLowEnd ? 0.2 : 0.45,
    fuzzRange: isLowEnd ? 10 : 20,
    fps: isLowEnd ? 20 : 30,
    direction: 'horizontal',
    clickEffect: multiplier > 0,
    glitchMode: !isLowEnd,
    glitchInterval: 6000,
    glitchDuration: 100,
  }), [isLowEnd, multiplier])

  if (reducedMotion) return <HeroFallback />

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-center px-5 pt-20 pb-12 md:px-8 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<GridSkeleton />}>
          {isLowEnd || isMobile ? (
            <img
              src="/section-1-abstract.webp"
              alt=""
              className="w-full h-full object-cover opacity-60"
              loading="eager"
              decoding="async"
            />
          ) : (
            <GridDistortion {...gridProps} imageSrc="/section-1-abstract.webp" />
          )}
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1] pointer-events-none" />
      <div ref={contentRef} className="relative z-10 max-w-[720px] w-full overflow-hidden px-5 md:px-8">
        <img src="/logo.webp" alt="Hallo Wok" className="h-32 md:h-96 mx-auto mb-3 md:mb-5" loading="eager" decoding="async" />
        <h1 className="hero-title text-[clamp(1.6rem,7vw,4rem)] font-[800] leading-[1.1] tracking-tight mb-3 md:mb-6 overflow-hidden" style={multiplier > 0 ? { textShadow: '0 0 40px rgba(10,132,255,0.6), 0 0 80px rgba(10,132,255,0.3)' } : undefined}>
          <Suspense fallback={<span>Ngobrol Tanpa Jeda</span>}>
            {multiplier > 0 ? (
              <FuzzyText {...fuzzyProps}>Ngobrol Tanpa Jeda</FuzzyText>
            ) : (
              <span>Ngobrol Tanpa Jeda</span>
            )}
          </Suspense>
        </h1>
        <p className="hero-subtitle text-[0.8rem] md:text-lg max-w-[520px] mx-auto mb-6 md:mb-10 leading-relaxed overflow-hidden" style={multiplier > 0 ? { textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)' } : undefined}>
          <ShinyText
            text="Hallo Wok bikin obrolan kamu jadi lebih hidup — DM, group chat, semuanya langsung sampai tanpa nunggu."
            speed={4}
            color="rgba(255,255,255,0.4)"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            pauseOnHover={true}
          />
        </p>
        <div className="hero-buttons flex gap-3 md:gap-4 justify-center flex-wrap">
          <a href="https://github.com/wafley/realchat-web/tree/develop" target="_blank" rel="noopener noreferrer"
            className="bg-primary text-primary-foreground border-none px-6 py-3 md:px-8 md:py-3.5 rounded-2xl text-sm md:text-base font-bold cursor-pointer transition-all hover:bg-primary/90 hover:-translate-y-0.5 shadow-[0_4px_24px_var(--color-primary-glow)] hover:shadow-[0_8px_32px_var(--color-primary-glow)] no-underline inline-block">
            Frontend
          </a>
          <a href="https://github.com/wafley/realchat-api/tree/develop" target="_blank" rel="noopener noreferrer"
            className="bg-transparent text-foreground border border-border px-6 py-3 md:px-8 md:py-3.5 rounded-2xl text-sm md:text-base font-semibold cursor-pointer transition-all hover:border-primary/50 hover:bg-card no-underline inline-block">
            Backend
          </a>
        </div>
        <div className="scroll-indicator mt-8 md:mt-12 inline-block text-muted-foreground" style={{ animation: multiplier > 0 ? 'bounce 2s ease-in-out infinite' : undefined }}>
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </section>
  )
}
