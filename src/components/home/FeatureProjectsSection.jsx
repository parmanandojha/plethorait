import React from "react";

function FeatureProjectsSection() {
  return (
    <div className="relative h-full pt-[12vh] sm:pt-[20vh]">
      <div className="flex flex-row justify-between items-center sm:items-end gap-4 px-4 sm:px-6 pb-[6vh] sm:pb-[8vh]">
        <div className="text-[clamp(2.2rem,5vw,4.8rem)]">
          <h3>Feature Projects</h3>
        </div>

        <div className="underline-link flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] cursor-pointer">
          <div className="underline-trigger inline-block">
            <div>[ View All ]</div>

            <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
          </div>
        </div>
      </div>

      <a href="">
        <div
          className="featured-card relative h-[60vh] sm:h-[80vh] w-full bg-cover bg-center text-white p-4 sm:p-6 overflow-hidden"
          style={{ backgroundImage: 'url("/featured-smarttek.png")' }}
        >
          <div className="w-full h-full flex flex-col gap-2">
            <div className="text-[clamp(1.5rem,2.5vw,1.5rem)] font-[200]">
              <h3>SmartTek</h3>
            </div>

            <div className="text-[clamp(1rem,1.5vw,1rem)] font-[200] leading-[150%]">
              <h3>Campaign, Website Design Development &amp; Photography</h3>
            </div>

            <div className="project-follow mt-4 flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] pointer-events-none">
              <div>[ View Project ]</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default FeatureProjectsSection;

