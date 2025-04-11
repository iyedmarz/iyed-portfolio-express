
import { ReactNode, useRef } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 
    | "fade-up" 
    | "fade-down" 
    | "fade-left" 
    | "fade-right" 
    | "zoom-in"
    | "zoom-out";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    ref,
    threshold,
    once,
  });

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-10";
      case "fade-down":
        return "opacity-0 -translate-y-10";
      case "fade-left":
        return "opacity-0 translate-x-10";
      case "fade-right":
        return "opacity-0 -translate-x-10";
      case "zoom-in":
        return "opacity-0 scale-95";
      case "zoom-out":
        return "opacity-0 scale-105";
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        className,
        "transition-all duration-700",
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : getAnimationClass()
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
