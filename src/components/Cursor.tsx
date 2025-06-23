import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;

    // Hide system cursor
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e: MouseEvent) => {
      // Position the cursor dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      
      // Position the cursor outer circle with a slight delay for the trailing effect
      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    
    // Handle cursor over interactive elements
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3,
      });
      gsap.to(cursorOuter, {
        scale: 1.5,
        duration: 0.3,
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.3,
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    // Add effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    
    return () => {
      // Clean up
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-secondary-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-8 h-8 border border-secondary-400 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
};

export default Cursor;