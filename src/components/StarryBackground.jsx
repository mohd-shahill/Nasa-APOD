import React, { useEffect, useRef } from "react";
import "../styles/StarryBackground.css"; // Ensure correct path

const StarryBackground = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const numStars = 50; // Number of stars
    const starsContainer = starsRef.current;

    if (!starsContainer) return; // Ensure container exists before adding stars

    starsContainer.innerHTML = ""; // Clear existing stars before adding new ones

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Generate random properties for each star
      star.style.setProperty("--star-tail-length", `${Math.random() * 6 + 3}em`);
      star.style.setProperty("--top-offset", `${Math.random() * 100}vh`);
      star.style.setProperty("--fall-duration", `${Math.random() * 6 + 4}s`);
      star.style.setProperty("--fall-delay", `${Math.random() * 5}s`);

      starsContainer.appendChild(star);
    }
  }, []);

  return <div className="stars" ref={starsRef}></div>;
};

export default StarryBackground;
