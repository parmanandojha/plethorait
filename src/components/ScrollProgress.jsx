import React, { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
      <div
        className="h-full bg-white/80 origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;

