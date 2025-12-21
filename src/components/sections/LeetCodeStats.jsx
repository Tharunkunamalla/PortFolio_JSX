import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SiLeetcode} from "react-icons/si";
import Bg from "../Bg";

gsap.registerPlugin(ScrollTrigger);

const username = "Tharunkunamalla";

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const numberRefs = useRef([]);

  cardRefs.current = [];
  numberRefs.current = [];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/leetcode/graphql", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            operationName: "userSessionProgress",
            query: `
              query userSessionProgress($username: String!) {
                allQuestionsCount {
                  difficulty
                  count
                }
                matchedUser(username: $username) {
                  profile {
                    ranking
                    solutionCount
                  }
                  submitStats {
                    acSubmissionNum {
                      difficulty
                      count
                    }
                  }
                }
              }
            `,
            variables: {username},
          }),
        });

        const data = await response.json();
        const allQ = data?.data?.allQuestionsCount || [];
        const user = data?.data?.matchedUser;
        const subs = user?.submitStats?.acSubmissionNum || [];

        const pick = (arr, diff) =>
          arr.find((d) => d.difficulty === diff)?.count || 0;

        setStats({
          solved: {
            overall: pick(subs, "All"),
            easy: pick(subs, "Easy"),
            medium: pick(subs, "Medium"),
            hard: pick(subs, "Hard"),
          },
          total: {
            overall: pick(allQ, "All"),
            easy: pick(allQ, "Easy"),
            medium: pick(allQ, "Medium"),
            hard: pick(allQ, "Hard"),
          },
          ranking: user.profile?.ranking ?? 0,
          contributionPoints: user.profile?.solutionCount ?? 0,
        });
      } catch (e) {
        console.error("LeetCode fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ================= ANIMATIONS ================= */
  useEffect(() => {
    if (!stats) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardRefs.current, {
        y: 30,
        scale: 0.96,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const values = [
        stats.solved.overall,
        stats.total.overall,
        stats.solved.easy,
        stats.total.easy,
        stats.solved.medium,
        stats.total.medium,
        stats.solved.hard,
        stats.total.hard,
        stats.ranking,
        stats.contributionPoints,
      ];

      numberRefs.current.forEach((el, i) => {
        const obj = {val: 0};
        const target = values[i] ?? 0;
        const isRank = i === 8;

        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = isRank
              ? `#${Math.floor(obj.val).toLocaleString()}`
              : Math.floor(obj.val).toLocaleString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            // toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  if (loading)
    return <p className="text-center text-gray-400">Loading DSA Stats…</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load data</p>;

  const tiles = [
    {label: "Total Solved", color: "text-purple-500"},
    {label: "Easy", color: "text-green-500"},
    {label: "Medium", color: "text-yellow-500"},
    {label: "Hard", color: "text-red-500"},
  ];

  /* ================= JSX ================= */
  return (
    <section
      ref={sectionRef}
      className="
        relative py-14
        bg-light-100 dark:bg-gradient-to-br
        from-[#0f0f14] via-[#12121a] to-[#0c0c10]
        overflow-hidden
      "
    >
      <Bg />
      {/* ===== TOP BLEND (MODE AWARE) ===== */}{" "}
      <div className=" pointer-events-none absolute top-0 left-0 right-0 h-28 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60 " />
      {/* ===== CONTENT ===== */}
      <div className="relative z-20 container mx-auto px-6">
        {/* HEADING + LIVE INDICATOR */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-8 text-center md:text-left"
        >
          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My <span className="text-secondary-500">DSA Journey</span>
          </h2>

          {/* LIVE DOT */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-green-400">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
            </span>
            <span className="tracking-wide">Live</span>
          </div>

          {/* TOP-CODED LANGUAGE */}
          {/* <div
            className="
      mt-1 md:mt-0
      md:ml-6
      flex items-center gap-1.5
      text-[10px] md:text-sm
      tracking-wide
      justify-center
    "
          >
            <span
              className="
        font-['Inter','Poppins',sans-serif]
        text-gray-500 dark:text-gray-400
        font-medium
        uppercase
        letter-spacing-[0.1em]
        opacity-80
      "
            >
              Top-coded Language
            </span>

            <span
              className="
        text-purple-400
        font-semibold
        bg-purple-500/10
        px-1.5 py-[1px]
        md:px-2 md:py-[2px]
        rounded-md
        shadow-[0_0_10px_rgba(168,85,247,0.35)]
      "
            >
              Java
            </span>
          </div> */}
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              ref={(el) => (cardRefs.current[i] = el)}
              className="
                rounded-xl p-4
                bg-white/40 dark:bg-white/5
                backdrop-blur-md
                border border-white/30 dark:border-white/10
                shadow-lg
              "
            >
              <div className={`text-2xl font-semibold ${t.color}`}>
                <span ref={(el) => (numberRefs.current[i * 2] = el)} />
                <span className="mx-1">/</span>
                <span ref={(el) => (numberRefs.current[i * 2 + 1] = el)} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t.label}
              </p>
            </div>
          ))}

          {/* Rank */}
          <div
            ref={(el) => (cardRefs.current[4] = el)}
            className="
              rounded-xl p-4
              bg-white/40 dark:bg-white/5
              backdrop-blur-md
              border border-white/30 dark:border-white/10
              shadow-lg
            "
          >
            <h3
              ref={(el) => (numberRefs.current[8] = el)}
              className="text-indigo-500 font-semibold text-2xl"
            />
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Global Rank
            </p>
          </div>

          {/* Contribution */}
          <div
            ref={(el) => (cardRefs.current[5] = el)}
            className="
              rounded-xl p-4
              bg-white/40 dark:bg-white/5
              backdrop-blur-md
              border border-white/30 dark:border-white/10
              shadow-lg
            "
          >
            <h3
              ref={(el) => (numberRefs.current[9] = el)}
              className="text-purple-500 font-semibold text-2xl"
            />
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Contribution
            </p>
          </div>
        </div>
      </div>
      {/* ===== BOTTOM BLEND (KEY PART) ===== */}{" "}
      <div className=" pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80 " />
    </section>
  );
};

export default LeetCodeStats;
