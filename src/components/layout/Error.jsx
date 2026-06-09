import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark-100 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background blobs for modern aesthetics (animations removed as requested) */}
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:bg-primary-600/20 dark:mix-blend-lighten"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-secondary-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:bg-secondary-600/20 dark:mix-blend-lighten"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-accent-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:bg-accent-600/20 dark:mix-blend-lighten"></div>

      <div className="max-w-md w-full space-y-8 text-center relative z-10 glass-panel p-8 md:p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-dark-200/40">
        
        {/* GIF added here with pixelated rendering to fix blurriness */}
        <div className="flex justify-center">
          <img 
            src="/assets/404 error.gif" 
            alt="404 Error" 
            className="w-auto h-auto max-w-full object-contain drop-shadow-xl" 
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div className="mt-8">
          <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white transition-all duration-300 ease-in-out bg-primary-600 border border-transparent rounded-full hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 overflow-hidden dark:focus:ring-offset-dark-100"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black/20"></span>
            <Home className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="relative font-heading">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
