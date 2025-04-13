
import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  ref: RefObject<Element>;
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export const useIntersectionObserver = ({
  ref,
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseIntersectionObserverProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          // If once is true, disconnect after first intersection
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin, once]);

  return isIntersecting;
};
