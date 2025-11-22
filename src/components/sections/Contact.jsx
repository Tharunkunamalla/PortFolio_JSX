import {useEffect, useRef, useState, useMemo} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Github, Linkedin, Twitter, Instagram} from "lucide-react";
import {Mail, Phone, MapPin, Send} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const {theme} = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize social links to prevent recreation
  const socialLinks = useMemo(() => [
    {
      href: "https://github.com/Tharunkunamalla",
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/tharun-kunamalla-/",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/Tharunk0509",
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/__tharun_0509.__/",
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
    },
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      });

      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      });

      gsap.from(infoRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: "5e5c5d50-8ed2-4b2d-b93d-3ba067f0af11",
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
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
        toast.success("Your message has been sent successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-right",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 bg-light-100 dark:bg-dark-100 overflow-hidden"
    >
      {/* Square Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000011_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0e_1px,transparent_1px)] [background-size:30px_30px] z-0"></div>

      {/* Blurred Color Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 opacity-20 rounded-full filter blur-2xl z-0"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-green-400 opacity-20 rounded-full filter blur-2xl transform -translate-x-1/2 z-0"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-950 dark:text-white"
        >
          Get In <span className="text-secondary-500">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-6 md:p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:bg-dark-400 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:bg-dark-400 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:bg-dark-400 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent dark:bg-dark-400 dark:text-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="interactive w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <Send className="h-5 w-5 mr-2" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                    <Mail className="h-5 w-5 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </h4>
                    <a
                      href="mailto:kunamallatharun701@gmail.com"
                      className="text-gray-950 dark:text-white hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors duration-300"
                    >
                      kunamallatharun701@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-secondary-50 dark:bg-secondary-900/30 rounded-lg">
                    <Phone className="h-5 w-5 text-secondary-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h4>
                    <a
                      href="tel:+91-6303-495-726"
                      className="text-gray-950 dark:text-white hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors duration-300"
                    >
                      +91 6303-495-726
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-accent-50 dark:bg-accent-900/30 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h4>
                    <p className="text-gray-950 dark:text-white">
                      Telangana, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-6">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map(({href, icon, label}) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-200 flex items-center justify-center text-gray-950 dark:text-white hover:bg-secondary-500 hover:text-white transition-all duration-300"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Feel free to reach out to me for any questions or opportunities.
                I look forward to hearing from you!😉
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
