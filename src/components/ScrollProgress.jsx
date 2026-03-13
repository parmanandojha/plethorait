import React, { useEffect, useRef } from "react";

function ScrollProgress() {
  const barRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateBar = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${value}%`;
      }
      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(updateBar);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
      <div ref={barRef} className="h-full bg-white/80 origin-left w-0" />
    </div>
  );
}

export default ScrollProgress;

