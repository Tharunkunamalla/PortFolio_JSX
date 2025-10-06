import {useEffect, useState} from "react";

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return <p className="text-center text-gray-400">Loading DSA Stats...</p>;
  if (!stats)
    return <p className="text-center text-red-500">Failed to load data</p>;

  return (
    <section className="py-10 bg-light-100 dark:bg-dark-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          My <span className="text-secondary-500">DSA Journey</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-2xl font-semibold text-secondary-500">
              {stats.total}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Total Solved
            </p>
          </div>
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-green-500 font-semibold">{stats.easy}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Easy</p>
          </div>
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-yellow-500 font-semibold">{stats.medium}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Medium</p>
          </div>
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-red-500 font-semibold">{stats.hard}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Hard</p>
          </div>
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-primary-500 font-semibold">#{stats.ranking}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Global Rank
            </p>
          </div>
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow p-4">
            <h3 className="text-purple-500 font-semibold">
              {stats.contributionPoints}
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
