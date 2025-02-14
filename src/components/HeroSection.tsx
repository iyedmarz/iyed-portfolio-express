
import { GraduationCap, CarFront } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-secondary via-secondary/95 to-secondary">
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="text-center md:text-left animate-fade-in-slow md:flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-rev-up">
            <CarFront size={18} className="animate-bounce" />
            <span className="text-sm font-medium">Developer & Car Enthusiast</span>
            <GraduationCap size={18} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white animate-slide-in">
            Iyed Marzouki
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8">
            A passionate fresh graduate who turns coffee into code and dreams about both algorithms and automobiles.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all hover:scale-105 duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
        <div className="md:flex-1 flex justify-center md:justify-end animate-fade-in">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-primary/50 animate-rev-light" />
            <img
              src="/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png"
              alt="Iyed Marzouki"
              className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-white/10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
