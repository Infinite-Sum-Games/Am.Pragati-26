import type { ReactElement } from 'react';
import type { RetroMarqueeProps, NeonColor, Size } from '../types/retroMarqueeTypes';

const sizeClassMap: Record<Size, string> = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
  '2xl': 'text-6xl',
  '3xl': 'text-7xl',
};

const colorClassMap: Record<NeonColor, string> = {
  cyan: 'neon-cyan',
  fuchsia: 'neon-fuchsia',
};

export function RetroMarquee({
  text,
  speed = 18,
  color = 'cyan',
  size = 'lg',
  className = '',
}: RetroMarqueeProps): ReactElement {
  const sizeClass = sizeClassMap[size];
  const colorClass = colorClassMap[color];

  return (
    <div className={`relative bg-gray-800 border-4 border-gray-600 rounded-lg shadow-2xl p-2 ${className}`}>
      <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-gray-700 shadow-inner" />
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gray-700 shadow-inner" />
      <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gray-700 shadow-inner" />
      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-gray-700 shadow-inner" />

      <div className="relative bg-gray-950 retro-screen border-2 border-gray-900 overflow-hidden rounded-md">
        <div className="absolute inset-0 led-glow z-0" />
        <div className="absolute inset-0 led-cells z-10" />
        <div className="whitespace-nowrap relative z-20">
          <div className="marquee flex items-center gap-16" style={{ animationDuration: `${speed}s` }}>
            <span className={`font-retro ${sizeClass} ${colorClass}`}>{text}</span>
            <span className={`font-retro ${sizeClass} ${colorClass}`}>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetroMarquee;
