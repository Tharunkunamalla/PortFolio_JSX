import {useMemo, useState} from "react";
import {MessageCircleMore, X} from "lucide-react";

// Update this list to publish new text/image posts from the owner.
const ownerPosts = [
  {
    id: "welcome-note",
    type: "text",
    text: "Thanks for visiting my portfolio. I regularly post updates about projects and what I am currently building.",
    postedAt: "2026-03-19T09:45:00",
  },
  {
    id: "profile-update",
    type: "image",
    text: "New profile photo and branding update. More project demos are coming this week.",
    imageUrl: "/assets/pfp.jpg",
    imageAlt: "Owner update",
    postedAt: "2026-03-18T20:10:00",
  },
];

const formatDateTime = (value) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);

  const posts = useMemo(
    () =>
      [...ownerPosts]
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        .map((post) => ({
          ...post,
          displayTime: formatDateTime(post.postedAt),
        })),
    [],
  );

  return (
    <div className="fixed bottom-5 right-4 z-50 flex max-w-[92vw] flex-col items-end gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
          className="inline-flex items-center gap-2 rounded-full border border-secondary-500/60 bg-white/85 px-4 py-2 text-sm font-semibold text-secondary-700 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#141421]/90 dark:text-secondary-300 dark:hover:bg-[#1a1a2d]"
          aria-label="Open owner message"
        >
          <MessageCircleMore className="h-4 w-4" />
          Open
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={!isOpen}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-white/85 px-4 py-2 text-sm font-semibold text-red-600 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#141421]/90 dark:text-red-300 dark:hover:bg-[#1a1a2d]"
          aria-label="Close owner message"
        >
          <X className="h-4 w-4" />
          Close
        </button>
      </div>

      {isOpen && (
        <section className="w-[min(390px,92vw)] overflow-hidden rounded-2xl border border-secondary-500/30 bg-white/90 shadow-2xl backdrop-blur-md dark:border-secondary-500/20 dark:bg-[#10101a]/95">
          <header className="border-b border-secondary-500/20 px-4 py-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Message From Owner
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Text and image posts with date and time
            </p>
          </header>

          <div className="max-h-[340px] space-y-3 overflow-y-auto p-4 scrollbar-hide">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-gray-200/80 bg-white/80 p-3 shadow-sm dark:border-gray-700 dark:bg-[#181826]"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-secondary-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary-700 dark:text-secondary-300">
                    {post.type === "image" ? "Image Post" : "Text Post"}
                  </span>
                  <time
                    className="text-[11px] font-medium text-gray-500 dark:text-gray-400"
                    dateTime={post.postedAt}
                  >
                    {post.displayTime}
                  </time>
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt || "Owner post"}
                    className="mb-2 max-h-48 w-full rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                    loading="lazy"
                  />
                )}

                {post.text && (
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {post.text}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Message;
