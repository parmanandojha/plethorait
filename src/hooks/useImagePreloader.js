import { useEffect, useState } from "react";
import { IMAGES_TO_PRELOAD } from "../data/imageManifest.js";

export function useImagePreloader() {
  const fromCache =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("imagesPreloaded") === "true";
  const [done, setDone] = useState(fromCache);
  const [progress, setProgress] = useState(fromCache ? 100 : 0);

  useEffect(() => {
    if (done) return;

    let cancelled = false;

    const preload = async () => {
      const total = IMAGES_TO_PRELOAD.length;
      if (!total) {
        setProgress(100);
        setDone(true);
        return;
      }

      let loaded = 0;

      const tasks = IMAGES_TO_PRELOAD.map((src) =>
        new Promise((resolve) => {
          const img = new Image();
          const complete = () => {
            loaded += 1;
            if (!cancelled) {
              setProgress(Math.round((loaded / total) * 100));
            }
            resolve(true);
          };

          img.onload = complete;
          img.onerror = complete;
          img.src = src;
        })
      );

      await Promise.all(tasks);

      if (!cancelled) {
        try {
          window.sessionStorage.setItem("imagesPreloaded", "true");
        } catch {
          // ignore sessionStorage errors
        }
        setProgress(100);
        setDone(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [done]);

  return { done, progress, fromCache };
}

