import {useState, useEffect, useRef} from "react";
import {Star, Sparkles, Send, CheckCircle2} from "lucide-react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

const RatingSection = () => {
  const ratingRef = useRef(null);
  const nameInputRef = useRef(null);
  const submitBtnRef = useRef(null);

  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const ratingEl = ratingRef.current;
    const nameEl = nameInputRef.current;

    const handleRatingChange = (e) => {
      const val = Number(e.target.value || 0);
      setRating(val);
    };

    const handleNameInput = (e) => {
      setUserName(e.target.value || "");
    };

    ratingEl?.addEventListener("change", handleRatingChange);
    nameEl?.addEventListener("input", handleNameInput);
    nameEl?.addEventListener("change", handleNameInput);

    return () => {
      ratingEl?.removeEventListener("change", handleRatingChange);
      nameEl?.removeEventListener("input", handleNameInput);
      nameEl?.removeEventListener("change", handleNameInput);
    };
  }, []);

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      toast.error("Please enter your name first to submit your rating!");
      nameInputRef.current?.focus();
      return;
    }

    if (!rating || rating === 0) {
      toast.error("Please select a star rating (1 to 5)!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      access_key: "5e5c5d50-8ed2-4b2d-b93d-3ba067f0af11",
      subject: `⭐ New Portfolio Rating from ${userName.trim()}`,
      from_name: userName.trim(),
      name: userName.trim(),
      rating: `${rating} / 5 Stars`,
      message: `User ${userName.trim()} rated the website ${rating} out of 5 stars!`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Thank you for rating ${rating} stars, ${userName.trim()}!`);
        submitBtnRef.current?.done?.();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {y: 0.85},
          colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#52525b"],
        });
        setHasRated(true);
      } else {
        toast.error("Could not transmit rating. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred while transmitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg">
          {/* Left Text Callout */}
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
              Feedback & Impressions
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-black dark:text-white tracking-tight">
              If you like this website, rate this!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light max-w-md">
              Share your impression by giving your name and selecting a star rating. Your rating lands directly in my inbox.
            </p>
          </div>

          {/* Right Rating Controls */}
          {hasRated ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white font-mono text-xs">
              <CheckCircle2 className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              <span>Rating transmitted! Thank you for the support.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitRating}
              className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
            >
              <div className="w-full sm:w-48">
                <sakuga-input
                  ref={nameInputRef}
                  name="rater_name"
                  type="text"
                  label="Your Name"
                  placeholder="Your Name..."
                  class="w-full block [--sk-input-width:100%]"
                ></sakuga-input>
              </div>

              <div className="flex items-center justify-center py-1">
                <sakuga-rating
                  ref={ratingRef}
                  name="rating"
                  label="Rate Tharun's Portfolio"
                ></sakuga-rating>
              </div>

              <sakuga-button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting ? "" : undefined}
                class="inline-block anime-contact-btn shrink-0"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Rate"}</span>
                </span>
              </sakuga-button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
