import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  setupProjectCursorFollow,
  setupWorkListHoverImage
} from "../animations/gsapAnimations.js";
import AnimatedLink from "../components/AnimatedLink.jsx";
import { useProjectsData } from "../hooks/useProjectsData.js";

function Work() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [isSwitching, setIsSwitching] = useState(false);
  const { projects, loading, error } = useProjectsData();
  const viewRef = useRef(null);

  const handleViewModeChange = (nextView) => {
    if (isSwitching || nextView === viewMode) return;

    const currentView = viewRef.current;
    if (!currentView) {
      setViewMode(nextView);
      return;
    }

    setIsSwitching(true);
    gsap.to(currentView, {
      autoAlpha: 0,
      y: -8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setViewMode(nextView);
        setIsSwitching(false);
      }
    });
  };

  useEffect(() => {
    if (loading || !projects.length) return undefined;

    if (viewMode === "grid") {
      const cleanupFollow = setupProjectCursorFollow();
      return () => {
        if (cleanupFollow) cleanupFollow();
      };
    }

    if (viewMode === "list") {
      const cleanupList = setupWorkListHoverImage();
      return () => {
        if (cleanupList) cleanupList();
      };
    }

    return undefined;
  }, [viewMode, loading, projects.length]);

  useEffect(() => {
    if (!viewRef.current) return;
    gsap.fromTo(
      viewRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }
    );
  }, [viewMode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">Loading projects…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">
          Failed to load projects.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-full pt-[12vh] sm:pt-[20vh]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-4 sm:px-6 pb-[6vh] sm:pb-[8vh]">
          <div className="text-[clamp(2rem,5vw,4.8rem)] ">
            <h3>Works</h3>
          </div>

          <div className="flex flex-col gap-1 text-[clamp(0.7rem,1.5vw,0.8rem)] cursor-pointer">
            <div className="inline-flex flex-row items-center gap-2">
              <span>[</span>

              <div className="underline-link group relative inline-block">
                <button
                  type="button"
                  className="underline-trigger relative inline-block"
                  onClick={() => handleViewModeChange("grid")}
                  disabled={isSwitching}
                >
                  Grid
                </button>
                <div className="underline-line absolute left-0 -bottom-0.5 border-b border-white w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>

              <span>/</span>

              <div className="underline-link group relative inline-block">
                <button
                  type="button"
                  className="underline-trigger relative inline-block"
                  onClick={() => handleViewModeChange("list")}
                  disabled={isSwitching}
                >
                  List
                </button>
                <div className="underline-line absolute left-0 -bottom-0.5 border-b border-white w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>

              <span>]</span>
            </div>
          </div>
        </div>
      </div>

      <section id="projectsSection">
        <div ref={viewRef}>
          {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2">
            {projects.map((project) => (
              <AnimatedLink
                key={project.id}
                to={`/project/${project.slug}`}
                className="featured-card relative h-[60vh] sm:h-[80vh] bg-cover bg-center p-4 sm:p-6 overflow-hidden"
                style={{ backgroundImage: `url("${project.thumbnailImage}")` }}
              >
                <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] pb-1">
                  {project.title}
                </h3>

                <p className="text-[clamp(0.875rem,1.5vw,1rem)]">
                  {project.subtitle}
                </p>

                <div className="project-follow mt-4 text-[clamp(0.7rem,1.5vw,0.8rem)] pointer-events-none">
                  [ View Project ]
                </div>
              </AnimatedLink>
            ))}
          </div>
        ) : (
          <div className="relative px-4 sm:px-6 pb-[12vh] sm:pb-[20vh]">
            <div className="border-t border-white/20">
              <div className="hidden md:grid grid-cols-12 text-[0.65rem] uppercase tracking-[0.18em] text-white/50 py-4 border-b border-white/10">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Year</div>
                <div className="col-span-4">Services</div>
              </div>

              {projects.map((project) => (
                <AnimatedLink
                  key={project.id}
                  to={`/project/${project.slug}`}
                  className="work-list-item grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-0 py-6 sm:py-8 border-b border-white/10 cursor-pointer group"
                  data-image={project.thumbnailImage}
                >
                  <div className="col-span-6">
                    <h3 className="text-[clamp(2rem,4.2vw,3.6rem)] leading-none text-white/70 group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <div className="col-span-2 text-[clamp(0.82rem,1.1vw,1rem)] text-white/75">
                    <span className="md:hidden text-white/45 uppercase text-[0.62rem] tracking-[0.16em] mr-2">
                      Year:
                    </span>
                    {project.year}
                  </div>

                  <div className="col-span-4 text-[clamp(0.82rem,1.1vw,1rem)] text-white/75">
                    <span className="md:hidden text-white/45 uppercase text-[0.62rem] tracking-[0.16em] mr-2">
                      Services:
                    </span>
                    {project.services.join(", ")}
                  </div>
                </AnimatedLink>
              ))}
            </div>

            <div className="work-list-follower fixed top-0 left-0 z-40 hidden md:block pointer-events-none opacity-0 will-change-transform">
              <div className="relative w-[220px] h-[280px] rounded-xl overflow-hidden bg-white/10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className="work-list-follower-image absolute inset-0 bg-cover bg-center will-change-transform" />
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <span className="bg-white text-black text-xs px-4 py-2 rounded-md">
                    View case
                  </span>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Work;

