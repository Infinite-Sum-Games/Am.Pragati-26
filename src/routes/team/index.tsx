import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "../../components/team/ProfileCard";
import { RadianceLoader } from "../../components/ui/RadianceLoader";

export const Route = createFileRoute('/team/')({
  component: TeamsPage,
})

type TeamMember = {
  name: string;
  role?: string;
  dept?: string;
  year?: number;
  tagline?: string;
  contactEmail?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  image: string;
};

type TeamData = {
  name: string;
  members: TeamMember[];
};

function TeamsPage() {
  const [jsonData, setJsonData] = useState<{ [key: string]: TeamData }>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [verticals, setVerticals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Navigation Logic
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < verticals.length - 1) setActiveIndex(prev => prev + 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching data from public/Assets/team.json
        const response = await fetch("/Assets/team.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = (await response.json()) as Record<string, TeamData>;
        
        const all = Object.values(data).reduce<TeamMember[]>(
          (acc, team) => acc.concat(team.members ?? []),
          [],
        );

        const dataWithAll = {
          ALL: { name: "Our", members: all },
          ...data,
        };

        setJsonData(dataWithAll);
        setVerticals(Object.keys(dataWithAll));
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !jsonData || Object.keys(jsonData).length === 0) {
    return <RadianceLoader />;
  }

  const currentVertical = verticals[activeIndex];
  const currentData = jsonData[currentVertical];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative flex flex-col items-center font-vcr selection:bg-retro-cyan selection:text-black">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-black via-[#1a0733] to-black" />

          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,216,0.9)_1px,transparent_1px),radial-gradient(circle_at_80%_30%,rgba(45,226,230,0.9)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(255,122,24,0.9)_1px,transparent_1px)] bg-size-[180px_180px]" />
          
          {/* Moving Grid Floor */}
          <motion.div 
             animate={{ backgroundPosition: ["0px 0px", "0px 60px"] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-0 w-full h-[45vh] opacity-20"
             style={{ 
                 perspective: "500px",
                 transform: "rotateX(60deg) translateY(100px) scale(2)",
                 backgroundImage: "linear-gradient(90deg, #2de2e6 1px, transparent 1px), linear-gradient(#2de2e6 1px, transparent 1px)",
                 backgroundSize: "60px 60px",
                 maskImage: "linear-gradient(to bottom, transparent, black)"
             }} 
          />

          <div className="absolute inset-0 opacity-[0.03] z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,6px_100%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center min-h-screen pb-20">
          
          {/* Header */}
          <header className="mt-8 mb-12 text-center px-4 relative">
              <motion.h1 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                className="text-5xl md:text-7xl font-black text-retro-yellow drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] tracking-tighter uppercase"
              >
                  RADIANCE
              </motion.h1>
              <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.5, duration: 1 }}
                className="text-retro-cyan text-lg md:text-xl font-bold tracking-[0.5em] mt-2 uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
              >
                  Pragati '26
              </motion.p>
          </header>

          {/* Navigation Tabs */}
          <motion.nav 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12 sticky top-4 z-40"
          >
            {/* Mobile Nav */}
            <div className="lg:hidden relative flex items-center justify-between gap-4 bg-black/60 backdrop-blur-sm p-3 rounded-sm border-2 border-retro-cyan/50">
             <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-retro-cyan" />
             <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-retro-cyan" />
             <button type="button" onClick={handlePrev} disabled={activeIndex === 0} className="p-3 text-retro-cyan disabled:opacity-30"><IoArrowBack /></button>
                <div className="flex-1 text-center font-bold text-white uppercase tracking-wider text-sm">
               {verticals[activeIndex]} <span className="text-retro-pink">•</span> TEAM
                </div>
             <button type="button" onClick={handleNext} disabled={activeIndex === verticals.length - 1} className="p-3 text-retro-cyan disabled:opacity-30"><IoArrowForward /></button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex flex-wrap justify-center gap-4 py-2">
                {verticals.map((name, index) => (
                    <button
                    type="button"
                        key={name}
                        onClick={() => setActiveIndex(index)}
                        className={`relative px-8 py-3 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300 border-2 ${
                          activeIndex === index 
                            ? 'bg-[#7c3aed] border-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)]' 
                            : 'bg-black/40 border-retro-cyan/50 text-retro-cyan hover:border-retro-pink hover:text-retro-pink'
                        } backdrop-blur-sm group`}
                    >   
                        {/* Corner pixels */}
                        {activeIndex !== index && (
                          <>
                            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-retro-cyan group-hover:bg-retro-pink" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-retro-cyan group-hover:bg-retro-pink" />
                          </>
                        )}
                        {name}
                    </button>
                ))}
            </div>
          </motion.nav>

          {/* Title with Glitch Effect */}
          <div className="w-full max-w-7xl px-6 mb-8 flex items-center gap-4 overflow-hidden">
            <div className="h-0.5 flex-1 bg-linear-to-r from-transparent to-retro-cyan/30" />
               <AnimatePresence mode='wait'>
                    <motion.h2 
                        key={currentVertical}
                        initial={{ opacity: 0, x: -20, skewX: -20 }}
                        animate={{ opacity: 1, x: 0, skewX: 0 }}
                        exit={{ opacity: 0, x: 20, skewX: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-4xl text-white font-bold uppercase tracking-widest text-center drop-shadow-[2px_2px_0px_rgba(45,226,230,0.8)]"
                    >
                        {currentData?.name} <span className="text-retro-pink">Team</span>
                    </motion.h2>
               </AnimatePresence>
                     <div className="h-0.5 flex-1 bg-linear-to-l from-transparent to-retro-cyan/30" />
          </div>

          {/* Cards */}
          <section className="w-full max-w-7xl mx-auto px-4 pb-20" {...swipeHandlers}>
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentVertical}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
                >
                    {currentData?.members.map((member, index) => (
                      <motion.div
                        key={`${member.name}-${index}`}
                            variants={{
                                hidden: { opacity: 0, y: 20, scale: 0.9 },
                                show: { opacity: 1, y: 0, scale: 1 }
                            }}
                          className="w-full flex justify-center perspective-[1000px]"
                      >
                      <ProfileCard
                          name={member.name}
                          dept={member.dept}
                          year={member.year}
                          tagline={member.tagline}
                          contactEmail={member.contactEmail}
                          instagram={member.instagram}
                          linkedin={member.linkedin}
                          github={member.github}
                          image={member.image}
                          role={member.role}
                      />
                    </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

                {currentData?.members.length === 0 && (
                <div className="w-full text-center text-gray-500 py-20 font-mono">
                    [ NO SIGNAL DETECTED ]
                </div>
            )}
          </section>

      </div>
    </div>
  );
}