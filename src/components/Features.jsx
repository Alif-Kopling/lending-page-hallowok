import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Smartphone, Users, Shield } from 'lucide-react'
import { useDevicePerformance } from '../hooks/useDevicePerformance'

const features = [
  {
    icon: Zap,
    title: 'Real-Time Chat',
    subtitle: 'Pesan Langsung Sampai',
    desc: 'Ngetik, dikirim, sampai. Tanpa delay, tanpa nunggu. Chat kayak ngobrol langsung muka ketemu muka.',
    gradient: 'from-[#2D8CFF] to-[#4FA8FF]',
    glowColor: 'rgba(45,140,255,0.15)',
  },
  {
    icon: Smartphone,
    title: 'Multi Device',
    subtitle: 'Sinkron di Semua Perangkat',
    desc: 'Mulai di HP, lanjut di laptop, cek di tablet. Semua sinkron, semua up-to-date, kapanpun.',
    gradient: 'from-[#7FD3FF] to-[#2D8CFF]',
    glowColor: 'rgba(127,211,255,0.15)',
  },
  {
    icon: Users,
    title: 'Grup Chat',
    subtitle: 'Ngobrol Rame-Rame',
    desc: 'Bikin grup, ajak temen, diskusi bareng. Fitur lengkap — pin, mention, reply, semuanya.',
    gradient: 'from-[#4FA8FF] to-[#7FD3FF]',
    glowColor: 'rgba(79,168,255,0.15)',
  },
  {
    icon: Shield,
    title: 'Privasi Terjaga',
    subtitle: 'Enkripsi End-to-End',
    desc: 'Cuma kamu dan lawan bicara yang bisa baca. Privasi bukan fitur — ini janji.',
    gradient: 'from-[#2D8CFF] to-[#7FD3FF]',
    glowColor: 'rgba(45,140,255,0.12)',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const { isLowEnd } = useDevicePerformance()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ghost text clip reveal
      gsap.fromTo('.ghost-fitur',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.feat-title-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.feat-title-inner', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.feat-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.feat-sub', start: 'top 85%', once: true } }
      )
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 88%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="relative py-16 px-4 md:py-32 md:px-8 overflow-hidden">
      {/* BG glow */}
      {!isLowEnd && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-[500px] h-[500px] rounded-full top-[20%] left-[10%] feat-glow"
            style={{ background: 'radial-gradient(circle, rgba(45,140,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-[10%] right-[15%] feat-glow"
            style={{ background: 'radial-gradient(circle, rgba(127,211,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
      )}

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="ghost-fitur select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(45,140,255,0.07)', lineHeight: 0.85 }}>
          FITUR
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <div className="overflow-hidden mb-4 inline-block">
            <span className="feat-title-inner block text-xs font-semibold uppercase tracking-[0.25em] text-primary">Features</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="feat-title-inner text-[clamp(2rem,4.5vw,3.2rem)] font-[800] tracking-tight text-foreground">
              Fitur yang Bikin <span className="text-primary">Nggak Bisa Lepas</span>
            </h2>
          </div>
          <p className="feat-sub text-muted-foreground text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
            Semua yang kamu butuhin buat ngobrol — ada di sini, tanpa kompromi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={el => cardsRef.current[i] = el}
              className="feat-card glass-card group relative rounded-3xl p-6 md:p-8 lg:p-10 cursor-default hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative mb-6 inline-flex">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center`}
                  style={{ boxShadow: `0 8px 24px ${f.glowColor}` }}>
                  <f.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="relative">
                <h3 className="text-[1.15rem] font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-primary text-[0.85rem] font-semibold mb-3 opacity-80">{f.subtitle}</p>
                <p className="text-muted-foreground text-[0.95rem] leading-[1.7]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
