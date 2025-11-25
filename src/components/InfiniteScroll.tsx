import { useRef, useEffect } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  speed?: number; // pixels per second
  className?: string;
}

export const InfiniteScroll = ({ children, speed = 50, className = "" }: InfiniteScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosition = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Move scroll position
      scrollPosition.current += (speed * delta) / 1000;

      // Get the width of one set of content (50% since we duplicate)
      const contentWidth = scrollContainer.scrollWidth / 2;

      // Reset when we've scrolled through one full set
      if (scrollPosition.current >= contentWidth) {
        scrollPosition.current = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  return (
    <div className="relative overflow-visible">
      <div ref={scrollRef} className={`flex ${className}`} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
};
