import React from "react";
import AnimatedLink from "../AnimatedLink.jsx";
import { useProjectsData } from "../../hooks/useProjectsData.js";

function FeatureProjectsSection() {
  const { projects } = useProjectsData();

  const featured =
    projects.find((p) => p.slug === "smarttek") || projects[0] || null;

  if (!featured) {
    return null;
  }

  return (
    <div className="relative h-full pt-[12vh] sm:pt-[20vh]">
      <div className="flex flex-row justify-between items-center sm:items-end gap-4 px-4 sm:px-6 pb-[6vh] sm:pb-[8vh]">
        <div className="text-[clamp(2.2rem,5vw,4.8rem)]">
          <h3>Feature Projects</h3>
        </div>

        <div className="underline-link flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] cursor-pointer">
          <AnimatedLink to="/work">
            <div className="underline-trigger inline-block">
              <div>[ View All ]</div>
              <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
            </div>
          </AnimatedLink>
        </div>
      </div>

      <AnimatedLink to={`/project/${featured.slug}`}>
        <div
          className="featured-card relative h-[60vh] sm:h-[80vh] w-full bg-cover bg-center text-white p-4 sm:p-6 overflow-hidden"
          style={{ backgroundImage: `url("${featured.heroImage}")` }}
        >
          <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            <div className="text-[clamp(1.5rem,2.5vw,1.5rem)] font-[200]">
              <h3>{featured.title}</h3>
            </div>

            <div className="text-[clamp(0.9rem,1.4vw,1rem)] font-[200] leading-[150%] text-white/85 max-w-xl">
              <p>{featured.subtitle}</p>
            </div>

            <div className="project-follow mt-4 flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] pointer-events-none">
              <div>[ View Project ]</div>
            </div>
          </div>
        </div>
      </AnimatedLink>
    </div>
  );
}

export default FeatureProjectsSection;

