import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageTransition from "./components/PageTransition.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Preloader from "./components/Preloader.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import { useImagePreloader } from "./hooks/useImagePreloader.js";
import {
  initSmoothScroll,
  setupUnderlineHover,
  setupNavUnderline
} from "./animations/gsapAnimations.js";

function App() {
  const location = useLocation();
  const imagesReady = useImagePreloader();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!imagesReady) return undefined;

    const destroySmoothScroll = initSmoothScroll(scrollContainerRef.current);
    return () => {
      if (destroySmoothScroll) destroySmoothScroll();
    };
  }, [imagesReady]);

  useEffect(() => {
    const cleanupUnderline = setupUnderlineHover();
    const cleanupNavUnderline = setupNavUnderline();

    return () => {
      if (cleanupUnderline) cleanupUnderline();
      if (cleanupNavUnderline) cleanupNavUnderline();
    };
  }, [location.pathname]);

  if (!imagesReady) {
    return <Preloader />;
  }

  return (
    <div>
      <ScrollProgress />
      <PageTransition>
        <div ref={scrollContainerRef} data-scroll-container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/privacy-policy" element={<PolicyPage />} />
          </Routes>
          <Footer />
        </div>
      </PageTransition>
      <ConsentBanner />
    </div>
  );
}

export default App;

