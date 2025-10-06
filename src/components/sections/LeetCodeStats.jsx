// src/components/LeetCodeStats.jsx
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const username = "Tharunkunamalla";

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // refs for animation
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const numberRefs = useRef([]); // indices mapping below
  cardRefs.current = [];
  numberRefs.current = [];

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
                  username
                  profile {
                    ranking
                    reputation
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

        const text = await response.text();
        if (!response.ok) throw new Error(`Error ${response.status}: ${text}`);

        const data = JSON.parse(text);
        const allQuestions = data?.data?.allQuestionsCount || [];
        const user = data?.data?.matchedUser;
        if (!user) throw new Error("Invalid LeetCode response");

        const subs = user.submitStats.acSubmissionNum || [];

        const pick = (arr, diff, key = "count") =>
          arr.find((d) => d.difficulty === diff)?.[key] || 0;

        const totals = {
          overall: pick(allQuestions, "All"),
          easy: pick(allQuestions, "Easy"),
          medium: pick(allQuestions, "Medium"),
          hard: pick(allQuestions, "Hard"),
        };

        const solved = {
          overall:
            pick(subs, "All") ||
            pick(subs, "Easy") + pick(subs, "Medium") + pick(subs, "Hard"),
          easy: pick(subs, "Easy"),
          medium: pick(subs, "Medium"),
          hard: pick(subs, "Hard"),
        };

        const overallTotal =
          totals.overall || totals.easy + totals.medium + totals.hard;
        const totalSolved =
          solved.overall || solved.easy + solved.medium + solved.hard;

        setStats({
          solved: {
            overall: totalSolved,
            easy: solved.easy,
            medium: solved.medium,
            hard: solved.hard,
          },
          total: {
            overall: overallTotal,
            easy: totals.easy,
            medium: totals.medium,
            hard: totals.hard,
          },
          ranking: user.profile?.ranking ?? 0,
          reputation: user.profile?.reputation ?? 0,
          contributionPoints: user.profile?.solutionCount ?? 0,
        });
      } catch (err) {
        console.error("Error fetching LeetCode stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!stats) return;

    const ctx = gsap.context(() => {
      // heading entrance
      gsap.from(headingRef.current, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }); // [web:5]

      // card entrances
      gsap.from(cardRefs.current, {
        y: 30,
        scale: 0.98,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {amount: 0.4, grid: "auto", from: "center"},
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }); // [web:5]

      // number counters (done/overall and rank/contrib)
      // numberRefs mapping:
      // 0: overall done, 1: overall total,
      // 2: easy done, 3: easy total,
      // 4: med done, 5: med total,
      // 6: hard done, 7: hard total,
      // 8: rank, 9: contrib
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
        const target = values[i] ?? 0;
        const obj = {val: 0};
        const isRank = i === 8;

        gsap.fromTo(
          obj,
          {val: 0},
          {
            val: target,
            duration: 1.2,
            ease: "power1.out",
            onUpdate: () => {
              const v = Math.floor(obj.val);
              el.textContent = isRank
                ? `#${v.toLocaleString()}`
                : v.toLocaleString();
            },
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }); // [web:5]
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  if (loading)
    return <p className="text-center text-gray-400">Loading DSA Stats...</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load data</p>;

  const tiles = [
    {
      label: "Total Solved",
      color: "text-secondary-500",
      done: stats.solved.overall,
      total: stats.total.overall,
    },
    {
      label: "Easy",
      color: "text-green-500",
      done: stats.solved.easy,
      total: stats.total.easy,
    },
    {
      label: "Medium",
      color: "text-yellow-500",
      done: stats.solved.medium,
      total: stats.total.medium,
    },
    {
      label: "Hard",
      color: "text-red-500",
      done: stats.solved.hard,
      total: stats.total.hard,
    },
  ];

  // tailwind utility classes for the shiny border
  // Uses pseudo-elements with conic-gradient and masks for a hover-only ring.
  const shinyClass =
    // container must be relative and rounded; pseudo build the ring
    "group relative rounded-xl before:absolute before:inset-0 before:rounded-[inherit] " +
    "before:p-[2px] before:opacity-0 before:transition-opacity before:duration-200 " +
    "hover:before:opacity-100 " +
    "before:[background:conic-gradient(from_var(--angle),#86efac_0%,#22d3ee_25%,#a78bfa_50%,#f472b6_75%,#86efac_100%)] " +
    "after:absolute after:inset-[2px] after:rounded-[inherit] after:bg-white after:dark:bg-dark-300 " +
    "before:[animation:spinAngle_2.5s_linear_infinite] " +
    // glow blur layer
    "shadow";

  return (
    <section ref={sectionRef} className="py-10 bg-light-100 dark:bg-dark-100">
      {/* keyframes for spinning conic gradient angle */}
      <style>{`
        @keyframes spinAngle {
          to { --angle: 360deg; }
        }
        .before\\:\\[animation\\:spinAngle_2\\.5s_linear_infinite\\]::before{
          animation: spinAngle 2.5s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">DSA Journey</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center will-change-transform">
          {/* Overall / Easy / Medium / Hard */}
          {tiles.map((t, i) => (
            <div key={t.label} className={shinyClass}>
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative z-10 rounded-xl p-4 bg-white dark:bg-dark-300"
                style={{transformStyle: "preserve-3d"}}
              >
                <div className={`text-2xl font-semibold ${t.color}`}>
                  <span ref={(el) => (numberRefs.current[i * 2 + 0] = el)}>
                    {t.done.toLocaleString()}
                  </span>
                  <span className="mx-1">/</span>
                  <span ref={(el) => (numberRefs.current[i * 2 + 1] = el)}>
                    {t.total.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t.label}
                </p>
              </div>
            </div>
          ))}

          {/* Rank */}
          <div className={shinyClass}>
            <div
              ref={(el) => (cardRefs.current[4] = el)}
              className="relative z-10 rounded-xl p-4 bg-white dark:bg-dark-300"
              style={{transformStyle: "preserve-3d"}}
            >
              <h3
                ref={(el) => (numberRefs.current[8] = el)}
                className="text-primary-500 font-semibold text-2xl"
              >
                #{stats.ranking.toLocaleString()}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Global Rank
              </p>
            </div>
          </div>

          {/* Contribution */}
          <div className={shinyClass}>
            <div
              ref={(el) => (cardRefs.current[5] = el)}
              className="relative z-10 rounded-xl p-4 bg-white dark:bg-dark-300"
              style={{transformStyle: "preserve-3d"}}
            >
              <h3
                ref={(el) => (numberRefs.current[9] = el)}
                className="text-purple-500 font-semibold text-2xl"
              >
                {stats.contributionPoints.toLocaleString()}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Contribution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeStats;
