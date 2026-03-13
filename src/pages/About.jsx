import React, { useEffect } from "react";
import AboutIntro from "../components/about/AboutIntro.jsx";
import ServicesSection from "../components/about/ServicesSection.jsx";
import { aboutIntroScrollAnimation } from "../animations/gsapAnimations.js";

function About() {
  useEffect(() => {
    const cleanupAbout = aboutIntroScrollAnimation();
    return () => {
      if (cleanupAbout) cleanupAbout();
    };
  }, []);

  return (
    <>
      <AboutIntro />
      <ServicesSection />
    </>
  );
}

export default About;

