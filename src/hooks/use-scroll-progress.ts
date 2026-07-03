"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks scroll progress (0 → 1) through a container element using
 * native window scroll. Uses a ref so it updates every frame WITHOUT
 * triggering React re-renders — the 3D scene reads from the ref in
 * useFrame for smooth, allocation-free animation.
 *
 * Progress = how far the container's top has scrolled past the viewport top,
 * normalized so 0 = container top at viewport top, 1 = container bottom at viewport bottom.
 */
export function useScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  progressRef: React.MutableRefObject<number>
) {
  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        progressRef.current = 0;
        return;
      }
      const scrolled = -rect.top;
      progressRef.current = Math.max(0, Math.min(1, scrolled / total));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, progressRef]);
}

/**
 * IntersectionObserver gate — returns whether an element is in the viewport.
 * Used to mount/unmount the 3D canvas only when needed (perf).
 */
export function useInViewport(ref: React.RefObject<HTMLElement>, rootMargin = "200px") {
  const visibleRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return visibleRef;
}
