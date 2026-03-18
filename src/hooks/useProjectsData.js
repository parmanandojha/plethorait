import { useEffect, useState } from "react";

let cachedProjects = null;

export function useProjectsData() {
  const [projects, setProjects] = useState(cachedProjects);
  const [loading, setLoading] = useState(!cachedProjects);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedProjects) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/projects.json");
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid projects data format");
        }

        if (!cancelled) {
          cachedProjects = data;
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects: projects || [], loading, error };
}

