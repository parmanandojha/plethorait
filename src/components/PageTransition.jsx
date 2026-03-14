import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef
} from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";

const PageTransitionContext = createContext(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition.");
  }
  return context;
}

function PageTransition({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const stairsRef = useRef(null);
  const pageRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const transitionTo = useCallback(
    (to) => {
      if (!to || isAnimatingRef.current || to === location.pathname) return;

      const stairs = gsap.utils.toArray(".stair", stairsRef.current);
      if (!stairs.length || !pageRef.current) {
        navigate(to);
        return;
      }

      isAnimatingRef.current = true;
      const currentPage = pageRef.current;

      // Exit animation: stairs come in while current page fades out
      const exitTl = gsap.timeline({
        onComplete: () => {
          navigate(to);
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });

          // Double rAF + short delay so React and image-heavy layout settle before stairs-out
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              const runEntry = () => {
                const newPage = pageRef.current;
                const stairsEls = gsap.utils.toArray(".stair", stairsRef.current);

                if (!newPage || !stairsEls.length) {
                  isAnimatingRef.current = false;
                  gsap.set(stairsRef.current, { display: "none" });
                  gsap.set(stairsEls, { y: "100%" });
                  return;
                }

                gsap.set(newPage, { opacity: 0 });

                const entryTl = gsap.timeline({
                  onComplete: () => {
                    isAnimatingRef.current = false;
                    gsap.set(stairsRef.current, { display: "none" });
                    gsap.set(stairsEls, { y: "100%" });
                  }
                });

                entryTl.to(
                  stairsEls,
                  {
                    y: "-100%",
                    duration: 0.65,
                    stagger: { amount: -0.28 },
                    ease: "power3.inOut"
                  },
                  0
                );

                entryTl.to(
                  newPage,
                  {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                  },
                  0.08
                );
              };

              // Give image-heavy pages time to mount and layout before animating stairs out
              setTimeout(runEntry, 80);
            });
          });
        }
      });

      exitTl.set(stairsRef.current, { display: "block" });
      exitTl.set(stairs, { y: "100%" });

      exitTl.to(
        stairs,
        {
          y: "0%",
          duration: 0.55,
          stagger: { amount: -0.25 },
          ease: "power3.inOut"
        },
        0
      );

      exitTl.to(
        currentPage,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut"
        },
        0
      );
    },
    [location.pathname, navigate]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stairs = gsap.utils.toArray(".stair", stairsRef.current);
      gsap.set(stairsRef.current, { display: "none" });
      gsap.set(stairs, { y: "100%" });
      gsap.set(pageRef.current, { opacity: 1 });
    }, stairsRef);

    return () => ctx.revert();
  }, []);

  const contextValue = useMemo(
    () => ({
      transitionTo
    }),
    [transitionTo]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <main className="min-h-screen">
        <div
          ref={stairsRef}
          className="fixed top-0 left-0 h-screen w-full z-[9999] pointer-events-none hidden"
        >
          <div className="flex h-full w-full">
            <div className="stair h-full w-1/6 bg-black" />
            <div className="stair h-full w-1/6 bg-black" />
            <div className="stair h-full w-1/6 bg-black" />
            <div className="stair h-full w-1/6 bg-black" />
            <div className="stair h-full w-1/6 bg-black" />
            <div className="stair h-full w-1/6 bg-black" />
          </div>
        </div>

        <div ref={pageRef}>{children}</div>
      </main>
    </PageTransitionContext.Provider>
  );
}

export default PageTransition;

