import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {
  Code,
  Database,
  Wrench,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiVite,
  SiFigma,
  SiGraphql,
  SiPython,
  SiPhp,
  SiRos,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiOpencv,
  SiLinux,
  SiGooglecloud,
  SiJupyter,
  SiGooglecolab,
  SiPostman,
  SiBlender,
  SiBootstrap,
  SiVercel,
} from "react-icons/si";
import {FaJava} from "react-icons/fa";
import {BiCodeAlt} from "react-icons/bi";
import {VscCode} from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  // Frontend
  {name: "HTML5", icon: <SiHtml5 />, level: 9, category: "frontend"},
  {name: "CSS3", icon: <SiCss3 />, level: 9, category: "frontend"},
  {name: "JavaScript", icon: <SiJavascript />, level: 8, category: "frontend"},
  {name: "TypeScript", icon: <SiTypescript />, level: 7, category: "frontend"},
  {name: "React.js", icon: <SiReact />, level: 8, category: "frontend"},
  {name: "Redux", icon: <SiRedux />, level: 7, category: "frontend"},
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    level: 9,
    category: "frontend",
  },
  {
    name: "BootStrap CSS",
    icon: <SiBootstrap />,
    level: 9,
    category: "frontend",
  },
  {name: "GSAP", icon: <SiGreensock />, level: 7, category: "frontend"},

  // Backend
  {name: "Java", icon: <FaJava />, level: 9, category: "backend"},
  {name: "Python", icon: <SiPython />, level: 8, category: "tools"},
  {name: "Express.js", icon: <SiExpress />, level: 7, category: "backend"},
  {name: "Node.js", icon: <SiNodedotjs />, level: 7, category: "backend"},
  {name: "MongoDB", icon: <SiMongodb />, level: 7, category: "backend"},
  {name: "SQL", icon: <SiMysql />, level: 7, category: "backend"},
  {name: "PHP", icon: <SiPhp />, level: 7, category: "backend"},
  {name: "C++", icon: <BiCodeAlt />, level: 6, category: "backend"},
  {name: "C", icon: <BiCodeAlt />, level: 8, category: "backend"},

  // Tools & Workflows
  {name: "ROS", icon: <SiRos />, level: 6, category: "tools"},
  {name: "NumPy", icon: <SiNumpy />, level: 8, category: "tools"},
  {name: "Pandas", icon: <SiPandas />, level: 8, category: "tools"},
  {name: "Matplotlib", icon: <SiPlotly />, level: 7, category: "tools"},
  {name: "OpenCV", icon: <SiOpencv />, level: 8, category: "tools"},
  {name: "Git", icon: <SiGit />, level: 8, category: "tools"},
  {name: "VS Code", icon: <VscCode />, level: 9, category: "tools"},
  {name: "Linux", icon: <SiLinux />, level: 7, category: "tools"},
  {name: "GCP", icon: <SiGooglecloud />, level: 7, category: "tools"},
  {name: "Jupyter Notebook", icon: <SiJupyter />, level: 8, category: "tools"},
  {name: "Google Colab", icon: <SiGooglecolab />, level: 8, category: "tools"},
  {name: "Postman", icon: <SiPostman />, level: 7, category: "tools"},
  {name: "Figma", icon: <SiFigma />, level: 7, category: "tools"},
  {name: "Blender", icon: <SiBlender />, level: 6, category: "tools"},
  {name: "Vercel", icon: <SiVercel />, level: 8, category: "tools"},
  {name: "Firebase", icon: <SiFirebase />, level: 7, category: "tools"},
  {name: "Vite", icon: <SiVite />, level: 7, category: "tools"},
  {name: "GraphQL", icon: <SiGraphql />, level: 7, category: "tools"},
];

const groupedSkills = skillsData.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {});

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const categoryRefs = useRef([]);
  const skillBarRefs = useRef([]);
  const [showAllTools, setShowAllTools] = useState(false);

  categoryRefs.current = Array(Object.keys(groupedSkills).length).fill(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      });

      categoryRefs.current.forEach((category, index) => {
        if (category) {
          gsap.from(category, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.3 * index,
            scrollTrigger: {
              trigger: category,
              start: "top 95%",
              toggleActions: "play none none reset",
            },
          });
        }
      });

      skillBarRefs.current.forEach((bar, i) => {
        if (bar) {
          let flatIndex = 0;
          let skillLevel = 0;
          let found = false;
          Object.keys(groupedSkills).forEach((category) => {
            groupedSkills[category].forEach((skill) => {
              if (flatIndex === i) {
                skillLevel = skill.level * 10;
                found = true;
              }
              flatIndex++;
            });
          });

          if (found) {
            gsap.fromTo(
              bar,
              {width: "0%"},
              {
                width: `${skillLevel}%`,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: bar,
                  start: "top 95%",
                  toggleActions: "play none none reset",
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [showAllTools]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "frontend":
        return <Code className="h-6 w-6 text-primary-500" />;
      case "backend":
        return <Database className="h-6 w-6 text-secondary-500" />;
      case "tools":
        return <Wrench className="h-6 w-6 text-accent-500" />;
      case "other":
        return <Layers className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case "frontend":
        return "Frontend Development";
      case "backend":
        return "Backend Development";
      case "tools":
        return "Tools & Workflows";
      case "other":
        return "Other Skills";
      default:
        return category;
    }
  };

  let barFlatIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-light-100 dark:bg-dark-100"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">Skills</span>
        </h2>

        <div className="grid gap-10">
          {Object.keys(groupedSkills).map((category, categoryIndex) => {
            const isToolsCategory = category === "tools";
            const skillsToShow =
              isToolsCategory && !showAllTools
                ? groupedSkills[category].slice(0, 8)
                : groupedSkills[category];

            return (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[categoryIndex] = el)}
                className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-6 md:p-8"
              >
                <div className="flex items-center mb-6">
                  {getCategoryIcon(category)}
                  <h3 className="text-xl md:text-2xl font-semibold ml-3 text-gray-800 dark:text-white">
                    {getCategoryTitle(category)}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skillsToShow.map((skill) => {
                    const currentIndex = barFlatIndex++;
                    return (
                      <div
                        key={skill.name}
                        className="group hover:bg-light-200 dark:hover:bg-dark-200 p-4 rounded-lg transition-colors duration-300"
                      >
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">{skill.icon}</span>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {skill.name}
                          </h4>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            ref={(el) =>
                              (skillBarRefs.current[currentIndex] = el)
                            }
                            className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:animate-pulse"
                            style={{width: "0%"}}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>Beginner</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isToolsCategory && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowAllTools((prev) => !prev)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary-500 hover:underline"
                    >
                      {showAllTools ? (
                        <>
                          Show less <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show all Tools & Workflows{" "}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;