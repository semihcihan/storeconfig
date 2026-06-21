"use client";

import { useEffect } from "react";

export function ScrollSnapManager() {
  useEffect(() => {
    const checkAndEnableScrollSnap = () => {
      const container = document.querySelector(".scroll-snap-container");
      if (!container) return;

      const sections = container.querySelectorAll("section");
      if (sections.length === 0) return;

      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - headerHeight;
      let allSectionsFit = true;

      sections.forEach((section) => {
        const contentElement = section.firstElementChild as HTMLElement;
        if (!contentElement) {
          allSectionsFit = false;
          return;
        }

        const contentRect = contentElement.getBoundingClientRect();
        const contentHeight = contentRect.height;

        if (contentHeight > availableHeight) {
          allSectionsFit = false;
        }
      });

      const html = document.documentElement;
      if (allSectionsFit) {
        html.style.scrollSnapType = "y mandatory";
      } else {
        html.style.scrollSnapType = "none";
      }
    };

    const runCheck = () => {
      requestAnimationFrame(() => {
        checkAndEnableScrollSnap();
      });
    };

    runCheck();

    const resizeObserver = new ResizeObserver(() => {
      runCheck();
    });

    const scrollContainer = document.querySelector(".scroll-snap-container");
    if (scrollContainer) {
      resizeObserver.observe(scrollContainer);
      const sections = scrollContainer.querySelectorAll("section");
      sections.forEach((section) => {
        resizeObserver.observe(section);
        const contentElement = section.firstElementChild;
        if (contentElement) {
          resizeObserver.observe(contentElement);
        }
      });
    }

    const header = document.querySelector("header");
    if (header) {
      resizeObserver.observe(header);
    }

    window.addEventListener("resize", runCheck);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", runCheck);
    };
  }, []);

  return null;
}
