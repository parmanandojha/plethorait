import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  // Use default window scrolling, just ensure triggers are refreshed.
  ScrollTrigger.refresh();
  return () => {
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
  gsap.set("#projectsSection", { clearProps: "transform" });

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
  const cleanups = [];

  items.forEach((item) => {
    const image = item.querySelector(".work-list-image");
    if (!image) return;

    gsap.set(image, { opacity: 0, y: 20 });

    const onEnter = () => {
      gsap.to(image, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    const onLeave = () => {
      gsap.to(image, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.inOut"
      });
    };

    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      item.removeEventListener("mouseenter", onEnter);
      item.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => {
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

