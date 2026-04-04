import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Send, MessageSquare} from "lucide-react";
import {FaDiscord} from "react-icons/fa";
import BackgroundParticles from "../layout/BackgroundParticles";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "kunamallatharun701@gmail.com",
    href: "mailto:kunamallatharun701@gmail.com",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: "Phone",
    value: "+91 6303480726",
    href: "tel:+91-6303480726",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Location",
    value: "Telangana, India",
    href: null,
    color: "from-amber-400 to-orange-500",
  },
];

const socialLinks = [
  { icon: <Github />, href: "https://github.com/Tharunkunamalla", color: "hover:text-white hover:bg-gray-800" },
  { icon: <Linkedin />, href: "https://www.linkedin.com/in/tharun-kunamalla-/", color: "hover:text-white hover:bg-blue-600" },
  { icon: <Twitter />, href: "https://x.com/Tharunk0509", color: "hover:text-white hover:bg-black" },
  { icon: <Instagram />, href: "https://www.instagram.com/__tharun_0509.__/", color: "hover:text-white hover:bg-pink-600" },
  { icon: <FaDiscord className="w-6 h-6" />, href: "https://discord.com/users/751713701425446945", color: "hover:text-white hover:bg-[#5865F2]" },
];

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
      // Heading & Subtitle Animation
      gsap.from([headingRef.current, ".contact-subtitle"], {
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        }
      });

      // Form & Info Entrance
      gsap.from(".contact-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
        }
      });

      // Individual Item Reveal
      gsap.from(".contact-method", {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: "5e5c5d50-8ed2-4b2d-b93d-3ba067f0af11",
      ...formData
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        confetti({
          particleCount: 150,
          spread: 80,
          origin: {y: 0.8},
          colors: ["#6366f1", "#a855f7", "#ec4899"],
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden"
    >
      <BackgroundParticles />
      
      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 dark:from-black/80 to-transparent z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            Get In <span className="text-secondary-500">Touch</span>
          </h2>
          <p className="contact-subtitle mt-6 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Contact Information */}
          <div ref={infoRef} className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {contactMethods.map((method, idx) => (
                <div key={idx} className="group flex items-center gap-6 contact-method">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} blur-lg opacity-20 scale-150 group-hover:opacity-40 transition-opacity`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-xl transition-all duration-500 group-hover:-translate-y-2`}>
                       <span className={`text-2xl ${method.color.split(' ')[0].replace('from-', 'text-')}`}>
                          {method.icon}
                       </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-1">
                      {method.label}
                    </span>
                    {method.href ? (
                      <a href={method.href} className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-xl font-bold text-gray-800 dark:text-white">{method.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-card p-10 bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
               <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Let's Connect</h3>
               <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${link.color} hover:scale-110 hover:shadow-lg`}
                    >
                      {link.icon}
                    </a>
                  ))}
               </div>
               <div className="mt-10 pt-10 border-t border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-4">
                     <div className="relative w-3 h-3">
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                        <div className="relative w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#10b981]" />
                     </div>
                     <span className="text-sm font-black text-gray-800 dark:text-green-400 tracking-wide uppercase">
                        Available for Projects
                     </span>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT: Message Form */}
          <div ref={formRef} className="lg:col-span-7 contact-card">
            <form
              onSubmit={handleSubmit}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Your Name</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white font-medium autofill:shadow-[0_0_0_30px_#12121a_inset]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Email Address</label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white font-medium autofill:shadow-[0_0_0_30px_#12121a_inset]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Subject</label>
                <input
                  type="text" name="subject" required value={formData.subject} onChange={handleChange}
                  placeholder="How can I help you?"
                  className="w-full px-6 py-4 bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white font-medium autofill:shadow-[0_0_0_30px_#12121a_inset]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Message</label>
                <textarea
                  name="message" rows={5} required value={formData.message} onChange={handleChange}
                  placeholder="Your message here..."
                  className="w-full px-6 py-4 bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white font-medium resize-none autofill:shadow-[0_0_0_30px_#12121a_inset]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden px-8 py-5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                   {isSubmitting ? "Sending..." : "Send Message"}
                   {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
                {isSubmitting && (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin relative z-10" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
      
      {/* Footer Blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent z-10" />
    </section>
  );
};

export default Contact;
