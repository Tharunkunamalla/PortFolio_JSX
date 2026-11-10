import {Star, Quote} from "lucide-react";
import {animeData} from "../../constants/animeData";

const AnimeShowcase = () => {
  return (
    <div className="space-y-4">
      {/* Sleek Minimalist Header */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <h3 className="font-display font-bold text-sm sm:text-base text-black dark:text-white uppercase tracking-wider">
            Favorite Anime & Masterpieces
          </h3>
          <span className="text-xs font-mono text-zinc-500">({animeData.length})</span>
        </div>
      </div>

      {/* Anime Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {animeData.map((anime) => (
          <div
            key={anime.id}
            className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800/90 hover:border-black dark:hover:border-zinc-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div>
              {/* Header: Rank, Title, Japanese Title, Rating */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all">
                    {anime.id}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-black dark:text-white group-hover:text-red-500 transition-colors leading-tight">
                      {anime.title}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-500 italic">
                      {anime.japaneseTitle}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold text-amber-500 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{anime.rating}</span>
                </span>
              </div>

              {/* Badges / Genres */}
              <div className="flex flex-wrap gap-1 mb-2.5">
                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300">
                  {anime.badge}
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                  {anime.episodes}
                </span>
                {anime.genre.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className="px-1.5 py-0.5 rounded-md text-[9px] font-mono bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 text-zinc-500"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Iconic Quote */}
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/70 mb-2.5">
                <div className="flex items-start gap-1.5">
                  <Quote className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] italic font-serif text-zinc-700 dark:text-zinc-300 leading-snug">
                    "{anime.quote}"
                  </p>
                </div>
              </div>

              {/* Personal Take */}
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-2">
                {anime.personalReview}
              </p>
            </div>

            {/* Why Watch */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 text-[10px] font-mono text-zinc-500 truncate">
              💡 {anime.recommendationReason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeShowcase;
