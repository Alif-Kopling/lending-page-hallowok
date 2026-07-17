import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Download, UserPlus, MessageCircle } from 'lucide-react'
import { useDevicePerformance } from '../hooks/useDevicePerformance'

const steps = [
  {
    num: '01',
    icon: Download,
    title: 'Download APK',
    desc: 'Pakai Android? Download APK-nya langsung. Windows atau Mac? Buka lewat web resmi — gratis, tanpa ribet.',
  },
  {
    num: '02',
    icon: UserPlus,
    title: 'Buat Profil',
    desc: 'Masukin nama, pilih avatar. Nggak perlu nomor HP.',
  },
  {
    num: '03',
    icon: MessageCircle,
    title: 'Mulai Ngobrol',
    desc: 'Ajak temen, bikin grup. Percakapan real-time langsung jalan.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const { isLowEnd } = useDevicePerformance()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ghost-langkah',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.how-title-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.how-title-inner', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.how-step',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15,
          scrollTrigger: { trigger: '.how-steps', start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-16 px-4 md:py-32 md:px-8 overflow-hidden">
      {!isLowEnd && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-[400px] h-[400px] rounded-full top-[30%] right-[5%]"
            style={{ background: 'radial-gradient(circle, rgba(45,140,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
      )}

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="ghost-langkah select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(7rem, 18vw, 16rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(45,140,255,0.06)', lineHeight: 0.85 }}>
          LANGKAH
        </span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <div className="overflow-hidden mb-4 inline-block">
            <span className="how-title-inner block text-xs font-semibold uppercase tracking-[0.25em] text-primary">How It Works</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="how-title-inner text-[clamp(2rem,4.5vw,3.2rem)] font-[800] tracking-tight text-foreground">
              Cara Pakai <span className="text-primary">Hallo Wok</span>
            </h2>
          </div>
          <p className="how-title-inner text-muted-foreground text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
            Mulai dari nol sampai siap ngobrol — cuma butuh 3 langkah.
          </p>
        </div>

        {/* Timeline */}
        <div className="how-steps relative">
          {/* Vertical line */}
          <div className="absolute left-[21px] md:left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" aria-hidden="true" />

          {steps.map((s) => (
            <div key={s.num} className="how-step relative flex items-start gap-5 md:gap-8 mb-10 md:mb-14 last:mb-0">
              {/* Number circle */}
              <div className="relative z-10 shrink-0">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xs md:text-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(45,140,255,0.4) 0%, rgba(127,211,255,0.2) 100%)',
                    color: '#7FD3FF',
                    border: '1px solid rgba(127,211,255,0.2)',
                    boxShadow: '0 4px 20px rgba(45,140,255,0.25)',
                  }}>
                  {s.num}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 glass-card rounded-2xl p-5 md:p-7 hover:-translate-y-0.5 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  <h3 className="text-[1.1rem] font-bold text-foreground">{s.title}</h3>
                </div>
                <p className="text-muted-foreground text-[0.95rem] leading-[1.7]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
