import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const Features = lazy(() => import('./components/Features'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const Showcase = lazy(() => import('./components/Showcase'))
const CTA = lazy(() => import('./components/CTA'))
const Developers = lazy(() => import('./components/Developers'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return <div className="h-32" />
}

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-off-white font-sans">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Showcase />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Developers />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}
