import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

// Retro Synthwave Color Palette (matching PRAGATI'26 theme)
const THEME = {
  bg: '#0f0f2e',
  bgLight: '#1a1a3e',
  gold: '#FFD700',
  goldDark: '#E5A000',
  pink: '#FF69B4',
  magenta: '#C850C0',
  cyan: '#00CED1',
  teal: '#40E0D0',
  purple: '#8B5CF6',
  violet: '#9400D3',
}

// Gallery images - 2 rows of 6 images each
const row1Images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop', caption: 'Opening Night', color: THEME.pink },
  { id: 2, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop', caption: 'Main Stage', color: THEME.cyan },
  { id: 3, src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&h=400&fit=crop', caption: 'The Crowd', color: THEME.gold },
  { id: 4, src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=400&fit=crop', caption: 'Live Show', color: THEME.magenta },
  { id: 5, src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&h=400&fit=crop', caption: 'Dance Floor', color: THEME.teal },
  { id: 6, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=400&fit=crop', caption: 'Concert Vibes', color: THEME.purple },
]

const row2Images = [
  { id: 7, src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=400&fit=crop', caption: 'Night Sky', color: THEME.cyan },
  { id: 8, src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=400&fit=crop', caption: 'Festival Fun', color: THEME.pink },
  { id: 9, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=400&fit=crop', caption: 'Memories', color: THEME.gold },
  { id: 10, src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop', caption: 'Backstage', color: THEME.magenta },
  { id: 11, src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=400&fit=crop', caption: 'Spotlight', color: THEME.teal },
  { id: 12, src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&h=400&fit=crop', caption: 'Energy', color: THEME.purple },
]

type Phase = 'loading' | 'exploding' | 'complete'
type ImageType = (typeof row1Images)[0]

const DISCO_COLORS = [THEME.pink, THEME.gold, THEME.cyan, THEME.magenta, THEME.teal, THEME.purple]

// Colorful 3D Disco Ball
function ColorfulDiscoBall({ phase }: { phase: Phase }) {
  return (
    <motion.div
      className="relative w-[100px] h-[100px]"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      animate={
        phase === 'exploding'
          ? { scale: [1, 1.8, 0], rotateY: 720, rotateX: 360 }
          : { rotateY: 360 }
      }
      transition={
        phase === 'exploding'
          ? { duration: 1, ease: [0.23, 1, 0.32, 1] }
          : { duration: 5, repeat: Infinity, ease: 'linear' }
      }
    >
      <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(8)].map((_, lat) =>
          [...Array(16)].map((_, lon) => (
            <div
              key={`${lat}-${lon}`}
              className="absolute w-2 h-2 left-1/2 top-1/2 -ml-1 -mt-1 rounded-sm"
              style={{
                transform: `rotateY(${lon * 22.5}deg) rotateX(${lat * 22.5 - 90}deg) translateZ(40px)`,
                background: `linear-gradient(135deg, ${DISCO_COLORS[(lat + lon) % 6]} 0%, ${DISCO_COLORS[(lat + lon + 1) % 6]} 100%)`,
                animation: 'tileFlash 0.6s ease-in-out infinite alternate',
                animationDelay: `${(lat + lon) * 0.03}s`,
                boxShadow: `0 0 8px ${DISCO_COLORS[(lat + lon) % 6]}`,
              }}
            />
          ))
        )}
      </div>
      <div
        className="absolute -inset-8 rounded-full opacity-50 blur-[30px]"
        style={{
          background: `conic-gradient(from 0deg, ${THEME.pink}, ${THEME.gold}, ${THEME.cyan}, ${THEME.magenta}, ${THEME.teal}, ${THEME.purple}, ${THEME.pink})`,
          animation: 'rainbowSpin 3s linear infinite',
        }}
      />
    </motion.div>
  )
}

// Explosion Particles
function ExplosionParticles({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="absolute">
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const velocity = 120 + Math.random() * 150
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * velocity,
              y: Math.sin(angle) * velocity,
              scale: [1, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, delay: Math.random() * 0.15, ease: 'easeOut' }}
            style={{
              width: 8 + Math.random() * 10,
              height: 8 + Math.random() * 10,
              background: DISCO_COLORS[i % 6],
              boxShadow: `0 0 15px ${DISCO_COLORS[i % 6]}`,
            }}
          />
        )
      })}
    </div>
  )
}

// Polaroid Card - receives dynamic scale from parent
function PolaroidCard({ 
  image, 
  onClick, 
  cardRef,
}: { 
  image: ImageType
  onClick: () => void
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const rotation = useRef(-4 + Math.random() * 8).current
  const baseWidth = 280

  return (
    <div 
      ref={cardRef}
      className="flex-shrink-0 cursor-pointer group relative pt-10 polaroid-card" 
      onClick={onClick}
      data-color={image.color}
    >
      {/* Rope/String */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px]"
        style={{
          top: '-12px',
          height: '52px',
          background: 'linear-gradient(to bottom, rgba(160,100,50,1) 0%, rgba(139,90,43,0.85) 40%, rgba(139,90,43,0.5) 100%)',
          boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Clip */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-6 h-10 rounded-t-md relative"
          style={{
            background: image.color,
            boxShadow: `0 4px 15px ${image.color}60, inset 0 2px 0 rgba(255,255,255,0.3)`,
          }}
        >
          <div
            className="absolute top-2 left-1 right-1 h-3"
            style={{
              background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px)',
            }}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-t" />
        </div>
        <div
          className="w-3 h-3 mx-auto -mt-px rounded-b"
          style={{ background: image.color, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
        />
      </div>

      {/* Polaroid Frame */}
      <motion.div
        className="relative mt-4 group-hover:z-50 polaroid-frame"
        style={{ transform: `rotate(${rotation}deg)` }}
        whileHover={{ rotate: 0, scale: 1.05 }}
      >
        <div
          className="bg-white p-3 shadow-xl"
          style={{ width: `${baseWidth}px` }}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${image.color}60, ${THEME.bg}80)` }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute -bottom-4 left-[10%] right-[10%] h-6 blur-lg opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)' }}
        />
      </motion.div>
    </div>
  )
}

// Infinite Scroll Row with Dynamic Center Focus
function InfiniteScrollRow({
  images,
  direction,
  onImageClick,
}: {
  images: ImageType[]
  direction: 'left' | 'right'
  onImageClick: (img: ImageType) => void
}) {
  const duplicatedImages = [...images, ...images, ...images]
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionRef = useRef(direction === 'left' ? 0 : -33.33)
  const animationRef = useRef<number | undefined>(undefined)
  const frameCountRef = useRef(0)
  const containerCacheRef = useRef<{ centerX: number; maxDistance: number } | null>(null)

  // Cache container dimensions (update on resize)
  useEffect(() => {
    const updateContainerCache = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        containerCacheRef.current = {
          centerX: rect.left + rect.width / 2,
          maxDistance: rect.width / 2,
        }
      }
    }
    
    updateContainerCache()
    window.addEventListener('resize', updateContainerCache)
    return () => window.removeEventListener('resize', updateContainerCache)
  }, [])

  // Update card scales based on position - optimized with batched reads/writes
  const updateScales = useCallback(() => {
    const cache = containerCacheRef.current
    if (!cache) return

    // Batch read all card positions first
    const cardData: { card: HTMLDivElement; cardCenterX: number }[] = []
    cardRefs.current.forEach((card) => {
      if (card) {
        const cardRect = card.getBoundingClientRect()
        cardData.push({ card, cardCenterX: cardRect.left + cardRect.width / 2 })
      }
    })

    // Batch write all styles
    cardData.forEach(({ card, cardCenterX }) => {
      const distanceFromCenter = Math.abs(cardCenterX - cache.centerX)
      const normalizedDistance = Math.min(distanceFromCenter / cache.maxDistance, 1)
      const scale = 1.15 - normalizedDistance * 0.45
      const opacity = 1 - normalizedDistance * 0.4
      const zIndex = Math.round((1 - normalizedDistance) * 20)

      // Use transform3d for GPU acceleration
      card.style.transform = `scale3d(${scale}, ${scale}, 1)`
      card.style.opacity = String(opacity)
      card.style.zIndex = String(zIndex)

      // Enhanced shadow for center cards
      const frame = card.querySelector('.polaroid-frame > div') as HTMLElement
      if (frame) {
        const color = card.dataset.color || THEME.pink
        if (normalizedDistance < 0.3) {
          frame.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 60px ${color}50`
        } else {
          frame.style.boxShadow = `0 10px 30px rgba(0,0,0,0.4), 0 0 30px ${color}30`
        }
      }
    })
  }, [])

  // Animation loop - optimized with throttled scale updates
  useEffect(() => {
    const speed = 0.08 // Balanced speed
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime
      frameCountRef.current++

      // Update position
      if (direction === 'left') {
        positionRef.current -= speed * delta * 0.01
        if (positionRef.current <= -33.33) {
          positionRef.current = 0
        }
      } else {
        positionRef.current += speed * delta * 0.01
        if (positionRef.current >= 0) {
          positionRef.current = -33.33
        }
      }

      // Apply transform with GPU acceleration
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}%, 0, 0)`
      }

      // Throttle scale updates to every 3rd frame for better performance
      if (frameCountRef.current % 3 === 0) {
        updateScales()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [direction, updateScales])

  // Set card ref
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  return (
    <div className="relative overflow-hidden py-8" ref={containerRef}>
      {/* Horizontal Rope Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,90,43,0.8) 5%, rgba(160,100,50,0.9) 50%, rgba(139,90,43,0.8) 95%, transparent 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Gradient overlays for depth effect */}
      <div 
        className="absolute inset-y-0 left-0 w-40 z-30 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${THEME.bg}, ${THEME.bg}80, transparent)` }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-40 z-30 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${THEME.bg}, ${THEME.bg}80, transparent)` }}
      />

      <div
        ref={trackRef}
        className="flex gap-10 pt-1 items-end"
        style={{ width: 'fit-content' }}
      >
        {duplicatedImages.map((image, idx) => (
          <PolaroidCard 
            key={`${image.id}-${idx}`} 
            image={image} 
            onClick={() => onImageClick(image)}
            cardRef={setCardRef(idx)}
          />
        ))}
      </div>
    </div>
  )
}

// Lightbox
function Lightbox({ image, onClose }: { image: ImageType | null; onClose: () => void }) {
  if (!image) return null

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-[1000] p-8"
      style={{ background: `${THEME.bg}ee` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.3, y: 200, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 w-10 h-10 rounded-full text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:rotate-90 hover:scale-110"
          style={{ background: image.color, boxShadow: `0 0 20px ${image.color}` }}
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-12 rounded-t-md z-10"
          style={{ background: image.color, boxShadow: `0 4px 15px ${image.color}60` }}
        />

        <div
          className="bg-white p-5 max-w-[85vw]"
          style={{ boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 150px ${image.color}30` }}
        >
          <img
            src={image.src.replace('w=500&h=400', 'w=1000&h=800')}
            alt={image.caption}
            className="max-w-full max-h-[65vh] object-contain"
          />
          <div className="text-center pt-5">
            <span className="block text-4xl font-semibold text-gray-800" style={{ fontFamily: "'Caveat', cursive" }}>
              {image.caption}
            </span>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.15em] mt-2" style={{ color: THEME.gold }}>
              <Sparkles className="w-4 h-4" />
              <span>PRAGATI&apos;26 • RADIANCE</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Inline keyframe styles
