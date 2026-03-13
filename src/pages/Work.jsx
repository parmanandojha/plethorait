import React, { useEffect, useState } from "react";
import {
  setupProjectCursorFollow,
  setupWorkListHoverImage
} from "../animations/gsapAnimations.js";
import { projects } from "../data/projects.js";
import AnimatedLink from "../components/AnimatedLink.jsx";

function Work() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  useEffect(() => {
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
  }, [viewMode]);

  return (
    <>
      <div className="relative h-full pt-[20vh]">
        <div className="flex flex-row justify-between items-end px-6 pb-[8vh]">
          <div className="text-[clamp(3rem,5vw,4.8rem)]">
            <h3>Feature Projects</h3>
          </div>

          <div className="flex flex-col gap-1 text-[0.8rem] cursor-pointer">
            <div className="inline-flex flex-row items-center gap-2">
              <span>[</span>

              <div className="underline-link">
                <button
                  type="button"
                  className="underline-trigger inline-block"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
                <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
              </div>

              <span>/</span>

              <div className="underline-link">
                <button
                  type="button"
                  className="underline-trigger inline-block"
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
                <div className="underline-line border-b border-white w-full origin-left scale-x-0 pt-1" />
              </div>

              <span>]</span>
            </div>
          </div>
        </div>
      </div>

      <section id="projectsSection">
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2">
            {projects.map((project) => (
              <AnimatedLink
                key={project.id}
                to={`/project/${project.slug}`}
                className="featured-card relative h-[80vh] bg-cover bg-center p-6 overflow-hidden"
                style={{ backgroundImage: `url("${project.thumbnailImage}")` }}
              >
                <h3 className="text-[1.5rem] pb-2">{project.title}</h3>

                <p className="text-[1rem]">{project.subtitle}</p>

                <div className="project-follow mt-4 text-[0.8rem] pointer-events-none">
                  [ View Project ]
                </div>
              </AnimatedLink>
            ))}
          </div>
        ) : (
          <div className="px-6 pb-[20vh] space-y-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="work-list-item flex flex-col md:flex-row gap-6 border-t border-white/20 pt-8"
              >
                <div
                  className="work-list-image w-full md:w-1/3 h-[40vh] bg-cover bg-center"
                  style={{ backgroundImage: `url("${project.thumbnailImage}")` }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[1.5rem] pb-2">{project.title}</h3>
                    <p className="text-[1rem] text-white/80">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 text-[0.8rem]">
                    <AnimatedLink
                      to={`/project/${project.slug}`}
                      className="underline cursor-pointer"
                    >
                      [ View Project ]
                    </AnimatedLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Work;

