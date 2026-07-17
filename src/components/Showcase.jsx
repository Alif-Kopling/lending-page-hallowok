import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Showcase() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ghost-tampilan',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.show-title-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.show-title-inner', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.show-image',
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.show-image', start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="showcase" className="relative py-16 px-4 md:py-32 md:px-8 overflow-hidden">
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="ghost-tampilan select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 16vw, 14rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(45,140,255,0.06)', lineHeight: 0.85 }}>
          TAMPILAN
        </span>
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="overflow-hidden mb-4 inline-block">
            <span className="show-title-inner block text-xs font-semibold uppercase tracking-[0.25em] text-primary">Preview</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="show-title-inner text-[clamp(2rem,4.5vw,3.2rem)] font-[800] tracking-tight text-foreground">
              Tampilan <span className="text-primary">Hallo Wok</span>
            </h2>
          </div>
          <p className="show-title-inner text-muted-foreground text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
            Bersih, cepat, dan enak dipandang — setiap pixel dirancang buat kenyamananmu.
          </p>
        </div>

        {/* Banner image */}
        <div className="show-image glass-card rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.4), 0 0 80px rgba(45,140,255,0.06)' }}>
          <img
            src="/benner-preview.webp"
            alt="Hallo Wok app preview"
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
