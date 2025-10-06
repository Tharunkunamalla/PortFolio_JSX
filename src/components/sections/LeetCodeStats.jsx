// src/components/LeetCodeStats.jsx
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // refs for animation
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const numberRefs = useRef([]); // refs to elements whose text will count up
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
            variables: {username: "Tharunkunamalla"},
          }),
        });

        const text = await response.text();
        if (!response.ok) throw new Error(`Error ${response.status}: ${text}`);

        const data = JSON.parse(text);
        const user = data?.data?.matchedUser;
        if (!user) throw new Error("Invalid LeetCode response");

        const subs = user.submitStats.acSubmissionNum;
        const easy = subs.find((d) => d.difficulty === "Easy")?.count || 0;
        const medium = subs.find((d) => d.difficulty === "Medium")?.count || 0;
        const hard = subs.find((d) => d.difficulty === "Hard")?.count || 0;
        const total = easy + medium + hard;

        setStats({
          total,
          easy,
          medium,
          hard,
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
      // entrance for section heading
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
      }); // [web:3][web:5]

      // cards: pop + rise with grid-aware stagger
      gsap.from(cardRefs.current, {
        y: 30,
        scale: 0.98,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          amount: 0.4,
          grid: "auto",
          from: "center",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }); // [web:3][web:5]

      // counters: animate numbers only when section is visible
      const values = [
        stats.total,
        stats.easy,
        stats.medium,
        stats.hard,
        stats.ranking,
        stats.contributionPoints,
      ];

      numberRefs.current.forEach((el, i) => {
        const target = values[i] ?? 0;
        const obj = {val: 0};
        const isRank = i === 4;

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
      }); // [web:2][web:6][web:9]

      // hover parallax tilt on cards
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const qx = gsap.quickTo(card, "rotationY", {
          duration: 0.3,
          ease: "power2.out",
        });
        const qy = gsap.quickTo(card, "rotationX", {
          duration: 0.3,
          ease: "power2.out",
        });
        const qz = gsap.quickTo(card, "z", {duration: 0.3, ease: "power2.out"});

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          qx(dx * 10);
          qy(-dy * 10);
          qz(10);
        };

        const onLeave = () => {
          qx(0);
          qy(0);
          qz(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        // cleanup
        ScrollTrigger.addEventListener("refresh", () => onLeave());
      }); // [web:3][web:11]
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  if (loading)
    return <p className="text-center text-gray-400">Loading DSA Stats...</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load data</p>;

  return (
    <section ref={sectionRef} className="py-10 bg-light-100 dark:bg-dark-100">
      <div className="container mx-auto px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">DSA Journey</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center will-change-transform">
          {/* Total */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[0] = el)}
              className="text-2xl font-semibold text-secondary-500"
            >
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Total Solved
            </p>
          </div>

          {/* Easy */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[1] = el)}
              className="text-green-500 font-semibold"
            >
              {stats.easy.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Easy</p>
          </div>

          {/* Medium */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[2] = el)}
              className="text-yellow-500 font-semibold"
            >
              {stats.medium.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Medium</p>
          </div>

          {/* Hard */}
          <div
            ref={(el) => (cardRefs.current[3] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[3] = el)}
              className="text-red-500 font-semibold"
            >
              {stats.hard.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Hard</p>
          </div>

          {/* Rank */}
          <div
            ref={(el) => (cardRefs.current[4] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[4] = el)}
              className="text-primary-500 font-semibold"
            >
              #{stats.ranking.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Global Rank
            </p>
          </div>

          {/* Contribution */}
          <div
            ref={(el) => (cardRefs.current[5] = el)}
            className="bg-white dark:bg-dark-300 rounded-xl shadow p-4 transform-gpu"
            style={{transformStyle: "preserve-3d"}}
          >
            <h3
              ref={(el) => (numberRefs.current[5] = el)}
              className="text-purple-500 font-semibold"
            >
              {stats.contributionPoints.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Contribution
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeStats;
