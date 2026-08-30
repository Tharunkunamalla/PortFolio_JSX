import React, {useState, useEffect} from "react";
import Tilt from "react-parallax-tilt";
import {Loader2} from "lucide-react";

// Helper to determine green shade intensity based on count
const getCellBgColor = (count) => {
  if (count === null || count === undefined || count === 0) {
    return "bg-[#161b22] border-[#21262d]/80 text-transparent";
  }
  if (count >= 20) {
    return "bg-[#39d353] border-[#39d353]/90 text-zinc-950 font-extrabold shadow-sm shadow-[#39d353]/20";
  }
  if (count >= 10) {
    return "bg-[#26a641] border-[#26a641]/90 text-white font-bold";
  }
  if (count >= 4) {
    return "bg-[#006d32] border-[#006d32]/90 text-white font-semibold";
  }
  return "bg-[#0e4429] border-[#0e4429]/90 text-white font-medium";
};

const formatDateTooltip = (dateStr, count) => {
  if (!dateStr) return `${count || 0} contribution${count === 1 ? "" : "s"}`;
  try {
    const d = new Date(dateStr);
    const formatted = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${count || 0} contribution${count === 1 ? "" : "s"} on ${formatted}`;
  } catch {
    return `${count || 0} contribution${count === 1 ? "" : "s"}`;
  }
};

const GitHubActivityCalendar = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [liveWeeks, setLiveWeeks] = useState(null);
  const [monthLabels, setMonthLabels] = useState([]);
  const [totalContributions, setTotalContributions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      // 1. Try official GitHub GraphQL via local proxy (Zero-cache real-time synchronization)
      try {
        const query = `
          query {
            user(login: "Tharunkunamalla") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      contributionLevel
                      weekday
                    }
                  }
                  months {
                    name
                    totalWeeks
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("/api/github/graphql", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({query}),
        });

        if (res.ok) {
          const data = await res.json();
          const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
          if (calendar && isMounted) {
            setTotalContributions(calendar.totalContributions);

            const rawWeeks = calendar.weeks; // Array of 52-53 weeks
            // Transpose into 7 rows (Sunday=0 to Saturday=6)
            const matrix7Rows = Array.from({length: 7}, (_, dayOfWeek) =>
              rawWeeks.map((week) => {
                const dayMatch = week.contributionDays.find(
                  (d) => d.weekday === dayOfWeek
                );
                return dayMatch
                  ? {count: dayMatch.contributionCount, date: dayMatch.date}
                  : null;
              })
            );

            // Calculate month label offsets
            let runningCol = 0;
            const months = (calendar.months || []).map((m) => {
              const col = runningCol;
              runningCol += m.totalWeeks;
              return {name: m.name, col};
            });

            setLiveWeeks({
              matrix: matrix7Rows,
              totalCols: rawWeeks.length,
            });
            setMonthLabels(months);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Direct GraphQL fetch failed, trying fallback API:", err);
      }

      // 2. Secondary fallback: jogruber public API
      try {
        const fallbackRes = await fetch(
          "https://github-contributions-api.jogruber.de/v4/Tharunkunamalla?y=last"
        );
        const data = await fallbackRes.json();
        if (!isMounted || !data?.contributions?.length) return;

        if (data.total?.lastYear !== undefined) {
          setTotalContributions(data.total.lastYear);
        }

        const days = data.contributions;
        const weeks = [];
        let currentWeek = new Array(7).fill(null);
        const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const months = [];
        let lastMonth = -1;

        days.forEach((day, index) => {
          const d = new Date(day.date);
          const dayOfWeek = d.getUTCDay();
          const monthIdx = d.getUTCMonth();

          currentWeek[dayOfWeek] = day;

          if (monthIdx !== lastMonth && dayOfWeek <= 2) {
            months.push({
              name: MONTH_NAMES[monthIdx],
              col: weeks.length,
            });
            lastMonth = monthIdx;
          }

          if (dayOfWeek === 6 || index === days.length - 1) {
            weeks.push(currentWeek);
            currentWeek = new Array(7).fill(null);
          }
        });

        const matrix7Rows = Array.from({length: 7}, (_, rowIdx) =>
          weeks.map((week) => week[rowIdx] || null)
        );

        setLiveWeeks({
          matrix: matrix7Rows,
          totalCols: weeks.length,
        });
        setMonthLabels(months);
      } catch (err) {
        console.error("All GitHub contribution fetches failed:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalColumns = liveWeeks?.totalCols || 53;

  return (
    <div className="w-full space-y-4">
      {/* Title with Classic Serif Font matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-1">
        <h3 className="text-3xl sm:text-4xl font-serif tracking-tight text-black dark:text-zinc-100 italic">
          GitHub Activity
        </h3>
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5 text-zinc-400 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              Syncing live GitHub data...
            </span>
          ) : totalContributions !== null ? (
            <span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {totalContributions.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </span>
          ) : null}
        </div>
      </div>

      {/* Main Activity Heatmap Card */}
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        perspective={1200}
        scale={1.005}
        transitionSpeed={1200}
        className="w-full"
      >
        <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#0d1117] border border-[#30363d] shadow-2xl overflow-hidden group">
          {/* Subtle ambient light gradient */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-emerald-500/[0.04] rounded-full filter blur-3xl pointer-events-none" />

          {/* Loading Skeleton Animation */}
          {isLoading ? (
            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-3 pt-2 px-2 select-none">
              <div
                style={{minWidth: `${Math.max(760, 53 * 17)}px`}}
                className="flex flex-col gap-2.5 animate-pulse"
              >
                {/* Month Skeleton Headers */}
                <div className="flex justify-between w-full h-5 px-1 mb-0.5">
                  {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m, idx) => (
                    <div
                      key={idx}
                      className="h-3 w-6 bg-zinc-800/60 rounded text-[11px]"
                    />
                  ))}
                </div>

                {/* 7 Rows Skeleton Grid */}
                <div className="flex flex-col gap-1.5">
                  {Array.from({length: 7}).map((_, rowIdx) => (
                    <div
                      key={rowIdx}
                      style={{
                        gridTemplateColumns: `repeat(53, minmax(0, 1fr))`,
                      }}
                      className="grid gap-1.5"
                    >
                      {Array.from({length: 53}).map((_, colIdx) => (
                        <div
                          key={colIdx}
                          style={{
                            animationDelay: `${(colIdx * 15 + rowIdx * 30) % 800}ms`,
                          }}
                          className="aspect-square rounded-[3px] sm:rounded-[4px] bg-zinc-800/40 border border-zinc-800/30"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Live Activity Heatmap Content */
            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-3 pt-2 px-2 select-none">
              <div
                style={{minWidth: `${Math.max(760, totalColumns * 17)}px`}}
                className="flex flex-col gap-2.5"
              >
                {/* Month Headers */}
                <div className="relative w-full h-5 text-xs font-mono text-zinc-400 dark:text-zinc-400 mb-0.5">
                  {monthLabels.map((month, idx) => {
                    const leftPercent = (month.col / totalColumns) * 100;
                    return (
                      <span
                        key={`${month.name}-${idx}`}
                        style={{left: `${leftPercent}%`}}
                        className="absolute -translate-x-1/2 text-[11px] sm:text-xs font-medium text-zinc-400 whitespace-nowrap pointer-events-none select-none"
                      >
                        {month.name}
                      </span>
                    );
                  })}
                </div>

                {/* 7 Days Contribution Grid */}
                <div className="flex flex-col gap-1.5">
                  {liveWeeks?.matrix.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      style={{
                        gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))`,
                      }}
                      className="grid gap-1.5"
                    >
                      {row.map((cellItem, colIdx) => {
                        const count = cellItem ? cellItem.count : 0;
                        const date = cellItem ? cellItem.date : null;
                        const hasContribution = count > 0;
                        const isHovered =
                          hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;

                        // Smart tooltip alignment to prevent edge overflowing and scrollbar flickering
                        const isRightEdge = colIdx >= totalColumns - 8;
                        const isLeftEdge = colIdx <= 5;
                        const tooltipAlignClass = isRightEdge
                          ? "right-0 translate-x-0"
                          : isLeftEdge
                          ? "left-0 translate-x-0"
                          : "left-1/2 -translate-x-1/2";

                        return (
                          <div
                            key={colIdx}
                            onMouseEnter={() =>
                              setHoveredCell({row: rowIdx, col: colIdx, count, date})
                            }
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`relative aspect-square rounded-[3px] sm:rounded-[4px] border flex items-center justify-center transition-all duration-150 cursor-pointer ${getCellBgColor(
                              count
                            )} ${
                              hasContribution
                                ? "hover:scale-115 hover:z-20 hover:ring-1.5 hover:ring-emerald-400/90"
                                : "hover:border-zinc-500/50 hover:bg-zinc-800/80"
                            }`}
                          >
                            {hasContribution && (
                              <span className="text-[7.5px] sm:text-[9px] md:text-[9.5px] leading-none font-bold tracking-tight pointer-events-none">
                                {count}
                              </span>
                            )}

                            {/* Hover Tooltip */}
                            {isHovered && (
                              <div
                                className={`absolute bottom-full mb-2 z-50 pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[10px] font-mono border border-zinc-700 shadow-xl ${tooltipAlignClass}`}
                              >
                                {formatDateTooltip(date, count)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Legend */}
          <div className="mt-4 pt-3 border-t border-[#21262d] flex items-center justify-end text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 mr-1">Less</span>
              <div className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-[#21262d]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#0e4429] border border-[#0e4429]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#006d32] border border-[#006d32]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#26a641] border border-[#26a641]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#39d353] border border-[#39d353]" />
              <span className="text-zinc-500 ml-1">More</span>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default GitHubActivityCalendar;
