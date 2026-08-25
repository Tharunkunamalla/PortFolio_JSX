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

    // Hide system cursor by default
    document.body.style.cursor = 'none';

    let isOverScrollbar = false;
    
    const onMouseMove = (e) => {
      // Check if mouse is near right scrollbar gutter of viewport or scrollable container
      const isNearViewportScrollbar = (window.innerWidth - e.clientX) <= 16;
      let isNearInnerScrollbar = false;

      try {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el) {
          const scrollParent = el.closest('.overflow-y-auto, .overflow-y-scroll, .terminal-scrollbar');
          if (scrollParent) {
            const rect = scrollParent.getBoundingClientRect();
            if (rect.right - e.clientX <= 14 && rect.right - e.clientX >= -2) {
              isNearInnerScrollbar = true;
            }
          }
        }
      } catch {}

      if (isNearViewportScrollbar || isNearInnerScrollbar) {
        if (!isOverScrollbar) {
          isOverScrollbar = true;
          document.body.style.cursor = 'auto';
          gsap.to([cursor, cursorOuter], { opacity: 0, duration: 0.1, overwrite: 'auto' });
        }
        return;
      } else {
        if (isOverScrollbar) {
          isOverScrollbar = false;
          document.body.style.cursor = 'none';
          gsap.to([cursor, cursorOuter], { opacity: 1, duration: 0.1, overwrite: 'auto' });
        }
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
      if (isOverScrollbar) return;
      const isInteractive = e.target && e.target.closest('a, button, .interactive, [role="button"], input, textarea, select');
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
      if (!isOverScrollbar) {
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
      document.body.style.cursor = 'auto';
    };
  }, [is3DPage, isTerminalOpen]);

  if (is3DPage || isTerminalOpen) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[99999] transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-7 h-7 border border-white/60 rounded-full pointer-events-none z-[99998] transform -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
};

export default Cursor;