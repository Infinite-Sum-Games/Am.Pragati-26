import { createFileRoute } from "@tanstack/react-router";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/Navbar";
import About from "@/components/home-page/About";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <About />
      {/* Other sections go here
      like About, Events, Team, Sponsors, FAQ, Footer */}
      <GallerySection />
    </div>
  );
}
