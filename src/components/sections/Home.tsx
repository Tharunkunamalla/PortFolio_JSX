import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {
  ArrowDownCircle,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Code2,
} from "lucide-react";
import {TypeAnimation} from "react-type-animation";

gsap.registerPlugin(MotionPathPlugin);

interface HomeProps {
  scrollToSection: (sectionId: string) => void;
}

const BUBBLE_COLORS = [
  "rgba(100, 100, 255, 0.22)",
  "rgba(0, 200, 255, 0.20)",
  "rgba(255, 0, 200, 0.20)",
  "rgba(0, 255, 200, 0.20)",
  "rgba(255, 255, 255, 0.17)",
];

function spawnBubble(container: HTMLDivElement) {
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
    opacity: gsap.utils.random(0.5, 0.85),
    duration: gsap.utils.random(8, 14),
    ease: "sine.inOut",
    onComplete: () => bubble.remove(),
  });
}

const Home: React.FC<HomeProps> = ({scrollToSection}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const bubblesContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {ease: "power3.out"}});
      tl.from(headingRef.current, {y: 50, opacity: 0, duration: 1})
        .from(
          descriptionRef.current,
          {y: 30, opacity: 0, duration: 0.8},
          "-=0.4"
        )
        .from(
          buttonsRef.current,
          {y: 30, opacity: 0, duration: 0.8, stagger: 0.15},
          "-=0.4"
        )
        .from(
          scrollDownRef.current,
          {opacity: 0, duration: 0.5, y: 20},
          "-=0.2"
        );

      gsap.to(scrollDownRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = bubblesContainerRef.current;
    const loader = loaderRef.current;
    if (!container || !loader) return;

    const loadingTl = gsap.timeline({delay: 1.5});

    loadingTl.to(loader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        loader.style.display = "none";
      },
    });

    let running = true;
    function addBubble() {
      if (running && container) {
        spawnBubble(container);
        setTimeout(addBubble, gsap.utils.random(800, 1800));
      }
    }

    for (let i = 0; i < 10; i++) spawnBubble(container);
    addBubble();

    return () => {
      running = false;
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-light-100 dark:bg-dark-100 flex items-center justify-center transition-all duration-500"
      >
        <img
          src="/assets/loader.gif"
          alt="Loading..."
          className="w-28 h-28 object-contain"
        />
      </div>

      {/* Main Section */}
      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex items-center pt-16 pb-8 bg-light-100 dark:bg-dark-100"
      >
        {/* Bubbles */}
        <div
          ref={bubblesContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{zIndex: 0, filter: "blur(1px)"}}
          aria-hidden="true"
        />

        {/* Colored blurred circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary-200/20 dark:bg-secondary-900/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-200/20 dark:bg-accent-900/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="text-gray-800 dark:text-white">Hi, I am </span>
              <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-transparent bg-clip-text">
                Tharun
              </span>
            </h1>

            {/* Typing animation */}
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                2000,
                "Full Stack Developer",
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-xl md:text-2xl font-medium text-primary-600 dark:text-primary-400 mb-6"
              repeat={Infinity}
            />

            <p
              ref={descriptionRef}
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            >
              Skilled in FrontEnd Development and Full Stack Development,
              looking for opportunities to enhance my skills
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Currently open to work
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="interactive px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="interactive px-6 py-3 rounded-full border-2 border-secondary-500 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-500/20 font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 bg-transparent"
              >
                <Code2 className="h-5 w-5" />
                View Projects
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img
                src="/assets/img.png"
                alt="Tharun - Frontend Developer"
                className="w-full h-full object-cover rounded-3xl animate-float"
              />
              <div className="md:hidden absolute -left-4 flex flex-col space-y-4 top-1/2 transform -translate-y-1/2">
                <a
                  href="https://github.com/Tharunkunamalla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-dark-200 flex items-center justify-center text-gray-800 dark:text-white shadow-md hover:bg-secondary-500 hover:text-white transition-all duration-300 interactive"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tharun-kunamalla-b9b477288/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-dark-200 flex items-center justify-center text-gray-800 dark:text-white shadow-md hover:bg-secondary-500 hover:text-white transition-all duration-300 interactive"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/__tharun_0509.__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white dark:bg-dark-200 flex items-center justify-center text-gray-800 dark:text-white shadow-md hover:bg-secondary-500 hover:text-white transition-all duration-300 interactive"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollDownRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-300 flex flex-col items-center interactive cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDownCircle className="h-6 w-6" />
        </div>
      </section>
    </>
  );
};

export default Home;
