
import { User, Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <User className="text-primary" size={24} />
          <h2 className="text-3xl font-bold">About Me</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-gray-600 leading-relaxed mb-6">
            As a recent graduate, I bring fresh perspectives and a strong foundation in computer science. 
            I'm passionate about technology and constantly learning new skills to stay at the forefront of innovation.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Award className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-gray-600">Bachelor's Degree in Computer Science</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Skills Focus</h3>
                <p className="text-gray-600">Web Development, Software Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
