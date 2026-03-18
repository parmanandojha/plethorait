import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

function Preloader({ progress = 0, done = false, onComplete }) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const stairsRef = useRef(null);
  const completedRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stairs = gsap.utils.toArray(".preload-stair", stairsRef.current);
      gsap.set(stairs, { y: "0%" });
      gsap.set(rootRef.current, { autoAlpha: 1 });
      gsap.set(textRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(progressRef.current, { autoAlpha: 1 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!done || completedRef.current) return;
    completedRef.current = true;

    const stairs = gsap.utils.toArray(".preload-stair", stairsRef.current);
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.to(textRef.current, {
      autoAlpha: 0,
      y: -12,
      duration: 0.32,
      ease: "power2.inOut"
    }).to(
      progressRef.current,
      {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.inOut"
      },
      0
    );

    tl.to(
      stairs,
      {
        y: "-100%",
        duration: 0.8,
        stagger: { amount: -0.3 },
        ease: "power3.inOut"
      },
      0.18
    );
  }, [done, onComplete]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9998] pointer-events-none">
      <div
        ref={stairsRef}
        className="absolute inset-0 flex h-full w-full"
      >
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <p
          ref={textRef}
          className="text-[clamp(1.25rem,2.4vw,2.2rem)] text-white tracking-[0.02em] text-center"
        >
          A trusted digital partners!
        </p>
      </div>

      <div
        ref={progressRef}
        className="absolute top-0 left-0 z-20 h-[3px] w-full bg-white/10"
      >
        <div
          className="h-full bg-white transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Preloader;

