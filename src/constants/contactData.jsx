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

export const socialLinks = [
  {
    icon: <Github />,
    href: "https://github.com/Tharunkunamalla",
    color: "hover:text-white hover:bg-gray-800",
  },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/tharun-kunamalla-/",
    color: "hover:text-white hover:bg-blue-600",
  },
  {
    icon: <Twitter />,
    href: "https://x.com/Tharunk0509",
    color: "hover:text-white hover:bg-black",
  },
  {
    icon: <Instagram />,
    href: "https://www.instagram.com/__tharun_0509.__/",
    color: "hover:text-white hover:bg-pink-600",
  },
  {
    icon: <FaWhatsapp className="w-6 h-6" />,
    href: whatsappHref,
    color: "hover:text-white hover:bg-green-500",
  },
  {
    icon: <FaDiscord className="w-6 h-6" />,
    href: "https://discord.com/users/751713701425446945",
    color: "hover:text-white hover:bg-[#5865F2]",
  },
];
