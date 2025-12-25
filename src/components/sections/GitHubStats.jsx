// // src/components/GitHubStats.jsx
// import {useEffect, useRef, useState} from "react";
// import {gsap} from "gsap";
// import {ScrollTrigger} from "gsap/ScrollTrigger";
// import {FaGithub} from "react-icons/fa";
// import GitHubCalendar from "react-github-calendar"; // optional

// gsap.registerPlugin(ScrollTrigger);

// const GitHubStats = ({username}) => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const cardRefs = useRef([]);
//   const numberRefs = useRef([]);
//   cardRefs.current = [];
//   numberRefs.current = [];

//   useEffect(() => {
//     const fetchGitHubStats = async () => {
//       try {
//         const query = `
//           query GitHubUserStats($login: String!, $from: DateTime!, $to: DateTime!) {
//             user(login: $login) {
//               name
//               login
//               avatarUrl
//               repositories(privacy: PUBLIC) {
//                 totalCount
//               }
//               starredRepositories {
//                 totalCount
//               }
//               contributionsCollection(from: $from, to: $to) {
//                 totalCommitContributions
//                 totalIssueContributions
//                 totalPullRequestContributions
//                 totalPullRequestReviewContributions
//                 contributionCalendar {
//                   weeks {
//                     contributionDays {
//                       date
//                       contributionCount
//                     }
//                   }
//                 }
//               }
//             }
//           }`;

//         // e.g. last one year
//         const now = new Date();
//         const lastYear = new Date(now);
//         lastYear.setFullYear(now.getFullYear() - 1);
//         const variables = {
//           login: username,
//           from: lastYear.toISOString(),
//           to: now.toISOString(),
//         };

//         const resp = await fetch("/api/github/graphql", {
//           method: "POST",
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify({
//             query,
//             variables,
//             operationName: "GitHubUserStats",
//           }),
//         });

//         const text = await resp.text();
//         if (!resp.ok)
//           throw new Error(`GitHub API error ${resp.status}: ${text}`);
//         const data = JSON.parse(text);
//         const user = data?.data?.user;
//         if (!user) throw new Error("No GitHub user found");

//         const contribs = user.contributionsCollection;
//         setStats({
//           name: user.name,
//           login: user.login,
//           avatarUrl: user.avatarUrl,
//           repoCount: user.repositories.totalCount,
//           starCount: user.starredRepositories.totalCount,
//           commitCount: contribs.totalCommitContributions,
//           issueCount: contribs.totalIssueContributions,
//           prCount: contribs.totalPullRequestContributions,
//           reviewCount: contribs.totalPullRequestReviewContributions,
//           calendar: contribs.contributionCalendar,
//         });
//       } catch (err) {
//         console.error("Error fetching GitHub stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGitHubStats();
//   }, [username]);

//   useEffect(() => {
//     if (!stats) return;
//     const ctx = gsap.context(() => {
//       gsap.from(headingRef.current, {
//         y: 40,
//         autoAlpha: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//           toggleActions: "play reverse play reverse",
//         },
//       });
//       gsap.from(cardRefs.current, {
//         y: 30,
//         scale: 0.98,
//         autoAlpha: 0,
//         duration: 0.6,
//         ease: "power2.out",
//         stagger: {amount: 0.4, grid: "auto", from: "center"},
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//           toggleActions: "play reverse play reverse",
//         },
//       });

//       const values = [
//         stats.repoCount,
//         stats.starCount,
//         stats.commitCount,
//         stats.issueCount,
//         stats.prCount,
//         stats.reviewCount,
//       ];
//       numberRefs.current.forEach((el, i) => {
//         const target = values[i] || 0;
//         const obj = {val: 0};
//         gsap.fromTo(
//           obj,
//           {val: 0},
//           {
//             val: target,
//             duration: 1.2,
//             ease: "power1.out",
//             onUpdate: () => {
//               el.textContent = Math.floor(obj.val).toLocaleString();
//             },
//             scrollTrigger: {
//               trigger: el,
//               start: "top 90%",
//               toggleActions: "play reverse play reverse",
//             },
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [stats]);

//   if (loading)
//     return <p className="text-center text-gray-400">Loading GitHub Stats...</p>;
//   if (!stats)
//     return (
//       <p className="text-center text-red-500">Failed to load GitHub data</p>
//     );

//   const tiles = [
//     {label: "Repos", done: stats.repoCount, color: "text-blue-600"},
//     {label: "Stars", done: stats.starCount, color: "text-yellow-600"},
//     {label: "Commits", done: stats.commitCount, color: "text-green-600"},
//     {label: "Issues", done: stats.issueCount, color: "text-indigo-600"},
//     {label: "PRs", done: stats.prCount, color: "text-purple-600"},
//     {label: "Reviews", done: stats.reviewCount, color: "text-pink-600"},
//   ];

//   const shinyClass =
//     "group relative rounded-xl before:absolute before:inset-0 before:rounded-[inherit] " +
//     "before:p-[2px] before:opacity-0 before:transition-opacity before:duration-200 " +
//     "hover:before:opacity-100 " +
//     "before:[background:conic-gradient(from_var(--angle),#86efac_0%,#22d3ee_25%,#a78bfa_50%,#f472b6_75%,#86efac_100%)] " +
//     "after:absolute after:inset-[2px] after:rounded-[inherit] after:bg-white after:dark:bg-dark-300 " +
//     "before:[animation:spinAngle_2.5s_linear_infinite] shadow";

//   return (
//     <section
//       ref={sectionRef}
//       className="py-4 bg-light-100 dark:bg-dark-100 rounded-3xl shadow-lg"
//     >
//       <style>{`
//             @keyframes spinAngle {
//                 to { --angle: 360deg; }
//             }
//             .before\\:\\[animation\\:spinAngle_2\\.5s_linear_infinite\\]::before {
//                 animation: spinAngle 2.5s linear infinite;
//             }
//         `}</style>

//       <div className="container mx-auto px-6 rounded-3xl shadow-lg bg-white dark:bg-dark-100">
//         <h2
//           ref={headingRef}
//           className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
//         >
//           My <span className="text-secondary-500">GitHub Journey</span>
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center will-change-transform">
//           {tiles.map((t, i) => (
//             <div key={t.label} className={shinyClass}>
//               <div
//                 ref={(el) => (cardRefs.current[i] = el)}
//                 className="relative z-10 rounded-xl p-4 bg-white dark:bg-dark-300"
//                 style={{transformStyle: "preserve-3d"}}
//               >
//                 <div className={`text-2xl font-semibold ${t.color}`}>
//                   <span ref={(el) => (numberRefs.current[i] = el)}>
//                     {t.done.toLocaleString()}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm">
//                   {t.label}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Contribution heatmap */}
//         <div className="mt-10">
//           <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
//             Contributions Calendar
//           </h3>
//           <div className="flex justify-center">
//             <GitHubCalendar username={username} />
//           </div>
//         </div>

//         <div className="mt-8 text-center py-4">
//           <a
//             href={`https://github.com/${username}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black overflow-hidden
//                         bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500
//                         hover:bg-gray-400 hover:bg-opacity-90
//                         transition-all duration-300 shadow-lg"
//           >
//             <FaGithub className="w-6 h-6 z-10" />
//             <span className="relative z-10">View More Projects</span>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GitHubStats;
