import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
import { useTerminal } from '../../context/TerminalContext';

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const location = useLocation();
  const { isTerminalOpen } = useTerminal();
  const is3DPage = location.pathname === '/projects-3d';

  useEffect(() => {
    if (is3DPage || isTerminalOpen) {
      document.body.style.cursor = 'auto';
      return;
    }

    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;

    // Hide system cursor
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e) => {
      // Position the cursor dot instantly without drift
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
      
      // Position the cursor outer circle with snappy following
      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };
    
    // Handle cursor over interactive elements
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.2,
      });
      gsap.to(cursorOuter, {
        scale: 1.5,
        duration: 0.2,
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      });
      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.2,
      });
    };
    
    // Add event listeners on window to track throughout drags
    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
    // Add effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    
    return () => {
      // Clean up
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, [is3DPage, isTerminalOpen]);

  if (is3DPage || isTerminalOpen) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[120] transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-7 h-7 border border-white/60 rounded-full pointer-events-none z-[110] transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
};

export default Cursor;