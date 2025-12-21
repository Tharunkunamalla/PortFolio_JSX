import {useEffect, useRef} from "react";
import {SiMonkeytype} from "react-icons/si";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import BackgroundParticles from "../BackgroundParticles";

gsap.registerPlugin(ScrollTrigger);

const MonkeyTypeStats = () => {
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  const stats = {
    username: "k.tharun",
    testsStarted: 17566,
    testsCompleted: 3757,
    timeTyping: "33h 18m",
    currentStreak: "14 days",
    wordsBest: {
      10: {wpm: 119, acc: "100%"},
      25: {wpm: 88, acc: "96%"},
      50: {wpm: 74, acc: "97%"},
      100: {wpm: 68, acc: "94%"},
    },

    timeBest: {
      15: 93,
      30: 68,
      60: 55,
      120: 48,
    },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cardRefs.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRefs.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="typing"
      className="relative py-24 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden"
    >
      {/* Background */}
      <BackgroundParticles />
      {/* ===== TOP BLEND ===== */}
      <div
        className="
            pointer-events-none absolute top-0 inset-x-0 h-24 z-10
            bg-gradient-to-b
            from-white/80 to-transparent
            dark:from-black/60
          "
      />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <SiMonkeytype className="text-yellow-400 text-3xl" />
            <h2 className="text-2xl font-semibold">Typing Stats</h2>
          </div>

          <a
            href="https://monkeytype.com/profile/k.tharun"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-yellow-400 hover:underline"
          >
            View Profile →
          </a>
        </div>

        {/* Main stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Time based */}
          {[15, 30, 60, 120].map((time) => (
            <Stat
              key={time}
              label={`${time}s Best`}
              value={`${stats.timeBest[time]} WPM`}
              refFn={(el) => cardRefs.current.push(el)}
            />
          ))}
          <Stat
            label="Tests Started"
            value={stats.testsStarted}
            refFn={(el) => cardRefs.current.push(el)}
          />
          <Stat
            label="Tests Completed"
            value={stats.testsCompleted}
            refFn={(el) => cardRefs.current.push(el)}
          />
          <Stat
            label="Current Streak"
            value={stats.currentStreak}
            refFn={(el) => cardRefs.current.push(el)}
          />
          <Stat
            label="Time Typing"
            value={stats.timeTyping}
            refFn={(el) => cardRefs.current.push(el)}
          />
        </div>

        {/* Time based */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[15, 30, 60, 120].map((time) => (
            <Stat
              key={time}
              label={`${time}s Best`}
              value={`${stats.timeBest[time]} WPM`}
              refFn={(el) => cardRefs.current.push(el)}
            />
          ))}
        </div> */}

        {/* Word based */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.wordsBest).map(([words, data]) => (
            <div
              key={words}
              ref={(el) => cardRefs.current.push(el)}
              className="bg-[#15151b] rounded-xl p-4 text-center"
            >
              <p className="text-xs text-gray-400 mb-1">{words} words</p>
              <p className="text-2xl font-semibold">{data.wpm}</p>
              <p className="text-sm text-gray-500 mt-1">{data.acc}</p>
            </div>
          ))}
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

const Stat = ({label, value, refFn}) => (
  <div ref={refFn} className="bg-[#15151b] rounded-xl p-4 text-center">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-xl font-bold mt-1">{value}</p>
  </div>
);

export default MonkeyTypeStats;
