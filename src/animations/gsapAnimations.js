import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(scrollContainer) {
  if (typeof window === "undefined" || !scrollContainer) {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }

  let locomotive = null;
  let cancelled = false;
  const previousDefaults = ScrollTrigger.defaults();
  const onRefresh = () => {
    if (locomotive) locomotive.update();
  };

  const setup = async () => {
    try {
      const { default: LocomotiveScroll } = await import("locomotive-scroll");
      if (cancelled) return;

      locomotive = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });

      window.__locomotiveScroll = locomotive;

      locomotive.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          if (arguments.length && locomotive) {
            locomotive.scrollTo(value, { duration: 0, disableLerp: true });
          }
          return locomotive?.scroll?.instance?.scroll?.y || 0;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
      });

      ScrollTrigger.defaults({
        ...previousDefaults,
        scroller: scrollContainer
      });

      ScrollTrigger.addEventListener("refresh", onRefresh);

      ScrollTrigger.refresh();
      if (locomotive) locomotive.update();
    } catch {
      ScrollTrigger.refresh();
    }
  };

  setup();

  return () => {
    cancelled = true;
    if (window.__locomotiveScroll) {
      delete window.__locomotiveScroll;
    }
    ScrollTrigger.defaults(previousDefaults);
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    if (locomotive) {
      locomotive.destroy();
      locomotive = null;
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

export function setupUnderlineHover() {
  const links = Array.from(document.querySelectorAll(".underline-link"));
  const listeners = [];

  links.forEach((link) => {
    const line = link.querySelector(".underline-line");
    if (!line) return;

    gsap.set(line, {
      scaleX: 0,
      transformOrigin: "left center"
    });

    const onEnter = () => {
      gsap.to(line, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const onLeave = () => {
      gsap.to(line, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    };

    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", onLeave);

    listeners.push({ target: link, onEnter, onLeave });
  });

  return () => {
    listeners.forEach(({ target, onEnter, onLeave }) => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
    });
  };
}

export function setupNavUnderline() {
  const groups = Array.from(document.querySelectorAll(".nav-link-group"));
  const listeners = [];

  groups.forEach((group) => {
    const trigger = group.querySelector(".nav-link-text");
    const line = group.querySelector(".nav-border");
    if (!trigger || !line) return;

    gsap.set(line, {
      scaleX: 0,
      transformOrigin: "left center"
    });

    const onEnter = () => {
      gsap.to(line, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const onLeave = () => {
      gsap.to(line, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    };

    trigger.addEventListener("mouseenter", onEnter);
    trigger.addEventListener("mouseleave", onLeave);

    listeners.push({ trigger, onEnter, onLeave });
  });

  return () => {
    listeners.forEach(({ trigger, onEnter, onLeave }) => {
      trigger.removeEventListener("mouseenter", onEnter);
      trigger.removeEventListener("mouseleave", onLeave);
    });
  };
}

export function setupProjectCursorFollow() {
  const cards = Array.from(document.querySelectorAll(".featured-card"));
  const listeners = [];

  cards.forEach((card) => {
    const label = card.querySelector(".project-follow");
    if (!label) return;

    let baseX = 0;
    let baseY = 0;

    const moveToEvent = (e) => {
      const rect = card.getBoundingClientRect();
      const targetRect = label.getBoundingClientRect();

      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const x = cursorX - baseX;
      const y = cursorY - baseY;

      gsap.to(label, {
        x,
        y,
        duration: 0.15,
        ease: "power3.out"
      });
    };

    const onEnter = (e) => {
      const rect = card.getBoundingClientRect();
      const targetRect = label.getBoundingClientRect();

      baseX = targetRect.left - rect.left;
      baseY = targetRect.top - rect.top;

      gsap.set(label, { x: 0, y: 0 });
      moveToEvent(e);
    };

    const onMove = moveToEvent;

    const onLeave = () => {
      gsap.to(label, {
        x: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    listeners.push({ card, onEnter, onMove, onLeave });
  });

  return () => {
    listeners.forEach(({ card, onEnter, onMove, onLeave }) => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  };
}

export function statementScrollAnimation() {
  const text = document.querySelector("#statementText");
  if (!text) return null;

  const content = text.innerText;
  const words = content.split(" ");

  text.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  const wordSpans = document.querySelectorAll(".word");

  gsap.set(wordSpans, {
    color: "rgba(255,255,255,0.2)"
  });

  // Ensure projects section is not offset from previous animations
  const projectsSection = document.querySelector("#projectsSection");
  if (projectsSection) {
    gsap.set(projectsSection, { clearProps: "transform" });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#statement",
      start: "top 80%",
      end: "bottom 50%",
      scrub: true,
    }
  });

  tl.to(wordSpans, {
    color: "#ffffff",
    stagger: 0.08,
    ease: "none"
  });

  return () => {
    tl.kill();
  };
}

export function setupWorkListHoverImage() {
  const items = Array.from(document.querySelectorAll(".work-list-item"));
  const follower = document.querySelector(".work-list-follower");
  const followerImage = follower?.querySelector(".work-list-follower-image");

  if (!items.length || !follower || !followerImage) return null;

  // Warm image cache for smoother first hover.
  const imageSet = new Set(
    items.map((item) => item.getAttribute("data-image")).filter(Boolean)
  );
  imageSet.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let active = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  };
  gsap.ticker.add(tick);

  const moveFollower = (e) => {
    if (!active) return;
    targetX = e.clientX - 110;
    targetY = e.clientY - 140;
  };

  const onWindowMove = (e) => moveFollower(e);
  window.addEventListener("mousemove", onWindowMove, { passive: true });

  const cleanups = items.map((item) => {
    const image = item.getAttribute("data-image");

    const onEnter = (e) => {
      active = true;
      if (image) {
        gsap.set(followerImage, {
          backgroundImage: `url("${image}")`
        });
      }
      moveFollower(e);
      gsap.to(follower, {
        opacity: 1,
        scale: 1,
        duration: 0.18,
        ease: "power2.out"
      });
    };

    const onLeave = () => {
      active = false;
      gsap.to(follower, {
        opacity: 0,
        scale: 0.95,
        duration: 0.16,
        ease: "power2.inOut"
      });
    };

    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);

    return () => {
      item.removeEventListener("mouseenter", onEnter);
      item.removeEventListener("mouseleave", onLeave);
    };
  });

  gsap.set(follower, { opacity: 0, scale: 0.95 });

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener("mousemove", onWindowMove);
    cleanups.forEach((fn) => fn());
  };
}

export function aboutIntroScrollAnimation() {
  const text = document.querySelector("#aboutIntroText");
  if (!text) return null;

  const content = text.innerText;
  const words = content.split(" ");

  text.innerHTML = words
    .map((word) => `<span class="about-word">${word}</span>`)
    .join(" ");

  const wordSpans = Array.from(
    document.querySelectorAll("#aboutIntroText .about-word")
  );

  gsap.set(wordSpans, {
    color: "rgba(255,255,255,0.2)"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about-intro-highlight",
      start: "top 70%",
      end: "bottom 50%",
      scrub: true,
      markers: false
    }
  });

  tl.to(wordSpans, {
    color: "#ffffff",
    stagger: 0.08,
    ease: "none"
  });

  return () => {
    tl.kill();
  };
}

