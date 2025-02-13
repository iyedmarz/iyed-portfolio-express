
import { GraduationCap, CarFront } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="text-center md:text-left animate-fade-in-slow md:flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-rev-up">
            <CarFront size={18} className="animate-bounce" />
            <span className="text-sm font-medium">Developer & Car Enthusiast</span>
            <GraduationCap size={18} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-secondary animate-slide-in">
            Iyed Marzouki
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 mb-8">
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
              className="inline-flex items-center px-6 py-3 bg-secondary/10 text-secondary rounded-full font-medium hover:bg-secondary/20 transition-all hover:scale-105 duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
        <div className="md:flex-1 flex justify-center md:justify-end animate-fade-in">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <img
              src="/lovable-uploads/6e928848-6d41-4d40-a5b0-bd618017e9b3.png"
              alt="Iyed Marzouki"
              className="rounded-full object-cover hover:scale-105 transition-transform duration-300 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
