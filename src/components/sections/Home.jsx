"use client";

import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {gsap} from "gsap";
import {Github, Linkedin, Instagram, Mail, Code2, ArrowRight, Eye, Sparkles} from "lucide-react";
import {FaJava} from "react-icons/fa";
import {SiSpringboot, SiMongodb, SiExpress, SiReact, SiNodedotjs} from "react-icons/si";
import {TypeAnimation} from "react-type-animation";
import {useTheme} from "../../context/ThemeContext";
import BackgroundParticles from "../layout/BackgroundParticles";

const coreStack = [
  {name: "Java", icon: <FaJava />, color: "#EA2D2E"},
  {name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F"},
  {name: "MongoDB", icon: <SiMongodb />, color: "#47A248"},
  {name: "Express.js", icon: <SiExpress />, color: "#9ca3af"},
  {name: "React", icon: <SiReact />, color: "#61DAFB"},
  {name: "Node.js", icon: <SiNodedotjs />, color: "#339933"},
];

const BUBBLE_COLORS = [
  "rgba(255, 255, 255, 0.12)",
  "rgba(220, 220, 220, 0.10)",
  "rgba(180, 180, 180, 0.08)",
  "rgba(255, 255, 255, 0.15)",
];

function spawnBubble(container) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = gsap.utils.random(40, 80);
  bubble.style.setProperty("--bubble-size", `${size}px`);

  const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
  bubble.style.setProperty("--bubble-color", color);

  const left = gsap.utils.random(5, 95);
  bubble.style.left = `${left}%`;
  bubble.style.bottom = `-80px`;

  container.appendChild(bubble);

  gsap.to(bubble, {
    y: gsap.utils.random(-window.innerHeight * 0.7, -window.innerHeight * 0.9),
    x: gsap.utils.random(-40, 40),
    scale: gsap.utils.random(0.7, 1.3),
    opacity: gsap.utils.random(0.4, 0.8),
    duration: gsap.utils.random(8, 14),
    ease: "sine.inOut",
    onComplete: () => bubble.remove(),
  });
}

