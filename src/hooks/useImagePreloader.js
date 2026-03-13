import { useEffect, useState } from "react";
import { IMAGES_TO_PRELOAD } from "../data/imageManifest.js";

export function useImagePreloader() {
  const [done, setDone] = useState(
    typeof window !== "undefined" &&
      window.sessionStorage.getItem("imagesPreloaded") === "true"
  );

  useEffect(() => {
    if (done) return;

    let cancelled = false;

    const preload = async () => {
      const tasks = IMAGES_TO_PRELOAD.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
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
        setDone(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [done]);

  return done;
}

