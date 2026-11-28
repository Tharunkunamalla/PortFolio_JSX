import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {FaDiscord, FaWhatsapp} from "react-icons/fa";

export const whatsappNumber = "916303480726";
export const whatsappMessage = encodeURIComponent(
  "Hi Tharun, I came across your portfolio and would like to discuss a project."
);
export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "tharun.stark701@gmail.com",
    href: "mailto:tharun.stark701@gmail.com",
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

export const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5 transition-colors duration-300" />,
    href: "https://github.com/Tharunkunamalla",
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5 transition-colors duration-300" />,
    href: "https://www.linkedin.com/in/tharun-kunamalla-/",
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-5 h-5 transition-colors duration-300" />,
    href: "https://x.com/Tharunk0509",
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5 transition-colors duration-300" />,
    href: "https://www.instagram.com/__tharun_0509.__/",
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp className="w-5 h-5 transition-colors duration-300" />,
    href: whatsappHref,
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="w-5 h-5 transition-colors duration-300" />,
    href: "https://discord.com/users/751713701425446945",
    hoverColor: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-md",
  },
];
