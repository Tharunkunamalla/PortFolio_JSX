"use client";

import React, {useState, useEffect} from "react";
import {Github, Linkedin, Instagram} from "lucide-react";

const KANJI_LIST = [
  {char: "侍", title: "Samurai (Warrior)"},
  {char: "武", title: "Bushi (Martial Spirit)"},
  {char: "道", title: "Dō (The Way)"},
  {char: "刃", title: "Yaiba (Blade)"},
  {char: "心", title: "Kokoro (Heart/Mind)"},
  {char: "影", title: "Kage (Shadow)"},
];

const SamuraiAvatar = () => {
  const [activeKanjiIndex, setActiveKanjiIndex] = useState(0);

  // Cycle ambient background kanji periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKanjiIndex((prev) => (prev + 1) % KANJI_LIST.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeKanji = KANJI_LIST[activeKanjiIndex];

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* ========================================================================= */}
      {/* 🖌️ Japanese Ensō Ring & Ambient Kanji Glyphs                             */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Outer Rotating Ensō Ring */}
        <div className="w-[330px] h-[330px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-zinc-400/25 dark:border-zinc-700/35 animate-[spin_50s_linear_infinite] flex items-center justify-center">
          <div className="w-[90%] h-[90%] rounded-full border border-zinc-300/20 dark:border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
        </div>

        {/* Ambient Floating Calligraphy Kanji Watermark */}
        <div
          className="absolute -top-6 -right-6 text-7xl sm:text-8xl font-black text-zinc-900/[0.04] dark:text-white/[0.06] select-none font-serif tracking-widest transition-opacity duration-1000 pointer-events-none"
          title={activeKanji.title}
        >
          {activeKanji.char}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 👤 Samurai Profile Card (Static, Clean, No Seams, Smooth Shimmer)        */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
        {/* Base shadow backdrop plate */}
        <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-zinc-800 transform rotate-3 scale-102 transition-transform duration-500 shadow-xl" />

        {/* Profile Card Container */}
        <div className="group relative w-full h-full rounded-3xl overflow-hidden p-[2px] bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-400 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 shadow-2xl">
          <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
            
            {/* 100% Solid, Clean Avatar Image */}
            <img
              src="/assets/pic.jpg"
              alt="Tharun - Full Stack Developer"
              className="w-full h-full object-cover contrast-110 select-none pointer-events-none"
            />

            {/* Razor Metallic Steel Shimmer Sweep on Hover */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
            </div>


          </div>
        </div>

        {/* ======================================================================= */}
        {/* 🌐 Floating Social Links                                                */}
        {/* ======================================================================= */}
        <div className="absolute -bottom-4 -left-4 z-30 flex items-center gap-2">
          {[
            {
              href: "https://github.com/Tharunkunamalla",
              icon: <Github className="h-4 w-4 transition-colors duration-300" />,
              label: "GitHub",
              hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white",
            },
            {
              href: "https://www.linkedin.com/in/tharun-kunamalla-b9b477288/",
              icon: <Linkedin className="h-4 w-4 transition-colors duration-300" />,
              label: "LinkedIn",
              hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10",
            },
            {
              href: "https://www.instagram.com/__tharun_0509.__/",
              icon: <Instagram className="h-4 w-4 transition-colors duration-300" />,
              label: "Instagram",
              hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F] hover:bg-[#E4405F]/10",
            },
          ].map(({href, icon, label, hoverColor}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 ${hoverColor} shadow-md hover:scale-110 transition-all duration-300 interactive`}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SamuraiAvatar;
