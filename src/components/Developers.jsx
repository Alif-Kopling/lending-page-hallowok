import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevicePerformance } from '../hooks/useDevicePerformance'

const developers = [
  {
    name: 'Alxyzz',
    role: 'Frontend Developer',
    bio: 'Berikan aku seporsi nasgor maka akan ku tunjukan cara membuat website 💻',
    avatar: 'https://avatars.githubusercontent.com/u/197850978?v=4',
    github: 'https://github.com/Alif-Kopling',
    username: 'Alif-Kopling',
  },
  {
    name: 'Yanz',
    role: 'Backend Developer',
    bio: 'Building the backbone of real-time chat infrastructure.',
    avatar: 'https://avatars.githubusercontent.com/u/221985627?v=4',
    github: 'https://github.com/Todzxx',
    username: 'Todzxx',
  },
]

export default function Developers() {
  const sectionRef = useRef(null)
  const { isLowEnd } = useDevicePerformance()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ghost-dev',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo('.dev-title-inner',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.dev-title-inner', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.dev-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.15,
          scrollTrigger: { trigger: '.dev-card', start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="developers" className="relative py-20 px-4 md:py-32 md:px-8 overflow-hidden">
      {!isLowEnd && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(circle, rgba(45,140,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="ghost-dev select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 14vw, 12rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(45,140,255,0.05)', lineHeight: 0.85 }}>
          DEVELOPER
        </span>
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="overflow-hidden mb-4 inline-block">
            <span className="dev-title-inner block text-xs font-semibold uppercase tracking-[0.25em] text-primary">Tim</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="dev-title-inner text-[clamp(1.8rem,4.5vw,3rem)] font-[800] tracking-tight text-foreground">
              Behind <span className="text-primary">Hallo Wok</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {developers.map((dev) => (
            <a key={dev.username} href={dev.github} target="_blank" rel="noopener noreferrer"
              className="dev-card glass-card-strong rounded-3xl p-6 md:p-7 relative overflow-hidden group cursor-pointer no-underline transition-all hover:-translate-y-1 block"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(45,140,255,0.08) 0%, transparent 70%)' }} />

              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img src={dev.avatar} alt={dev.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                    style={{ border: '2px solid rgba(45,140,255,0.25)', boxShadow: '0 4px 20px rgba(45,140,255,0.15)' }}
                    loading="lazy" decoding="async" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(45,140,255,0.6) 0%, rgba(127,211,255,0.4) 100%)', boxShadow: '0 2px 8px rgba(45,140,255,0.3)' }}>
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-foreground font-bold text-base leading-tight">{dev.name}</h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-0.5">{dev.role}</p>
                  <p className="text-muted-foreground text-xs mt-2 leading-relaxed line-clamp-2">{dev.bio}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/20 flex items-center gap-2">
                <span className="text-muted-foreground/60 text-xs">@{dev.username}</span>
                <span className="ml-auto text-primary/50 text-xs font-medium group-hover:text-primary transition-colors">View Profile →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
