import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import codingAnimation from "../sections/Coding.json";

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
      className="py-20 bg-light-200 dark:bg-dark-200"
    >
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                I'm a{" "}
                <span className="text-secondary-500 font-bold drop-shadow-md">
                  passionate Frontend Developer
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
                className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-4 md:p-5 hover:shadow-2xl transition-shadow duration-500"
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
    </section>
  );
};

export default About;
