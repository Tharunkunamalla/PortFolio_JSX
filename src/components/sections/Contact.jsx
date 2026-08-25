import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {contactMethods, socialLinks} from "../../constants/contactData";
import {Send, Mail, Sparkles, CheckCircle2} from "lucide-react";
import BackgroundParticles from "../layout/BackgroundParticles";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: "5e5c5d50-8ed2-4b2d-b93d-3ba067f0af11",
      ...formData,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message transmitted successfully!");
        confetti({
          particleCount: 120,
          spread: 70,
          origin: {y: 0.8},
          colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#27272a"],
        });
        setFormData({name: "", email: "", subject: "", message: ""});
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen pt-28 pb-24 md:pt-32 md:pb-28 bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden"
    >
      {/* Fixed Atmospheric Background Image Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src="/assets/contact.jpg"
          alt="Contact Background"
          className="w-full h-full object-cover opacity-35 dark:opacity-40 filter contrast-125 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/85 dark:from-[#09090b]/85 dark:via-[#09090b]/55 dark:to-[#09090b]/85" />
      </div>

      <BackgroundParticles />

      {/* Monochromatic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        {/* Page Header */}
        <div ref={headingRef} className="max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
            Initiate Contact
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black dark:text-white tracking-tight leading-tight mb-4">
            Let's Build Something Exceptional.
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            Have a project in mind, seeking engineering talent, or want to discuss modern web architecture? Drop a direct message below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information & Channels */}
          <div
            ref={infoRef}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              {contactMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white text-xl shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                    {method.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-1">
                      {method.label}
                    </span>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="block text-sm sm:text-base font-display font-bold text-black dark:text-white hover:underline truncate"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="block text-sm sm:text-base font-display font-bold text-black dark:text-white truncate">
                        {method.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Connection & Availability Box */}
            <div className="p-7 sm:p-8 bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl space-y-6 shadow-xs">
              <h3 className="text-lg font-display font-bold text-black dark:text-white uppercase tracking-wider">
                Digital Presence
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name || "Social Link"}
                    className={`w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 ${link.hoverColor} hover:scale-110 hover:shadow-lg transition-all duration-300 shadow-xs`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute inset-0 bg-black dark:bg-white rounded-full animate-ping opacity-75" />
                  <div className="relative w-2.5 h-2.5 bg-black dark:bg-white rounded-full" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Open for Full-time Roles & Freelancing
                </span>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div
            ref={formRef}
            className="lg:col-span-7 contact-card"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-black dark:focus:border-white focus:outline-none transition-all text-black dark:text-white font-medium text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. user@domain.com"
                    className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-black dark:focus:border-white focus:outline-none transition-all text-black dark:text-white font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                  className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-black dark:focus:border-white focus:outline-none transition-all text-black dark:text-white font-medium text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, inquiry, or timeline..."
                  className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-black dark:focus:border-white focus:outline-none transition-all text-black dark:text-white font-medium text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        toastClassName="dark:bg-zinc-900 dark:text-white border dark:border-zinc-800 font-mono text-xs"
      />
    </section>
  );
};

export default Contact;