const Home = () => {
  const {theme} = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const exploreRef = useRef(null);
  const bubblesContainerRef = useRef(null);
  const loaderRef = useRef(null);
  const viewsRef = useRef(null);

  const [views, setViews] = useState(() => {
    try {
      const cached = localStorage.getItem("portfolio_views");
      return cached ? parseInt(cached, 10) : 1429;
    } catch {
      return 1429;
    }
  });
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchViews = async () => {
      // 1. Direct fetch from global real-time hits service
      try {
        const directResponse = await fetch("https://hits.sh/tharunkunamalla.vercel.app.svg");
        if (directResponse.ok) {
          const svg = await directResponse.text();
          const match = svg.match(/<title>hits:\s*([0-9,]+)<\/title>/i);
          if (match && match[1]) {
            const hits = parseInt(match[1].replace(/,/g, ""), 10);
            const total = 1428 + hits;
            setViews(total);
            localStorage.setItem("portfolio_views", total.toString());
            return;
          }
        }
      } catch (directErr) {
        console.warn("Direct hits counter failed, trying proxy:", directErr);
      }

      // 2. Try proxy server
      try {
        const response = await fetch("/api/views");
        if (response.ok) {
          const data = await response.json();
          if (data.count) {
            setViews(data.count);
            localStorage.setItem("portfolio_views", data.count.toString());
            return;
          }
        }
      } catch (err) {
        console.warn("Proxy counter failed:", err);
      }

      // 3. Fallback increment
      setViews((prev) => {
        const next = (prev || 1429) + 1;
        try {
          localStorage.setItem("portfolio_views", next.toString());
        } catch {}
        return next;
      });
    };

    fetchViews();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {ease: "power3.out"}});
      tl.from(headingRef.current, {y: 40, opacity: 0, duration: 0.9})
        .from(
          descriptionRef.current,
          {y: 25, opacity: 0, duration: 0.7},
          "-=0.4",
        )
        .from(
          buttonsRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          [exploreRef.current, viewsRef.current],
          {
            opacity: 0,
            duration: 0.5,
            y: 15,
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = bubblesContainerRef.current;
    const loader = loaderRef.current;
    if (!container || !loader) return;

    const loadingTl = gsap.timeline({delay: 1.2});
    loadingTl.to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        setIsLoading(false);
      },
    });

    let running = true;
    function addBubble() {
      if (running && container) {
        spawnBubble(container);
        setTimeout(addBubble, gsap.utils.random(900, 1900));
      }
    }

    for (let i = 0; i < 8; i++) spawnBubble(container);
    addBubble();

    return () => {
      running = false;
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={loaderRef}
          data-app-loader="true"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center transition-all duration-500 overflow-hidden"
        >
          <img
            src="/assets/newload.gif"
            alt="Loading..."
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mix-blend-screen pointer-events-none select-none"
          />
        </div>
      )}

      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-20 md:pt-24 md:pb-16 bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-300"
      >
        <BackgroundParticles />

        {/* Bubbles Container */}
        <div
          ref={bubblesContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{zIndex: 0, filter: "blur(1px)"}}
          aria-hidden="true"
        />

        {/* Monochromatic Glow Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-black/[0.03] dark:bg-white/[0.04] rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-black/[0.02] dark:bg-white/[0.02] rounded-full filter blur-3xl"></div>
        </div>

        <div ref={contentRef} className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="order-2 md:order-1 md:col-span-7">
            {/* Open to work pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase mb-6 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
              </span>
              <span>Available for Opportunities</span>
            </div>

            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4 leading-tight text-black dark:text-white"
            >
              Hi, I am{" "}
              <span className="underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-8">
                Tharun
              </span>
            </h1>

            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "Spring Boot & Java Backend",
                2000,
                "MERN Stack Developer",
                2000,
                "Machine Learning Enthusiast",
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-lg md:text-2xl font-mono font-medium text-zinc-600 dark:text-zinc-400 mb-6"
              repeat={Infinity}
            />

            <p
              ref={descriptionRef}
              className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed font-light"
            >
              Engineering robust backend architectures and scalable full-stack applications using <strong className="font-semibold text-black dark:text-white">Spring Boot</strong>, <strong className="font-semibold text-black dark:text-white">Java</strong>, and the <strong className="font-semibold text-black dark:text-white">MERN Stack</strong>. Focused on high-throughput microservices, clean RESTful APIs, and intelligent digital systems.
            </p>

            {/* Tech Stack Icons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mr-1">
                Core Stack:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {coreStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group relative p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 flex items-center justify-center shadow-xs cursor-pointer"
                    title={tech.name}
                  >
                    <span className="text-xl sm:text-2xl transition-transform duration-300" style={{color: tech.color}}>
                      {tech.icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => navigate("/projects")}
                className="interactive px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm tracking-wider uppercase hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <Code2 className="h-4 w-4" />
                View Projects
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="interactive px-7 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm tracking-wider uppercase hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="order-1 md:order-2 md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-3xl bg-zinc-200 dark:bg-zinc-800 transform rotate-3 scale-102 transition-transform duration-500" />
              <img
                src="/assets/pic.jpg"
                alt="Tharun - Full Stack Developer"
                className="relative z-10 w-full h-full object-cover rounded-3xl contrast-110 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-float"
              />
              {/* Floating Social Icons */}
              <div className="absolute -bottom-4 -left-4 z-20 flex gap-2">
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
        </div>

        {/* Explore More Link to About */}
        <div
          ref={exploreRef}
          className="container mx-auto px-6 md:px-12 mt-12 md:mt-16 flex items-center justify-between relative z-20"
        >
          <button
            onClick={() => navigate("/about")}
            className="group flex items-center gap-3 text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <span>Explore Story & Experience</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          {/* Visitor Counter Badge */}
          <div
            ref={viewsRef}
            className="select-none"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm text-xs font-mono">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                {views !== null ? (
                  <>
                    <span className="font-bold text-black dark:text-white">{views.toLocaleString()}</span> views
                  </>
                ) : (
                  <span className="opacity-50">Loading...</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
