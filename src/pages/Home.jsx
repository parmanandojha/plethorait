import React, { useEffect } from "react";
import {
  setupProjectCursorFollow,
  statementScrollAnimation
} from "../animations/gsapAnimations.js";
import HeroSection from "../components/home/HeroSection.jsx";
import FeatureProjectsSection from "../components/home/FeatureProjectsSection.jsx";
import StatementSection from "../components/home/StatementSection.jsx";
import HomeProjectsGrid from "../components/home/HomeProjectsGrid.jsx";
import BlogsSection from "../components/home/BlogsSection.jsx";

function Home() {
  useEffect(() => {
    const cleanupFollow = setupProjectCursorFollow();
    const cleanupStatement = statementScrollAnimation();

    return () => {
      if (cleanupFollow) cleanupFollow();
      if (cleanupStatement) cleanupStatement();
    };
  }, []);

  return (
    <>
      <HeroSection />
      <FeatureProjectsSection />
      <StatementSection />
      <HomeProjectsGrid />
      <BlogsSection />
    </>
  );
}

export default Home;

