import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

function Preloader() {
  const stairsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stairs = gsap.utils.toArray(".preload-stair", stairsRef.current);

      gsap.set(stairs, { y: "100%" });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });

      tl.to(stairs, {
        y: "0%",
        duration: 0.7,
        stagger: { amount: -0.25 },
        ease: "power3.inOut"
      }).to(stairs, {
        y: "-100%",
        duration: 0.7,
        stagger: { amount: -0.25 },
        ease: "power3.inOut"
      });
    }, stairsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] bg-[#080808]">
      <div
        ref={stairsRef}
        className="absolute inset-0 flex h-full w-full pointer-events-none"
      >
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
        <div className="preload-stair h-full w-1/6 bg-black" />
      </div>
    </div>
  );
}

export default Preloader;

