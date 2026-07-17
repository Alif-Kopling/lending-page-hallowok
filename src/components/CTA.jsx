import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useDevicePerformance } from '../hooks/useDevicePerformance'

const floatingBubbles = [
  { size: 48, x: '8%', y: '20%', delay: 0 },
  { size: 32, x: '85%', y: '15%', delay: 0.8 },
  { size: 24, x: '12%', y: '75%', delay: 1.6 },
  { size: 40, x: '80%', y: '70%', delay: 0.4 },
  { size: 20, x: '50%', y: '85%', delay: 1.2 },
]

export default function CTA() {
  const sectionRef = useRef(null)
  const { isLowEnd } = useDevicePerformance()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ghost-ngobrol',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.cta-title-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.cta-title-inner', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.cta-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.cta-card', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.cta-bubble',
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 0.4, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-20 px-4 md:py-32 md:px-8 overflow-hidden">
      {!isLowEnd && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(circle, rgba(45,140,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
      )}

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="ghost-ngobrol select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 14vw, 12rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(45,140,255,0.05)', lineHeight: 0.85 }}>
          NGOBROL
        </span>
      </div>

      {/* Floating chat bubbles decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingBubbles.map((b, i) => (
          <div key={i} className="cta-bubble absolute glass-card rounded-2xl flex items-center justify-center"
            style={{ width: b.size, height: b.size, left: b.x, top: b.y, opacity: 0.4, animation: `float${['A','B','C'][i % 3]} ${4 + i}s ease-in-out infinite`, animationDelay: `${b.delay}s` }}>
            <MessageCircle className="text-primary/40" style={{ width: b.size * 0.45, height: b.size * 0.45 }} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="overflow-hidden mb-4 inline-block">
            <span className="cta-title-inner block text-xs font-semibold uppercase tracking-[0.25em] text-primary">Get Started</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="cta-title-inner text-[clamp(1.8rem,4.5vw,3rem)] font-[800] tracking-tight text-foreground">
              Siap <span className="text-primary">Ngobrol</span>?
            </h2>
          </div>
          <p className="cta-title-inner text-muted-foreground text-sm md:text-base max-w-[420px] mx-auto leading-relaxed">
            Gratis, tanpa kartu kredit, tanpa ribet.
          </p>
        </div>

        {/* Notification card */}
        <div className="cta-card glass-card-strong rounded-3xl p-6 md:p-8 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />

          {/* Chat invite header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(45,140,255,0.5) 0%, rgba(127,211,255,0.3) 100%)',
                boxShadow: '0 4px 16px rgba(45,140,255,0.25)',
              }}>
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">Hallo Wok</div>
              <div className="text-xs text-muted-foreground">Baru saja</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Message */}
          <div className="glass-card rounded-2xl rounded-tl-sm p-4 mb-5">
            <p className="text-foreground text-sm md:text-base leading-relaxed">
              Hai! 👋 Lihat source code Hallo Wok di GitHub — Frontend & Backend, open source!
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2">
            <a href="https://github.com/wafley/realchat-web/tree/develop" target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border-none px-6 py-3.5 md:py-4 rounded-2xl text-sm md:text-base font-bold cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 no-underline"
              style={{
                background: 'linear-gradient(135deg, rgba(45,140,255,0.5) 0%, rgba(79,168,255,0.3) 100%)',
                color: '#7FD3FF',
                boxShadow: '0 4px 24px rgba(45,140,255,0.3)',
              }}>
              Frontend
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/wafley/realchat-api/tree/develop" target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border-none px-6 py-3.5 md:py-4 rounded-2xl text-sm md:text-base font-bold cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 no-underline glass-card text-muted-foreground">
              Backend
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Read receipts */}
          <div className="flex justify-end mt-3 gap-1">
            <svg className="w-4 h-4 text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 12l5 5L20 5" />
              <path d="M7 12l5 5L25 5" opacity="0.5" />
            </svg>
            <span className="text-[0.65rem] text-muted-foreground/50">Dibaca</span>
          </div>
        </div>
      </div>
    </section>
  )
}
