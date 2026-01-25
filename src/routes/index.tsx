import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '@/components/hero-section'
import Navbar from '@/components/Navbar'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <HeroSection />
      {/* Other sections go here
      like About, Events, Team, Sponsors, FAQ, Footer */}
    </div>
  )
}
