import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const row1Images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop', caption: 'Opening Night', colorClass: 'bg-pink-500' },
  { id: 2, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop', caption: 'Main Stage', colorClass: 'bg-cyan-400' },
  { id: 3, src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&h=400&fit=crop', caption: 'The Crowd', colorClass: 'bg-yellow-400' },
  { id: 4, src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=400&fit=crop', caption: 'Live Show', colorClass: 'bg-fuchsia-600' },
  { id: 5, src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&h=400&fit=crop', caption: 'Dance Floor', colorClass: 'bg-teal-400' },
  { id: 6, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=400&fit=crop', caption: 'Concert Vibes', colorClass: 'bg-violet-500' },
]

const row2Images = [
  { id: 7, src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=400&fit=crop', caption: 'Night Sky', colorClass: 'bg-cyan-400' },
  { id: 8, src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=400&fit=crop', caption: 'Festival Fun', colorClass: 'bg-pink-500' },
  { id: 9, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=400&fit=crop', caption: 'Memories', colorClass: 'bg-yellow-400' },
  { id: 10, src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop', caption: 'Backstage', colorClass: 'bg-fuchsia-600' },
  { id: 11, src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&h=400&fit=crop', caption: 'Spotlight', colorClass: 'bg-teal-400' },
  { id: 12, src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&h=400&fit=crop', caption: 'Energy', colorClass: 'bg-violet-500' },
]

type Phase = 'loading' | 'exploding' | 'complete'
type ImageType = (typeof row1Images)[0]

const DISCO_COLOR_CLASSES = ['bg-pink-500', 'bg-yellow-400', 'bg-cyan-400', 'bg-fuchsia-600', 'bg-teal-400', 'bg-violet-500']

function ColorfulDiscoBall({ phase }: { phase: Phase }) {
  return (
    <motion.div
      className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]"
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
              className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 left-1/2 top-1/2 -ml-1 -mt-1 rounded-sm ${DISCO_COLOR_CLASSES[(lat + lon) % 6]} animate-pulse shadow-lg`}
              style={{
                transform: `rotateY(${lon * 22.5}deg) rotateX(${lat * 22.5 - 90}deg) translateZ(40px)`,
              }}
            />
          ))
        )}
      </div>
      <div className="absolute -inset-8 rounded-full opacity-50 blur-3xl bg-gradient-conic from-pink-500 via-yellow-400 via-cyan-400 via-fuchsia-600 via-teal-400 to-violet-500 animate-spin" />
    </motion.div>
  )
}

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
            className={`absolute rounded-full w-2 h-2 sm:w-3 sm:h-3 ${DISCO_COLOR_CLASSES[i % 6]} shadow-lg`}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * velocity,
              y: Math.sin(angle) * velocity,
              scale: [1, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, delay: Math.random() * 0.15, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

const getImageAnimationParams = (id: number) => {
  const seed = id * 1.618033988749895
  return {
    rotation: -4 + (seed % 8),
    swingDelay: (seed * 0.7) % 2,
    swingDuration: 3 + (seed * 0.5) % 2,
  }
}

function PolaroidCard({ 
  image, 
  cardRef,
}: { 
  image: ImageType
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const { rotation, swingDelay, swingDuration } = getImageAnimationParams(image.id)

  return (
    <div 
      ref={cardRef}
      className="flex-shrink-0 group relative pt-6 polaroid-card will-change-transform"
      data-color-class={image.colorClass}
      style={{
        transformOrigin: 'top center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <motion.div
        animate={{
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: swingDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: swingDelay,
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <div 
          className="thread-container absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: 'calc(-3.5rem - var(--thread-extra, 0px) - var(--thread-scale-compensation, 0px))',
            height: 'calc(4.5rem + var(--thread-extra, 0px) + var(--thread-scale-compensation, 0px))',
          }}
        >
          <div className="w-0.5 h-full bg-amber-700 rounded-full" />
        </div>
        
        <motion.div
          className="relative group-hover:z-50 polaroid-frame"
          style={{ transform: `rotate(${rotation}deg)` }}
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          <div 
            className="p-2 sm:p-3 shadow-xl w-48 sm:w-56 md:w-64 lg:w-72 relative pt-4 sm:pt-5"
            style={{
              backgroundColor: '#e8dcc8',
              boxShadow: 'inset 0 0 20px rgba(139, 90, 43, 0.15), 0 4px 20px rgba(0,0,0,0.3)',
            }}
          >

            <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
              <div className="absolute inset-0 rounded-full border border-gray-300" />
            </div>
            
            <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rotate-45">
              <div className="relative">
                <div className="w-5 h-3 sm:w-6 sm:h-4 relative">
                  <div className="absolute left-0 top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] bg-transparent" 
                       style={{ borderColor: '#b45309' }} />
                  <div className="absolute right-0 top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] bg-transparent"
                       style={{ borderColor: '#d97706' }} />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-amber-900 shadow-sm" />
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 mt-3 sm:mt-4">
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 left-[10%] right-[10%] h-4 sm:h-6 blur-lg opacity-50 bg-gradient-radial from-black/40 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}

function InfiniteScrollRow({
  images,
  direction,
}: {
  images: ImageType[]
  direction: 'left' | 'right'
}) {
  const duplicatedImages = [...images, ...images, ...images]
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionRef = useRef(direction === 'left' ? 0 : -33.33)
  const animationRef = useRef<number | undefined>(undefined)
  const containerCacheRef = useRef<{ centerX: number; maxDistance: number } | null>(null)

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

  const updateScales = useCallback(() => {
    const cache = containerCacheRef.current
    if (!cache) return

    const cardCount = cardRefs.current.length
    for (let i = 0; i < cardCount; i++) {
      const card = cardRefs.current[i]
      if (!card) continue

      const cardRect = card.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2
      
      const distanceFromCenter = Math.abs(cardCenterX - cache.centerX)
      const normalizedDistance = Math.min(distanceFromCenter / cache.maxDistance, 1)
      const scale = 1.15 - normalizedDistance * 0.6
      const opacity = 1 - normalizedDistance * 0.4
      const zIndex = Math.floor((1 - normalizedDistance) * 20)

      card.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) translateZ(0)`
      card.style.opacity = opacity.toFixed(4)
      card.style.zIndex = String(zIndex)
      
      const threadExtra = normalizedDistance * 60
      const scaleCompensation = (1 - normalizedDistance) * 20
      card.style.setProperty('--thread-extra', `${threadExtra.toFixed(2)}px`)
      card.style.setProperty('--thread-scale-compensation', `${scaleCompensation.toFixed(2)}px`)

      const frame = card.querySelector('.polaroid-frame > div') as HTMLElement
      if (frame) {
        if (normalizedDistance < 0.3) {
          frame.classList.add('shadow-2xl')
          frame.classList.remove('shadow-xl')
        } else {
          frame.classList.add('shadow-xl')
          frame.classList.remove('shadow-2xl')
        }
      }
    }
  }, [])

  useEffect(() => {
    const speed = 0.15
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime

      if (direction === 'left') {
        positionRef.current -= speed * delta * 0.01
        positionRef.current = ((positionRef.current % 33.33) + 33.33) % 33.33 - 33.33
      } else {
        positionRef.current += speed * delta * 0.01
        positionRef.current = ((positionRef.current % 33.33) + 33.33) % 33.33 - 33.33
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}%, 0, 0)`
      }

      updateScales()

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [direction, updateScales])

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  return (
    <div className="relative overflow-hidden py-8 sm:py-10 md:py-12" ref={containerRef}>
      <div className="absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-transparent via-amber-700/90 to-transparent shadow-md" />

      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-40 z-30 pointer-events-none bg-gradient-to-r from-[#0f0f2e] via-[#0f0f2e]/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-40 z-30 pointer-events-none bg-gradient-to-l from-[#0f0f2e] via-[#0f0f2e]/80 to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-1 items-end w-fit"
      >
        {duplicatedImages.map((image, idx) => (
          <PolaroidCard 
            key={`${image.id}-${idx}`} 
            image={image} 
            cardRef={setCardRef(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export function GallerySection() {
  const [phase, setPhase] = useState<Phase>('loading')
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
    <section 
      ref={sectionRef} 
      className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[750px] overflow-hidden py-8 sm:py-10 md:py-12 bg-[#0f0f2e]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-48 h-48 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px] opacity-30 -top-[10%] sm:-top-[15%] md:-top-[20%] -left-[5%] sm:-left-[8%] md:-left-[10%] bg-gradient-to-br from-pink-500 to-fuchsia-600" />
        <div className="absolute w-40 h-40 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px] opacity-30 -bottom-[10%] sm:-bottom-[15%] md:-bottom-[20%] -right-[5%] sm:-right-[8%] md:-right-[10%] bg-gradient-to-br from-cyan-400 to-violet-500" />
        <div className="absolute w-64 h-32 sm:w-[500px] sm:h-[250px] md:w-[600px] md:h-[300px] lg:w-[800px] lg:h-[400px] rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${DISCO_COLOR_CLASSES[i % 6]} animate-pulse shadow-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {(phase === 'loading' || phase === 'exploding') && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0f0f2e]/95"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ColorfulDiscoBall phase={phase} />
            <ExplosionParticles active={phase === 'exploding'} />
            {phase === 'loading' && (
              <motion.p
                className="mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm tracking-widest text-yellow-400/70"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading Memories...
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <motion.div
              className="text-center mb-4 sm:mb-5 md:mb-6 px-4"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Moments That Shine
              </h2>
            </motion.div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <InfiniteScrollRow images={row1Images} direction="left" />
              <InfiniteScrollRow images={row2Images} direction="right" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default GallerySection
