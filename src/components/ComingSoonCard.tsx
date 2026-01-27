import { useCountdown } from '../hooks/useCountdown'
import type { ComingSoonCardProps } from '../types/comingSoonTypes'
import { motion } from "framer-motion";

export default function ComingSoonCard({
  targetDate,
  eventTitle = "PRAGATI '26",
  subtitle = 'COMING SOON',
  avatarSrc = 'https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA15lDZB7A8rw7ncvuMsAbNajoyg3PxkVXmhJ1p',
  backgroundSrc = 'https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA1MQWzuniYTK9mleh6Z8jb0Lvy3H5oDOXGgxap'
}: ComingSoonCardProps) {
  const timeLeft = useCountdown(targetDate)

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0')
  }

  const SponsorBadge = ({ title, logo, color, borderColor }: any) => (
    <div className="flex flex-col items-center group">
      <div className="flex items-center gap-2 mb-1">
        <div className={`h-0.5 w-3 md:w-6 ${color} shadow-[0_0_10px_currentColor]`} />
        <span className={`font-vcr text-[9px] md:text-xs ${color} tracking-widest drop-shadow-[0_0_5px_currentColor] whitespace-nowrap`}>
          {title}
        </span>
      </div>
      <div className={`relative p-1.5 md:p-2 bg-black/30 border-l-2 ${borderColor} backdrop-blur-sm rounded-tr-lg`}>
        <img src={logo} alt={title} className="h-6 md:h-10 w-auto object-contain drop-shadow-md" />
        <div className={`absolute top-0 right-0 w-1 h-1 md:w-1.5 md:h-1.5 ${color.replace('text-', 'bg-')}`} />
      </div>
    </div>
  );

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url(${backgroundSrc})`, backgroundColor: '#0a0a1a', fontFamily: "'Orbitron', 'Roboto', sans-serif" }}
    >
      <div className="hidden md:flex absolute top-0 left-0 z-30 w-full max-w-2xl p-8 flex-row items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <SponsorBadge title="ORGANIZED BY" logo="/logos/ASB.webp" color="text-retro-pink" borderColor="border-retro-pink/50" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
          <SponsorBadge title="TITLE SPONSOR" logo="/logos/BNY.webp" color="text-retro-cyan" borderColor="border-retro-cyan/50" />
        </motion.div>
      </div>
      <div className="relative flex flex-col items-center justify-center w-187.5 h-112.5 max-md:w-11/12 max-md:scale-75 mt-28">
        <div className="w-125 h-50 flex justify-center items-center relative rounded-2xl border-[5px] z-10 neon-card-border neon-card-bg neon-card-shadow-thick -left-20 max-md:left-0">
          <div className="text-center">
            <h1 className="m-0 leading-relaxed text-4xl tracking-wide neon-orange max-md:text-4xl" style={{ fontFamily: "'Press Start 2P', 'VT323', monospace", textShadow: '4px 4px 0px #000' }}>
              {eventTitle}
            </h1>
            <h2 className="mt-4 uppercase tracking-[0.2em] text-3xl font-bold neon-cyan-glow max-md:text-3xl" style={{ fontFamily: "'Orbitron', 'Roboto', sans-serif" }}>
              {subtitle}
            </h2>
          </div>
        </div>

        {avatarSrc && (
          <img 
            src={avatarSrc} 
            alt="Event Mascot" 
            className="absolute -right-20 -top-20 z-20 max-md:-right-15" 
            style={{ height: '580px', width: 'auto', filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.8))' }}
          />
        )}

        <div className="mt-10 rounded-lg px-5 py-2.5 bg-[#111] border-2 border-[#333] z-5" style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)' }}>
          <div className="font-bold tracking-[0.15em] flex items-center gap-2 text-3xl neon-cyan-glow max-md:text-xl" style={{ fontFamily: "'Courier New', 'Press Start 2P', monospace" }}>
            <span>{formatTime(timeLeft.days)}d</span>
            <span>:</span>
            <span>{formatTime(timeLeft.hours)}h</span>
            <span>:</span>
            <span>{formatTime(timeLeft.minutes)}m</span>
            <span>:</span>
            <span>{formatTime(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>
    </div>
  )
}
