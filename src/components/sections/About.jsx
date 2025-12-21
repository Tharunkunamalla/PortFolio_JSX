import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lottie from "lottie-react"; // Ensure the casing matches the actual directory
import codingAnimation from "../sections/Coding.json";
import BackgroundParticles from "../BackgroundParticles";
// import Snowfall from "react-snowfall";

gsap.registerPlugin(ScrollTrigger);

const aboutData = [
  {
    id: 1,
    title: "Education",
    items: [
      {
        name: "B.Tech in Computer Science",
        date: "2023 - 2027",
        description: "IIIT- Kottayam, Kerala",
      },
      {
        name: "Intermediate Education",
        date: "2020 - 2022",
        description: "Hanamkonda, Telangana",
      },
      {
        name: "High School",
        date: "2019 - 2020",
        description: "Shine High School, Hanamkonda, Telangana",
      },
    ],
  },
  {
    id: 2,
    title: "Certifications",
    items: [
      {name: "Machine Learning", date: "2025", description: "Coursera"},
      {
        name: "Cloud Essentials Knowledge Badge Assessment",
        date: "2024",
        description: "AWS Training and Certification",
      },
      {
        name: "HackerRank Java Certification",
        date: "2024",
        description: "HackerRank",
      },
      {name: "Basics of Cloud Computing", date: "2025", description: "Udemy"},
    ],
  },
  {
    id: 3,
    title: "Experience",
    items: [
      {
        name: "GSSoC- 25 Contributor",
        date: "2025",
        description: "GirlScript Foundation",
      },
      {
        name: "Open Source Contribution India",
        date: "2025",
        description: "Various Open Source Projects",
      },
      {
        name: "Sub-Lead of Robotics Club-IIIT-K",
        date: "2024 - 2025",
        description: "BETA-LABS, IIIT-Kottayam",
      },
      {name: "AI-ML Intern", date: "2025", description: "Labmentix, Bengaluru"},
      {name: "AI-ML Intern", date: "2025", description: "EDUNET-Microsoft"},
    ],
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const infoRef = useRef(null);
  const lottieRef = useRef(null);
  const introTextRef = useRef(null);
  const paragraphsRef = useRef([]);
  const buttonRef = useRef(null);
  const boxesRef = useRef(null);
  const boxRefs = useRef([]);
  const lineRefs = useRef([]);

  boxRefs.current = Array(aboutData.length).fill(null);
  lineRefs.current = [];

  const introTitleRef = useRef(null);
  const gradientTextRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(lottieRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(introTextRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      paragraphsRef.current.forEach((para, index) => {
        gsap.from(para, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.3 + index * 0.2,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Title animation
      gsap.from(introTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Gradient text subtle pop
      gsap.from(gradientTextRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Underline draw animation
      gsap.to(underlineRef.current, {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      boxRefs.current.forEach((box, index) => {
        if (box) {
          gsap.from(box, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: boxesRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          });
        }
      });

      lineRefs.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          {height: "0%"},
          {
            height: "100%",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 90%",
              end: "bottom 10%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden"
    >
      <BackgroundParticles />
      {/* <Snowfall color="#82C3D9" /> */}

      <div
        className="
    absolute top-0 left-0 right-0 h-24
    bg-gradient-to-b
    from-white/80 to-transparent
    dark:from-black/60
  "
      />
      {/* ===== TOP BLEND ===== */}
      <div
        className="
            pointer-events-none absolute top-0 inset-x-0 h-24 z-10
            bg-gradient-to-b
            from-white/80 to-transparent
            dark:from-black/60
          "
      />

      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white"
        >
          About <span className="text-secondary-500">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center relative">
          <div
            ref={infoRef}
            className="flex flex-col justify-center items-center min-h-[500px] relative"
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-72 h-72 rounded-full blur-3xl bg-purple-400 opacity-20 absolute" />
            </div>

            <div ref={lottieRef} className="w-64 h-64 z-10">
              <Lottie animationData={codingAnimation} loop={true} />
            </div>

            <div
              ref={introTextRef}
              className="w-full flex flex-col items-center z-10"
            >
              <h3
                ref={introTitleRef}
                className="text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-white"
              >
                I'm a{" "}
                <span
                  ref={gradientTextRef}
                  className="
      relative inline-block
      font-extrabold
      bg-clip-text text-transparent
      bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500
    "
                >
                  MERN-Stack Developer
                  <span
                    ref={underlineRef}
                    className="
        absolute left-0 -bottom-1 h-[2px]
        bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500
        rounded-full
        w-0
      "
                  />
                </span>
              </h3>

              <p
                ref={(el) => (paragraphsRef.current[0] = el)}
                className="text-gray-600 dark:text-gray-300 mt-3 text-center text-sm leading-relaxed"
              >
                I specialize in creating responsive and interactive web
                applications with modern technologies. My journey in web
                development started during my college years, and since then,
                I've been constantly learning and still improving my skills.
              </p>
              <p
                ref={(el) => (paragraphsRef.current[1] = el)}
                className="text-gray-600 dark:text-gray-300 text-center mt-3 text-sm leading-relaxed"
              >
                I enjoy creating smooth user experiences and solving problems
                with clean, efficient code. I work with React, Javascript,
                Tailwind CSS, and other modern frontend tools.
              </p>
              <p
                ref={(el) => (paragraphsRef.current[2] = el)}
                className="text-gray-600 dark:text-gray-300 text-center mt-3 text-sm leading-relaxed"
              >
                Outside of coding, I'm focused on learning Data Structures and
                Algorithms <span className="text-secondary-500">(DSA)</span>
                and enjoy solving challenging problems to improve my skills.
              </p>

              <div className="pt-6">
                <button
                  ref={buttonRef}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/tharun-kunamalla-b9b477288/",
                      "_blank"
                    )
                  }
                  className="interactive px-6 py-2.5 rounded-full border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all duration-300 font-medium"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          <div ref={boxesRef} className="grid grid-cols-1 gap-6">
            {aboutData.map((box, index) => (
              <div
                key={box.id}
                ref={(el) => (boxRefs.current[index] = el)}
                className="rounded-2xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10 shadow-lg p-4 md:p-5 hover:shadow-2xl transition-shadow duration-500"
              >
                <h3 className="text-lg font-semibold text-secondary-500 mb-3">
                  {box.title}
                </h3>
                <div className="space-y-3">
                  {box.items.map((item, i) => (
                    <div key={i} className="relative pl-4 py-2">
                      <span
                        ref={(el) => (lineRefs.current[index * 10 + i] = el)}
                        className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
                        style={{height: "0%"}}
                      />
                      <h4
                        className={`font-medium ${
                          i % 2 === 0
                            ? "text-primary-500"
                            : "text-secondary-500"
                        }`}
                      >
                        {item.name}
                      </h4>
                      {item.date && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ===== BOTTOM BLEND (KEY PART) ===== */}
      <div
        className="
            pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10
            bg-gradient-to-t
            from-white/90 to-transparent
            dark:from-black/80
          "
      />
    </section>
  );
};

export default About;
