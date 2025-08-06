import {Heart} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-200 dark:bg-dark-200 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#home"
              className="text-lg md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {/* Mobile */}
              <span className="block md:hidden">
                <span className="text-secondary-500 drop-shadow-md text-4xl">
                  T
                </span>
                <span className="drop-shadow-md text-2xl">harun Kunamalla</span>
              </span>
              {/* Desktop */}
              <span className="hidden md:block">
                <span className="text-secondary-500 drop-shadow-md text-4xl">
                  T
                </span>
                harun K
              </span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center md:justify-end">
              &copy; {currentYear} Tharun. All rights reserved. shinzou sasageyo
              <span className="text-red-500 text-xl">✊</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
