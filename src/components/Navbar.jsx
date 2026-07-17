import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

const FE_REPO = 'https://github.com/wafley/realchat-web/tree/develop'
const BE_REPO = 'https://github.com/wafley/realchat-api/tree/develop'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="glass fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 md:py-4 rounded-none"
      style={{ borderBottom: '1px solid var(--glass-border)' }}
    >
      <div className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <img src="/logo.webp" alt="Hallo Wok logo" className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover" loading="eager" decoding="async" />
          <span className="text-base md:text-lg font-bold text-foreground tracking-tight">Hallo Wok</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium no-underline">Features</a></li>
          <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium no-underline">How It Works</a></li>
          <li><a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium no-underline">Preview</a></li>
          <li><a href="#developers" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium no-underline">Developers</a></li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href={BE_REPO} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href={FE_REPO} target="_blank" rel="noopener noreferrer"
            className="inline-block border-none px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 glass-card no-underline"
            style={{
              background: 'linear-gradient(135deg, rgba(45,140,255,0.4) 0%, rgba(79,168,255,0.2) 100%)',
              color: '#7FD3FF',
              boxShadow: '0 4px 16px rgba(45,140,255,0.2)',
            }}
          >
            Lihat Source Code
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden border-none bg-transparent p-2 text-foreground cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 pb-2 border-t border-border/30">
          <ul className="list-none m-0 p-0 space-y-1 pt-3">
            <li><a href="#features" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-sm font-medium no-underline">Features</a></li>
            <li><a href="#how-it-works" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-sm font-medium no-underline">How It Works</a></li>
            <li><a href="#showcase" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-sm font-medium no-underline">Preview</a></li>
            <li><a href="#developers" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-sm font-medium no-underline">Developers</a></li>
          </ul>
          <div className="flex gap-2 mt-3">
            <a href={BE_REPO} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border-none px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer glass-card no-underline text-muted-foreground hover:text-foreground transition-colors">
              Backend
            </a>
            <a href={FE_REPO} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center border-none px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer glass-card no-underline"
              style={{
                background: 'linear-gradient(135deg, rgba(45,140,255,0.4) 0%, rgba(79,168,255,0.2) 100%)',
                color: '#7FD3FF',
              }}
            >
              Frontend
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
