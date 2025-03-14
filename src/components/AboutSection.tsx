import { User, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section
      id="about"
      className="min-h-screen bg-[#0B0B1E] py-20 px-4 relative overflow-hidden"
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-white">
          <User className="text-purple-400" size={24} />
          <h2 className="text-3xl font-bold">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 text-white z-10">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="text-purple-400" />
                {t.mission}
              </h3>
              <p className="text-gray-300 leading-relaxed">{t.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-medium mb-2">{t.origin}</h4>
                <p className="text-gray-400">{t.originValue}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-medium mb-2">{t.currentBase}</h4>
                <p className="text-gray-400">{t.currentBaseValue}</p>
              </div>
            </div>
          </div>

          {/* Gallery Grid with smaller images */}
          <div className="grid grid-cols-3 gap-4  mx-auto ">
            {/* Main Photo 1 - Top left */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/1-2.jpg"
                alt="Starry Night Sky"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>

            {/* Photo 2 - Top right */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/3.jpg"
                alt="Technology"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>

            {/* Photo 3 - Bottom left */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/7.jpg"
                alt="Programming"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>

            {/* Photo 4 - Bottom right */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/4.jpg"
                alt="Person using laptop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>
            {/* Photo 5 - Bottom right */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/5.jpg"
                alt="Person using laptop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>
            {/* Photo 6 - Bottom right */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-purple-500/20 group">
              <img
                src="/lovable-uploads/2.jpg"
                alt="Person using laptop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
