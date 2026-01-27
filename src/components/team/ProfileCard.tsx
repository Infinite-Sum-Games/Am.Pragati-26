import { useState, useEffect } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoSparkles, IoMusicalNotes, IoDisc } from "react-icons/io5";
import { motion } from "framer-motion";

type ProfileCardProps = {
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

const ProfileCard = ({
  name,
  role,
  dept,
  year,
  tagline,
  contactEmail,
  instagram,
  linkedin,
  github,
  image,
}: ProfileCardProps) => {
  const [badgeIcon, setBadgeIcon] = useState<React.ReactNode>(null);
  useEffect(() => {
    // Randomly assigns one of these 3 icons to the user on mount
    const icons = [<IoSparkles key="1" />, <IoMusicalNotes key="2" />, <IoDisc key="3" />];
    setBadgeIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  const numberToRoman = (num: number) => {
    const romanNumerals: { [key: number]: string } = { 1: "I", 2: "II", 3: "III", 4: "IV" };
    return romanNumerals[num] || String(num || "");
  };

  const details = year ? `B.Tech ${dept || ""} ${numberToRoman(year)} Year` : (dept ?? "");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative w-full max-w-[320px] aspect-[1/1.5] rounded-lg bg-linear-to-b from-gray-200 via-gray-300 to-gray-400 overflow-hidden transition-all duration-300 hover:shadow-[6px_6px_0_rgba(0,0,0,0.8)] border-4 border-gray-800"
    >
      {/* Game Console Body */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-700 via-gray-800 to-gray-900">
        
        {/* Console branding bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-gray-600 to-gray-700 border-b-2 border-black flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444] animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
            <div className="text-[7px] font-mono text-gray-400 ml-1">PWR</div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Battery indicator */}
            <div className="flex items-center gap-0.5">
              <div className="w-4 h-2 border border-gray-500 rounded-sm flex gap-px p-px">
                <div className="flex-1 bg-[#2de2e6] rounded-[1px]" />
                <div className="flex-1 bg-[#2de2e6] rounded-[1px]" />
                <div className="flex-1 bg-[#2de2e6] rounded-[1px] group-hover:bg-gray-600" />
              </div>
              <div className="w-0.5 h-1 bg-gray-500 rounded-r-sm" />
            </div>
            
            {/* Volume bars */}
            <div className="flex items-end gap-px h-2">
              <div className="w-0.5 h-1 bg-gray-500" />
              <div className="w-0.5 h-1.5 bg-gray-500" />
              <div className="w-0.5 h-2 bg-[#2de2e6]" />
            </div>
          </div>
          
          <div className="text-[#2de2e6] text-xs opacity-75">
            {badgeIcon}
          </div>
        </div>

        {/* Screen Frame */}
        <div className="absolute top-12 left-4 right-4 h-[58%] bg-black border-4 border-gray-600 rounded-md overflow-hidden shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]">
          {/* Screen bezel */}
          <div className="absolute inset-0 border-2 border-gray-800 pointer-events-none z-10" />
          
          {/* CRT Screen effect */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Scanlines overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none z-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, transparent 1px, transparent 2px)',
            }}
          />
          
          {/* Image Display */}
          <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-95 contrast-110 saturate-150 group-hover:brightness-105 group-hover:scale-105"
          />
          
          {/* Screen reflection */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
          
          {/* Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
        </div>

        {/* Info Section - Console Display */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-b from-gray-800 to-gray-900 border-t-2 border-gray-600 p-4 pb-3">
          
          {/* Speaker grilles */}
          <div className="absolute top-2 left-4 right-4 flex justify-between opacity-30">
            <div className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 bg-gray-600 rounded-full" />
              ))}
            </div>
            <div className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 bg-gray-600 rounded-full" />
              ))}
            </div>
          </div>

          <div className="relative pt-4">
            {/* Name display */}
            <h3 
              className="text-[#2de2e6] font-bold text-lg text-center uppercase tracking-tight leading-none mb-2 group-hover:text-retro-pink transition-colors duration-300 drop-shadow-[0_0_8px_currentColor]"
              style={{ fontFamily: 'monospace' }}
            >
              {name}
            </h3>
            
            {/* LED divider */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-[#2de2e6]/50 to-transparent mb-3 group-hover:via-retro-pink/50 transition-colors" />
            
            {/* Role/Tagline Display */}
            <div className="relative flex flex-col items-center justify-center gap-1 min-h-12">
              <div className="flex flex-col items-center justify-center gap-1 transition-opacity duration-300 group-hover:opacity-0">
                <p className="text-[#2de2e6] text-xs font-bold uppercase tracking-wider drop-shadow-[0_0_5px_rgba(45,226,230,0.5)] text-center">{role}</p>
                <p className="text-gray-400 text-[9px] tracking-widest font-mono text-center">{details}</p>
              </div>

              {/* Hover: tagline */}
              {tagline && (
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ffcc33] text-xs text-center w-full px-4 leading-snug italic opacity-0 transition-opacity duration-300 group-hover:opacity-100 drop-shadow-[0_0_8px_rgba(255,204,51,0.6)]">
                  "{tagline}"
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* D-pad */}
        <div className="absolute left-2 bottom-12 opacity-100 group-hover:opacity-60 transition-opacity duration-300">
          <div className="relative w-9 h-9">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-gray-700 border border-gray-900 rounded-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-gray-700 border border-gray-900 rounded-sm" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-2 bg-gray-700 border border-gray-900 rounded-sm" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-2 bg-gray-700 border border-gray-900 rounded-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-sm border border-gray-900" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute right-2 bottom-12 opacity-100 group-hover:opacity-60 transition-opacity duration-300">
          <div className="relative w-9 h-9">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 border-2 border-red-800" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-500 border-2 border-green-700" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-500 border-2 border-yellow-700" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 border-2 border-blue-700" />
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:bottom-28 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
          <div className="relative flex gap-3 bg-linear-to-b from-gray-700 to-gray-800 px-4 py-2 rounded-sm backdrop-blur-sm border-2 border-gray-900 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_4px_0_rgba(0,0,0,0.8)]">
            {/* Cartridge notch */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-900 rounded-b" />
            
            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-gray-500" />
            <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-gray-500" />
            {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#00d9ff] hover:scale-110 transition-all p-1 drop-shadow-[0_0_8px_currentColor]">
                    <FaLinkedin size={18} />
                </a>
            )}
            {instagram && instagram !== "-" && (
            <a href={instagram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#ff4fd8] hover:scale-110 transition-all p-1 drop-shadow-[0_0_8px_currentColor]">
                    <FaInstagram size={18} />
                </a>
            )}
            {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="text-gray-300 hover:text-[#ffa726] hover:scale-110 transition-all p-1 drop-shadow-[0_0_8px_currentColor]">
                    <FaEnvelope size={18} />
                </a>
            )}
            {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#b25cff] hover:scale-110 transition-all p-1 drop-shadow-[0_0_8px_currentColor]">
                    <FaGithub size={18} />
                </a>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