const keyframeStyles = `
  @keyframes tileFlash {
    0% { opacity: 0.5; filter: brightness(0.8); }
    100% { opacity: 1; filter: brightness(1.4); }
  }
  @keyframes rainbowSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 0.8; transform: scale(1); }
  }
  .polaroid-card {
    transition: transform 0.1s linear, opacity 0.1s linear;
    will-change: transform, opacity;
    transform: translate3d(0, 0, 0);
  }
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
`

// Main Gallery Section
export function GallerySection() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            const allImages = [...row1Images, ...row2Images]
            Promise.all(
              allImages.map(
                (img) =>
                  new Promise((resolve) => {
                    const image = new Image()
                    image.src = img.src
                    image.onload = resolve
                    image.onerror = resolve
                  })
              )
            ).then(() => {
              setTimeout(() => setPhase('exploding'), 400)
              setTimeout(() => setPhase('complete'), 1400)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <>
      <style>{keyframeStyles}</style>
      <section ref={sectionRef} className="relative min-h-[750px] overflow-hidden py-12" style={{ background: THEME.bg }}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 -top-[20%] -left-[10%]"
            style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${THEME.magenta} 100%)` }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-30 -bottom-[20%] -right-[10%]"
            style={{ background: `linear-gradient(135deg, ${THEME.cyan} 0%, ${THEME.purple} 100%)` }}
          />
          <div
            className="absolute w-[800px] h-[400px] rounded-full blur-[200px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: THEME.gold }}
          />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: DISCO_COLORS[i % 6],
                animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 4px ${DISCO_COLORS[i % 6]}`,
              }}
            />
          ))}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {(phase === 'loading' || phase === 'exploding') && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
              style={{ background: `${THEME.bg}f5` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ColorfulDiscoBall phase={phase} />
              <ExplosionParticles active={phase === 'exploding'} />
              {phase === 'loading' && (
                <motion.p
                  className="mt-10 text-sm tracking-widest"
                  style={{ color: `${THEME.gold}aa` }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading Memories...
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Content */}
        <AnimatePresence>
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Header */}
              <motion.div
                className="text-center mb-6 px-4"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-3xl md:text-5xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.gold} 0%, ${THEME.pink} 50%, ${THEME.cyan} 100%)`,
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: 'gradientShift 6s ease-in-out infinite',
                    textShadow: `0 0 40px ${THEME.gold}40`,
                  }}
                >
                  Moments That Shine
                </h2>
              </motion.div>

              {/* Infinite Scroll Rows */}
              <div className="space-y-6">
                <InfiniteScrollRow images={row1Images} direction="left" onImageClick={setSelectedImage} />
                <InfiniteScrollRow images={row2Images} direction="right" onImageClick={setSelectedImage} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
        </AnimatePresence>
      </section>
    </>
  )
}

export default GallerySection
