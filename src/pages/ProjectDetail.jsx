import React from "react";
import { useParams } from "react-router-dom";
import { useProjectsData } from "../hooks/useProjectsData.js";

function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading, error } = useProjectsData();
  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">Loading project…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">
          Failed to load project.
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <p className="text-[clamp(0.875rem,1.5vw,1rem)]">Project not found.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative h-[100vh] w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url("${project.heroImage}")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col justify-end px-4 sm:px-6 pb-[8vh] sm:pb-[12vh]">
          <h1 className="text-[clamp(2rem,6vw,5rem)] mb-3 sm:mb-4">
            {project.title}
          </h1>
          <p className="text-[clamp(0.9375rem,1.5vw,1.1rem)] max-w-xl text-white/80">
            {project.description}
          </p>
        </div>
      </div>

      <section className="px-4 sm:px-6 py-[12vh] sm:py-[16vh] grid md:grid-cols-12 gap-8 sm:gap-12">
        <div className="md:col-span-4 space-y-4 text-[clamp(0.8rem,1.2vw,0.9rem)] uppercase">
          <div>
            <div className="text-white/60">Client</div>
            <div>{project.client}</div>
          </div>
          <div>
            <div className="text-white/60">Location</div>
            <div>{project.location}</div>
          </div>
          <div>
            <div className="text-white/60">Services</div>
            <div>{project.services.join(", ")}</div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4 sm:space-y-6 text-[clamp(0.9375rem,1.5vw,1rem)] ">
          {project.body.map((paragraph, idx) => (
            <p key={idx} className="text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className=" pb-[12vh]">
          {project.gallery.map((src) => (
            <div
              key={src}
              className="w-full h-[100vh] bg-cover bg-center"
              style={{ backgroundImage: `url("${src}")` }}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default ProjectDetail;

