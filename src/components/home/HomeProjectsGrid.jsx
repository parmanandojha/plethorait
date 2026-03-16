import React from "react";

const homeProjects = [
  {
    title: "Mervyn’s",
    subtitle: "Campaign & Photography",
    image: "/project-mervyns.png"
  },
  {
    title: "Narasha",
    subtitle: "Website Ecommerce & Photography",
    image: "/project-narasha.png"
  },
  {
    title: "Butter me up",
    subtitle: "Photography",
    image: "/project-buttermeup.png"
  },
  {
    title: "Snoop’s Joint",
    subtitle: "Campaign & Photography",
    image: "/project-snoopjoints.png"
  }
];

function HomeProjectsGrid() {
  return (
    <section id="projectsSection">
      <div className="grid md:grid-cols-2">
        {homeProjects.map((project) => (
          <div
            key={project.title}
            className="featured-card relative h-[60vh] sm:h-[80vh] bg-cover bg-center p-4 sm:p-6 overflow-hidden"
            style={{ backgroundImage: `url("${project.image}")` }}
          >
            <h3 className="text-[clamp(1.125rem,2.5vw,1.5rem)] pb-2">{project.title}</h3>

            <p className="text-[clamp(0.875rem,1.5vw,1rem)]">{project.subtitle}</p>

            <div className="project-follow mt-4 text-[clamp(0.7rem,1.5vw,0.8rem)] pointer-events-none">
              [ View Project ]
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeProjectsGrid;

