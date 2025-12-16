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
        relative py-14 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden
      "
    >
      <Bg />
      {/* ===== PARTICLES (BOTTOM LAYER) ===== */}
      <div className="absolute inset-0 z-0">
        {/* <BackgroundParticles /> */}
      </div>

      {/* ===== TOP BLEND (MODE AWARE) ===== */}
      <div
        className="
          pointer-events-none
          absolute top-0 left-0 right-0 h-28 z-10
          bg-gradient-to-b
          from-white/80 to-transparent
          dark:from-black/60
        "
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 container mx-auto px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8
                     text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">DSA Journey</span>
        </h2>

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

        {/* BUTTON */}
        <div className="mt-8 text-center">
          <a
            href={`https://leetcode.com/u/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
              text-black shadow-lg hover:scale-105 transition
            "
          >
            <SiLeetcode className="w-6 h-6" />
            View LeetCode Profile
          </a>
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

export default LeetCodeStats;
