import React from "react";
import AnimatedLink from "../AnimatedLink.jsx";
import { useProjectsData } from "../../hooks/useProjectsData.js";

function HomeProjectsGrid() {
  const { projects } = useProjectsData();

  const items = projects.slice(0, 4);

  if (!items.length) return null;

  return (
    <section id="projectsSection">
      <div className="grid md:grid-cols-2">
        {items.map((project) => (
          <AnimatedLink
            key={project.id}
            to={`/project/${project.slug}`}
            className="featured-card relative h-[60vh] sm:h-[80vh] bg-cover bg-center p-4 sm:p-6 overflow-hidden"
            style={{ backgroundImage: `url("${project.thumbnailImage}")` }}
          >
            <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] pb-1">
              {project.title}
            </h3>

            <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/85">
              {project.subtitle}
            </p>

            <div className="project-follow mt-4 text-[clamp(0.7rem,1.5vw,0.8rem)] pointer-events-none">
              [ View Project ]
            </div>
          </AnimatedLink>
        ))}
      </div>
    </section>
  );
}

export default HomeProjectsGrid;

