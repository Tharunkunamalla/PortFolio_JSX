import {ArrowLeft} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const is3DPage = location.pathname === "/projects-3d";

  const releasePointerLock = () => {
    window.dispatchEvent(new Event("pause-3d-controls"));
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  const handleReturnToProjects = () => {
    navigate("/", {state: {scrollTo: "projects"}});
  };

  return (
    <footer
      data-cursor-ignore="true"
      onPointerDownCapture={releasePointerLock}
      onMouseDownCapture={releasePointerLock}
      className="bg-light-200 dark:bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden py-10 border-t border-gray-300 dark:border-gray-700 shadow-inner"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <a
            data-cursor-ignore="true"
            href="#home"
            className="text-gray-900 dark:text-white font-extrabold tracking-tight"
          >
            {/* Mobile */}
            <span className="block md:hidden text-3xl leading-tight">
              <span className="text-secondary-500 drop-shadow text-4xl">T</span>
              <span className="drop-shadow text-2xl">harun Kunamalla</span>
            </span>
            {/* Desktop */}
            <span className="hidden md:block text-4xl leading-tight">
              <span className="text-secondary-500 drop-shadow">T</span>
              harun <span className="text-secondary-500">K</span>
            </span>
          </a>

          {/* Footer Text */}
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm md:text-base flex flex-col md:flex-row items-center gap-1">
            <span>&copy; {currentYear} Tharun. All rights reserved.</span>
            <span className="text-md font-semibold text-secondary-600 dark:text-secondary-400">
              Shinzou wo Sasageyo ✊
            </span>
          </p>

          {is3DPage && (
            <button
              type="button"
              onClick={handleReturnToProjects}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Return Home</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
