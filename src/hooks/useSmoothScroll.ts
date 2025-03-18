"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Customize the scrolling duration
      smoothWheel: true, // Smooth scrolling with the mouse wheel
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
