
import { useState } from "react";
import { Code, Languages, Tool } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const skillsData = {
  languages: [
    { name: "JavaScript", level: "Advanced", icon: "⚡" },
    { name: "TypeScript", level: "Intermediate", icon: "🔷" },
    { name: "HTML/CSS", level: "Advanced", icon: "🎨" },
    { name: "Python", level: "Basic", icon: "🐍" },
  ],
  frameworks: [
    { name: "React", level: "Advanced", icon: "⚛️" },
    { name: "Next.js", level: "Intermediate", icon: "🚀" },
    { name: "Vue.js", level: "Basic", icon: "🟢" },
    { name: "Express.js", level: "Intermediate", icon: "🛠️" },
  ],
  tools: [
    { name: "Git", level: "Advanced", icon: "🏁" },
    { name: "Docker", level: "Basic", icon: "🐳" },
    { name: "Figma", level: "Intermediate", icon: "🎭" },
    { name: "VS Code", level: "Advanced", icon: "📝" },
  ]
};

const SkillsSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("languages");

  const translations = {
    en: {
      title: "Skills",
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      level: {
        Advanced: "Advanced",
        Intermediate: "Intermediate",
        Basic: "Basic"
      }
    },
    fr: {
      title: "Compétences",
      languages: "Langages",
      frameworks: "Frameworks",
      tools: "Outils",
      level: {
        Advanced: "Avancé",
        Intermediate: "Intermédiaire",
        Basic: "Débutant"
      }
    }
  };

  const t = translations[language];

  return (
    <section id="skills" className="py-20 px-4 bg-[#0B0B1E] relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">{t.title}</h2>
        
        <Tabs defaultValue="languages" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 w-full bg-white/5 backdrop-blur-sm">
            <TabsTrigger 
              value="languages"
              className={`flex items-center gap-2 ${activeTab === "languages" ? "text-purple-300" : "text-gray-400"}`}
            >
              <Languages size={18} />
              <span className="hidden sm:inline">{t.languages}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="frameworks"
              className={`flex items-center gap-2 ${activeTab === "frameworks" ? "text-purple-300" : "text-gray-400"}`}
            >
              <Code size={18} />
              <span className="hidden sm:inline">{t.frameworks}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tools"
              className={`flex items-center gap-2 ${activeTab === "tools" ? "text-purple-300" : "text-gray-400"}`}
            >
              <Tool size={18} />
              <span className="hidden sm:inline">{t.tools}</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(skillsData).map(([category, skills]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl group-hover:animate-bounce">{skill.icon}</span>
                      <h3 className="font-semibold text-white group-hover:animate-rev-up">{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-purple-900/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                          style={{
                            width:
                              skill.level === "Advanced"
                                ? "90%"
                                : skill.level === "Intermediate"
                                ? "60%"
                                : "30%",
                          }}
                        />
                      </div>
                      <span className="text-sm text-purple-300">{t.level[skill.level]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
