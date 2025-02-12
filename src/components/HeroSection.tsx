
import { GraduationCap, CarFront } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-secondary via-secondary/95 to-secondary">
      <div className="text-center animate-fade-in-slow">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-rev-up">
          <CarFront size={18} className="animate-bounce" />
          <span className="text-sm font-medium">Developer & Car Enthusiast</span>
          <GraduationCap size={18} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white animate-slide-in">
          Iyed Marzouki
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          A passionate fresh graduate who turns coffee into code and dreams about both algorithms and automobiles.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 duration-300 hover:shadow-lg hover:shadow-primary/20"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
