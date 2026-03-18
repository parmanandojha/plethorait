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
import { useProjectsData } from "../hooks/useProjectsData.js";

function Home() {
  const { projects } = useProjectsData();

  useEffect(() => {
    const cleanupStatement = statementScrollAnimation();
    return () => {
      if (cleanupStatement) cleanupStatement();
    };
  }, []);

  useEffect(() => {
    if (!projects.length) return undefined;

    const cleanupFollow = setupProjectCursorFollow();
    return () => {
      if (cleanupFollow) cleanupFollow();
    };
  }, [projects.length]);

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

