import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const username = "Tharun_0509";

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
        // Safety Fallback
        setStats({
          solved: { overall: 474, easy: 204, medium: 219, hard: 51 },
          total: { overall: 3888, easy: 935, medium: 2033, hard: 920 },
          ranking: 207049,
          contributionPoints: 2,
        });
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
      // Heading Entrance
      gsap.fromTo(headingRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards Grid Entrance
      gsap.fromTo(cardRefs.current, 
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Number Rolling Animation
      const values = [
        stats.solved.overall, stats.total.overall,
        stats.solved.easy, stats.total.easy,
        stats.solved.medium, stats.total.medium,
        stats.solved.hard, stats.total.hard,
        stats.ranking, stats.contributionPoints,
      ];

      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = values[i] ?? 0;
        const obj = {val: 0};
        const isRank = i === 8;

        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = isRank
              ? `#${Math.floor(obj.val).toLocaleString()}`
              : Math.floor(obj.val).toLocaleString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 98%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  if (loading) return <div className="py-20 animate-pulse text-center opacity-30">Loading Stats...</div>;
  if (!stats) return null;

  const tiles = [
    {label: "Total Solved", color: "text-[#a855f7]"},
    {label: "Easy", color: "text-[#22c55e]"},
    {label: "Medium", color: "text-[#eab308]"},
    {label: "Hard", color: "text-[#ef4444]"},
  ];

  /* ================= JSX ================= */
  return (
    <div ref={sectionRef} className="relative w-full py-6 z-30">
      <div className="container mx-auto px-0">
        {/* HEADING */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">
              DSA Journey
            </h2>
            <p className="text-xs font-mono text-zinc-500">Live Graphql Query Progress</p>
          </div>

          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
              Sync Active
            </span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              ref={(el) => (cardRefs.current[i] = el)}
              className="
                rounded-3xl p-5
                bg-zinc-50 dark:bg-zinc-950/70
                border border-zinc-200 dark:border-zinc-800/80
                shadow-sm
                transition-all duration-300
                hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1
                flex flex-col items-center justify-center
              "
            >
              <div className={`text-2xl md:text-3xl font-black ${t.color} mb-1 tracking-tight flex items-baseline gap-1`}>
                <span ref={(el) => (numberRefs.current[i * 2] = el)} />
                <span className="text-zinc-400 dark:text-zinc-600 font-thin text-lg">/</span>
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-medium" ref={(el) => (numberRefs.current[i * 2 + 1] = el)} />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                {t.label}
              </p>
            </div>
          ))}

          {/* Rank Tile */}
          <div
            ref={(el) => (cardRefs.current[4] = el)}
            className="rounded-3xl p-5 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 flex flex-col items-center justify-center"
          >
            <h3
              ref={(el) => (numberRefs.current[8] = el)}
              className="text-[#6366f1] font-black text-2xl md:text-3xl tracking-tight mb-1"
            />
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest">
              Global Rank
            </p>
          </div>

          {/* Contribution Tile */}
          <div
            ref={(el) => (cardRefs.current[5] = el)}
            className="rounded-3xl p-5 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 flex flex-col items-center justify-center"
          >
            <h3
              ref={(el) => (numberRefs.current[9] = el)}
              className="text-[#a855f7] font-black text-2xl md:text-3xl tracking-tight mb-1"
            />
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest">
              Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;
