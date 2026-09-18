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
    // Check if device is touch-only without a precision mouse pointer
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchOnly || is3DPage || isTerminalOpen) {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;

    // Apply global CSS class to hide native OS cursor everywhere
    document.documentElement.classList.add('custom-cursor-active');
    document.body.classList.add('custom-cursor-active');

    // Initial state: hidden until mouse moves into view
    gsap.set([cursor, cursorOuter], { opacity: 0 });

    let hasMoved = false;

    const onMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([cursor, cursorOuter], { opacity: 1, duration: 0.15, overwrite: 'auto' });
      }

      // Position the cursor dot instantly without latency
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
    
    // Delegated hover detection for interactive elements
    const onMouseOver = (e) => {
      const isInteractive = e.target && e.target.closest('a, button, .interactive, [role="button"], input, textarea, select, label, [data-cursor-pointer], summary');
      if (isInteractive) {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.2, overwrite: 'auto' });
        gsap.to(cursorOuter, { scale: 1.5, duration: 0.2, overwrite: 'auto' });
      } else {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.to(cursorOuter, { scale: 1, duration: 0.2, overwrite: 'auto' });
      }
    };

    const onMouseLeaveWindow = () => {
      gsap.to([cursor, cursorOuter], { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const onMouseEnterWindow = () => {
      if (hasMoved) {
        gsap.to([cursor, cursorOuter], { opacity: 1, duration: 0.15, overwrite: 'auto' });
      }
    };

    // Attach global listeners
    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    
    return () => {
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
    };
  }, [is3DPage, isTerminalOpen]);

  if (is3DPage || isTerminalOpen) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none select-none z-[99999] transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ mixBlendMode: 'difference', pointerEvents: 'none' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-7 h-7 border border-white/60 rounded-full pointer-events-none select-none z-[99998] transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ mixBlendMode: 'difference', pointerEvents: 'none' }}
      />
    </>
  );
};

export default Cursor;