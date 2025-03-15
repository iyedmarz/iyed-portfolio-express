import { Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { translations } from "@/utils/translations";
import { Separator } from "@/components/ui/separator";

const ExperienceSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language].experience;

  return (
    <section className="py-20 px-4 bg-[#0B0B1E] relative overflow-hidden">
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
          <Briefcase className="text-purple-400" size={24} />
          <h2 className="text-3xl font-bold">{t.title}</h2>
        </div>

        <div className="space-y-10">
          {t.jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg"
            >
              <div className="md:flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-purple-300 mb-2">
                    <span className="font-medium">{job.company}</span>
                    <span className="mx-2">•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="text-gray-400 md:text-right mt-2 md:mt-0">
                  <span className="bg-purple-500/10 px-3 py-1 rounded-full text-purple-300 text-sm">
                    {job.period}
                  </span>
                </div>
              </div>

              <Separator className="my-4 bg-purple-500/20" />

              <div className="text-gray-300 space-y-3">
                {job.description.map((desc, idx) => (
                  <p key={idx} className="leading-relaxed">
                    • {desc}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
