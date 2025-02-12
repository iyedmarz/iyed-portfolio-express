
import { User, Award, Car, Code } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 animate-slide-in">
          <User className="text-primary" size={24} />
          <h2 className="text-3xl font-bold">About Me</h2>
        </div>
        <div className="bg-secondary rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <p className="text-gray-300 leading-relaxed mb-6">
            As a recent graduate with a passion for both coding and cars, I bring a unique blend of technical expertise and automotive enthusiasm. 
            Just as every car needs precise engineering, I believe in writing clean, efficient code that performs at its best.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300">
              <Code className="text-primary mt-1 group-hover:rotate-12 transition-transform" size={24} />
              <div>
                <h3 className="font-semibold mb-2 text-white">Tech Stack</h3>
                <p className="text-gray-400">Full-stack Development</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300">
              <Car className="text-primary mt-1 group-hover:translate-x-2 transition-transform" size={24} />
              <div>
                <h3 className="font-semibold mb-2 text-white">Passion</h3>
                <p className="text-gray-400">Automotive Technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
