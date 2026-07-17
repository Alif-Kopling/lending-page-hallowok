export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />
      <div className="glass-card py-6 md:py-8 px-4 md:px-8 rounded-none">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <img src="/logo.webp" alt="Hallo Wok logo" className="w-5 h-5 rounded object-cover" loading="lazy" decoding="async" />
            <span className="font-semibold text-foreground">&copy; 2026 Hallo Wok</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground transition-colors no-underline">Privasi</a>
            <a href="#" className="hover:text-foreground transition-colors no-underline">Syarat</a>
            <a href="#" className="hover:text-foreground transition-colors no-underline">Support</a>
            <a href="#" className="hover:text-foreground transition-colors no-underline">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
