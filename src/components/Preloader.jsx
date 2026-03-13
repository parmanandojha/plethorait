import React from "react";

function Preloader() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#080808]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-[#111111] rounded-lg grid grid-cols-2 gap-1 p-2">
          <div className="bg-white/10 rounded-sm" />
          <div className="bg-white/20 rounded-sm" />
          <div className="bg-white/30 rounded-sm" />
          <div className="bg-white/40 rounded-sm" />
        </div>
        <p className="text-[0.75rem] tracking-[0.25em] uppercase text-white/60">
          Loading experience…
        </p>
      </div>
    </div>
  );
}

export default Preloader;

