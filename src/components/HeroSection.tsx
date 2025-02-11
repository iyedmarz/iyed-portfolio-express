
import { GraduationCap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-slow">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <GraduationCap size={18} />
          <span className="text-sm font-medium">Fresh Graduate</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Iyed Marzouki
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A passionate fresh graduate ready to make an impact in the tech world.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
