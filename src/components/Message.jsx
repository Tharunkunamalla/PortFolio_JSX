import {useEffect, useMemo, useRef, useState} from "react";
import {BellRing, MessageCircleMore, X} from "lucide-react";
import {ownerMessages} from "../data/ownerMessages";

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

const LAST_SEEN_MESSAGE_KEY = "owner-last-seen-message";
const LAST_SEEN_WINDOW_MS = 60 * 1000;

const getTimestamp = (value) => {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
};

const getMessageSignature = (post) => {
  if (!post) {
    return null;
  }

  return [post.id, post.postedAt, post.text, post.imageUrl].join("|");
};

const readLastSeenState = () => {
  try {
    const rawValue = localStorage.getItem(LAST_SEEN_MESSAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    if (
      typeof parsedValue !== "object" ||
      parsedValue === null ||
      typeof parsedValue.signature !== "string"
    ) {
      return null;
    }

    return {
      signature: parsedValue.signature,
      seenAt:
        typeof parsedValue.seenAt === "number"
          ? parsedValue.seenAt
          : Date.now(),
    };
  } catch {
    return null;
  }
};

const saveLastSeenState = (signature) => {
  localStorage.setItem(
    LAST_SEEN_MESSAGE_KEY,
    JSON.stringify({signature, seenAt: Date.now()}),
  );
};

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const messageBoxRef = useRef(null);

  const posts = useMemo(
    () =>
      [...ownerMessages]
        .map((post) => ({
          ...post,
          postedAtMs: getTimestamp(post.postedAt),
          displayTime: formatDateTime(post.postedAt),
        }))
        .sort((a, b) => (b.postedAtMs ?? 0) - (a.postedAtMs ?? 0)),
    [],
  );

  const latestPost = posts[0];
  const latestMessageKey = getMessageSignature(latestPost);

  useEffect(() => {
    if (!latestMessageKey) {
      setShowNewMessageAlert(false);
      return;
    }

    const seenState = readLastSeenState();
    const hasNewMessage =
      !seenState || seenState.signature !== latestMessageKey;
    setShowNewMessageAlert(hasNewMessage);

    // Keep a short seen-timestamp window (60s) while preserving new-message checks.
    if (
      seenState &&
      !hasNewMessage &&
      Date.now() - seenState.seenAt > LAST_SEEN_WINDOW_MS
    ) {
      saveLastSeenState(latestMessageKey);
    }
  }, [latestMessageKey]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (
        messageBoxRef.current &&
        !messageBoxRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const updateLoaderState = () => {
      setIsLoaderVisible(Boolean(document.querySelector("[data-app-loader='true']")));
    };

    updateLoaderState();

    const observer = new MutationObserver(updateLoaderState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-app-loader"],
    });

    return () => observer.disconnect();
  }, []);

  const handleOpenMessage = () => {
    setIsOpen(true);

    if (latestMessageKey) {
      saveLastSeenState(latestMessageKey);
    }

    setShowNewMessageAlert(false);
  };

  if (isLoaderVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 flex max-w-[92vw] flex-col items-end gap-3">
      {!isOpen && showNewMessageAlert && (
        <button
          type="button"
          onClick={handleOpenMessage}
          className="group relative animate-fade-in rounded-xl border border-secondary-500/35 bg-white/90 px-3 py-2 text-xs font-semibold text-secondary-700 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-secondary-500/20 dark:border-secondary-400/35 dark:bg-[#16162a]/95 dark:text-[#e7a9ff]"
          aria-label="Open latest message"
        >
          <span className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-r from-secondary-500/20 via-transparent to-cyan-400/20 opacity-70 blur-sm dark:from-fuchsia-500/25 dark:via-transparent dark:to-cyan-400/20" />

          <span className="relative z-10 flex items-center gap-1.5">
            <BellRing className="h-3.5 w-3.5 text-secondary-600 dark:text-[#e7a9ff]" />
            New update available
          </span>

          <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-b border-r border-secondary-500/35 bg-white/90 dark:border-secondary-400/35 dark:bg-[#16162a]/95" />

          <span className="absolute -right-1 -top-1 inline-flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-500 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full border border-white/80 bg-secondary-500 dark:border-[#0f0f14]" />
          </span>
        </button>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={handleOpenMessage}
          className="inline-flex items-center gap-2 rounded-full border border-secondary-500/60 bg-white/85 px-4 py-2 text-sm font-semibold text-secondary-700 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:bg-white dark:bg-[#141421]/90 dark:text-secondary-300 dark:hover:bg-[#1a1a2d]"
          aria-label="Open owner message"
        >
          <MessageCircleMore className="h-4 w-4" />
          Open
        </button>
      )}

      {isOpen && (
        <section
          ref={messageBoxRef}
          className="w-[min(390px,92vw)] overflow-hidden rounded-2xl border border-secondary-500/30 bg-white/90 shadow-2xl backdrop-blur-md dark:border-secondary-500/20 dark:bg-[#10101a]/95"
        >
          <header className="border-b border-secondary-500/20 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  A Message From Me.....
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-white/85 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-white dark:bg-[#141421]/90 dark:text-red-300 dark:hover:bg-[#1a1a2d]"
                aria-label="Close owner message"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            </div>
          </header>

          <div 
            data-lenis-prevent
            className="max-h-[min(480px,65vh)] space-y-3 overflow-y-auto p-4 touch-pan-y scrollbar-custom"
          >
            {posts.map((post, index) => (
              <article
                key={`${post.id}-${post.postedAt}-${index}`}
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
