import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AboutBox} from "../../types";

gsap.registerPlugin(ScrollTrigger);

const aboutData: AboutBox[] = [
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
        description: "Hanamkonda, Telangana",
      },
    ],
  },
  {
    id: 2,
    title: "Certifications",
    items: [
      {
        name: "Machine Learning",
        date: "2025",
        description: "Coursera",
      },
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
      {
        name: "Basics of Cloud Computing",
        date: "2025",
        description: "Udemy",
      },
    ],
  },
  {
    id: 3,
    title: "Experience",
    items: [
      {
        name: "Sub-Lead of Robotics Club-IIIT-K",
        date: "2024 - 2025",
        description: "BETA-LABS, IIIT-Kottayam",
      },
    ],
  },
  {
    id: 4,
    title: "Achievements",
    items: [
      {
        name: "Will add",
        date: "202*",
        description: "lorem ipsum dolor sit amet",
      },
      {
        name: "Will add",
        date: "202*",
        description: "lorem ipsum dolor sit amet",
      },
    ],
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  boxRefs.current = Array(aboutData.length).fill(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });

      gsap.from(infoRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
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
              toggleActions: "play none none reset",
            },
          });
        }
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

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Left: Centered vertically and horizontally */}
          <div
            ref={infoRef}
            className="flex flex-col justify-center items-center md:items-center h-full min-h-[400px] md:min-h-[500px] space-y-6"
          >
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                I'm a{" "}
                <span className="text-secondary-500 font-bold drop-shadow-md">
                  passionate Frontend Developer
                </span>
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-4 text-center">
                I specialize in creating responsive and interactive web
                applications with modern technologies. My journey in web
                development started during my college years, and since then,
                I've been constantly learning and still improving my skills.
              </p>
              <br />

              <p className="text-gray-600 dark:text-gray-300 text-center">
                I enjoy creating smooth user experiences and solving problems
                with clean, efficient code. I work with React, Javascript,
                Tailwind CSS, and other modern frontend tools.
              </p>
              <br />
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Outside of coding, I’m focused on learning Data Structures and
                Algorithms <span className="text-secondary-500">(DSA)</span> and
                enjoy solving challenging problems to improve my skills.
              </p>

              <div className="pt-4">
                <button
                  onClick={() =>
                    window.open(
                      // "https://drive.google.com/file/d/19fz2-Im_FpQ_N5Ebv95vW2Ns_MqDAkuP/view?usp=sharing",
                      "https://www.linkedin.com/in/tharun-kunamalla-b9b477288//",
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

          {/* Right: About boxes */}
          <div ref={boxesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.map((box, index) => (
              <div
                key={box.id}
                ref={(el) => (boxRefs.current[index] = el)}
                className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-6 hover:shadow-2xl transition-shadow duration-500"
              >
                <h3 className="text-xl font-semibold text-secondary-500 mb-4">
                  {box.title}
                </h3>

                <div className="space-y-4">
                  {box.items.map((item, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1" // For left border
                    >
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
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
