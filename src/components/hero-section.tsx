import { motion } from "framer-motion";

function HeroSection() {
  const stats = [
    { label: "Events", value: "30+" },
    { label: "Participants", value: "500+" },
    { label: "Colleges", value: "15+" }, 
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/herobg2.png')" }} // Updated to .jpg as per your upload
      >
        {/* Optional: Darker overlay only at the very top to make text pop */}
        {/* <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" /> */}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 md:pt-40">
        
        {/* PRAGATI '26 Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative"
        >
          {/* Added a heavier drop shadow to separate text from the starry sky */}
          <h1 className="font-jersey15 text-9xl md:text-[160px] lg:text-[192px] text-retro-yellow drop-shadow-[4px_4px_0px_rgba(168,85,247,0.8)] tracking-tighter uppercase leading-none">
            Pragati' 26
          </h1>
          
          {/* Tagline Image */}
          <motion.img 
            src="/radience-text.png" 
            alt="Radiance"
            className="w-48 md:w-72 lg:w-80 mx-auto -mt-4 md:-mt-6 lg:-mt-8 transform -rotate-3 filter drop-shadow-lg"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: -3 }}
            transition={{ delay: 0.3, type: "spring" }}
          />
        </motion.div>

        {/* Updated CTA Button - Neon Pink to match the music notes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 md:mt-32"
        >
          <button className="relative px-8 py-3 bg-[#2d1b4e] border-4 border-[#ff00ff] text-[#ff00ff] font-vcr text-xl md:text-2xl uppercase tracking-widest hover:bg-[#ff00ff] hover:text-white transition-all duration-200 shadow-[0_0_20px_rgba(255,0,255,0.6)] hover:shadow-[0_0_40px_rgba(255,0,255,0.8)] active:scale-95 cursor-pointer">
            <span className="drop-shadow-md">Explore Events</span>
          </button>
        </motion.div>

        {/* NEW: Arcade Stats Section */}
        <motion.div 
          className="mt-16 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Pixel box container for the number */}
              <div className="relative bg-black/40 border-2 border-retro-cyan/50 p-4 rounded-sm backdrop-blur-sm group-hover:border-[#ff00ff] group-hover:-translate-y-2 transition-all duration-300">
                <span className="font-jersey15 text-5xl md:text-6xl text-white drop-shadow-[2px_2px_0px_#00ffff]">
                  {stat.value}
                </span>
                
                {/* Decorative corner pixels */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-cyan group-hover:bg-[#ff00ff]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-cyan group-hover:bg-[#ff00ff]" />
              </div>
              
              {/* Label */}
              <span className="mt-2 font-vcr text-sm md:text-base text-retro-cyan tracking-widest bg-black/60 px-2 py-1 rounded">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Optional: Vignette to darken edges and focus center */}
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" /> */}
    </section>
  );
}

export default HeroSection;