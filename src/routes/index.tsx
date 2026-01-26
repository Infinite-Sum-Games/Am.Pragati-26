import { createFileRoute } from '@tanstack/react-router'
import About from '@/components/home/About'
import GallerySection from '@/components/home/GallerySection'
import HeroSection from '@/components/home/hero-section'
import Navbar from '@/components/Navbar'

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <HeroSection />
      <About />
      <GallerySection />
    </div>
  );
}
