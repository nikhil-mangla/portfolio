import React, { useEffect, useRef, useCallback } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const requestId = useRef(null);
  const currentScroll = useRef(0);

  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  const animateBlobs = useCallback(() => {
    const newScroll = window.pageYOffset;
    const scrollDelta = newScroll - currentScroll.current;
    currentScroll.current = newScroll;

    blobRefs.current.forEach((blob, index) => {
      if (!blob) return; // Null check for conditional elements

      const initialPos = initialPositions[index];
      const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340;
      const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40;

      const x = initialPos.x + xOffset;
      const y = initialPos.y + yOffset;

      blob.style.transform = `translate(${x}px, ${y}px)`;
      blob.style.transition = "transform 1.4s ease-out";
    });

    requestId.current = requestAnimationFrame(animateBlobs);
  }, [initialPositions]);

  const handleScroll = useCallback(() => {
    if (!requestId.current) {
      requestId.current = requestAnimationFrame(animateBlobs);
    }
  }, [animateBlobs]);

  useEffect(() => {
    // Initialize with first animation frame
    requestId.current = requestAnimationFrame(animateBlobs);
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
      // Cleanup refs
      blobRefs.current = [];
    };
  }, [handleScroll, animateBlobs]);

  // Helper function to safely assign refs
  const setBlobRef = (index) => (ref) => {
    if (ref) {
      blobRefs.current[index] = ref;
    }
  };

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0">
        {/* Blob 1 - Always visible */}
        <div
          ref={setBlobRef(0)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        />
        
        {/* Blob 2 - Hidden on mobile */}
        <div
          ref={setBlobRef(1)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
        />
        
        {/* Blob 3 - Always visible */}
        <div
          ref={setBlobRef(2)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
        />
        
        {/* Blob 4 - Hidden on mobile */}
        <div
          ref={setBlobRef(3)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
        />
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};

export default AnimatedBackground;