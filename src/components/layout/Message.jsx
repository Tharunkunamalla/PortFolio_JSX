import {useEffect, useMemo, useRef, useState} from "react";
import {BellRing, MessageCircleMore, X} from "lucide-react";
import {ownerMessages} from "../../data/ownerMessages";
import {useLocation} from "react-router-dom";

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
  const location = useLocation();
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

  if (location.pathname === "/projects-3d") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 flex max-w-[92vw] flex-col items-end gap-3 font-sans">
      {!isOpen && showNewMessageAlert && (
        <button
          type="button"
          onClick={handleOpenMessage}
          className="group relative animate-fade-in rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 px-4 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-black dark:text-white shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-black dark:hover:border-white"
          aria-label="Open latest message"
        >
          <span className="relative z-10 flex items-center gap-2">
            <BellRing className="h-3.5 w-3.5 text-zinc-500" />
            Update Available
          </span>

          <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black dark:bg-white opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
          </span>
        </button>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={handleOpenMessage}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-black dark:text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-black dark:hover:border-white"
          aria-label="Open owner message"
        >
          <MessageCircleMore className="h-4 w-4" />
          Message
        </button>
      )}

      {isOpen && (
        <section
          ref={messageBoxRef}
          className="w-[min(340px,88vw)] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-md"
        >
          <header className="border-b border-zinc-200 dark:border-zinc-800 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-black dark:text-white">
                  Developer Broadcast
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Close message"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>

          <div 
            data-lenis-prevent
            className="max-h-[360px] space-y-3 overflow-y-auto p-4 touch-pan-y scrollbar-hide"
          >
            {posts.map((post, index) => (
              <article
                key={`${post.id}-${post.postedAt}-${index}`}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 p-4 shadow-sm"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    {post.type === "image" ? "Media Post" : "Notice"}
                  </span>
                  <time
                    className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500"
                    dateTime={post.postedAt}
                  >
                    {post.displayTime}
                  </time>
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt || "Owner post"}
                    className="mb-2 max-h-48 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 object-cover filter grayscale contrast-110"
                    loading="lazy"
                  />
                )}

                {post.text && (
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
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
