
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: Github,
    color: "hover:text-purple-400",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    color: "hover:text-purple-400",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: Twitter,
    color: "hover:text-purple-400",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: Instagram,
    color: "hover:text-purple-400",
  },
];

const SocialLinks = () => {
  return (
    <div className="fixed left-6 bottom-0 z-50 hidden lg:flex flex-col items-center gap-4 after:content-[''] after:w-[1px] after:h-24 after:bg-purple-500/20">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-sm bg-white/5 rounded-full border border-purple-500/10 ${link.color}`}
          aria-label={link.name}
        >
          <link.icon 
            size={20} 
            className="group-hover:animate-rev-up text-purple-300 group-hover:text-purple-400 transition-colors" 
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
