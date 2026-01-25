type NeonColor = 'cyan' | 'fuchsia';
type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface RetroMarqueeProps {
  text: string;
  speed?: number;
  color?: NeonColor;
  size?: Size;
  className?: string;
}

export type { NeonColor, Size, RetroMarqueeProps };