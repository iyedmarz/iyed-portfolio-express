
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: Github,
    color: "hover:text-[#333]",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    color: "hover:text-[#0077b5]",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: Twitter,
    color: "hover:text-[#1da1f2]",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: Instagram,
    color: "hover:text-[#e4405f]",
  },
];

const SocialLinks = () => {
  return (
    <div className="fixed left-6 bottom-0 z-50 hidden lg:flex flex-col items-center gap-4 after:content-[''] after:w-[1px] after:h-24 after:bg-gray-300">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 transition-all duration-300 hover:-translate-y-1 ${link.color}`}
          aria-label={link.name}
        >
          <link.icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
