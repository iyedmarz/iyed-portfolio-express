
import { useState } from "react";
import { Code, Languages, Wrench, Database, Globe, Server, Library } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const skillsData = {
  languages: [
    { name: "JavaScript", icon: "⚡" },
    { name: "TypeScript", icon: "🔷" },
    { name: "HTML/CSS", icon: "🎨" },
    { name: "Python", icon: "🐍" },
  ],
  frameworks: {
    frontend: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "🚀" },
      { name: "Vue.js", icon: "🟢" },
      { name: "Angular", icon: "🔺" },
    ],
    backend: [
      { name: "Express.js", icon: "🛠️" },
      { name: "NestJS", icon: "🏢" },
      { name: "Django", icon: "🐍" },
      { name: "Spring Boot", icon: "🌱" },
    ],
    database: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🏛️" },
      { name: "Redis", icon: "🔴" },
    ],
    libraries: [
      { name: "TailwindCSS", icon: "💨" },
      { name: "Redux", icon: "🔄" },
      { name: "Axios", icon: "🌐" },
      { name: "Socket.IO", icon: "🔌" },
    ],
  },
  tools: [
    { name: "Git", icon: "🏁" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma", icon: "🎭" },
    { name: "VS Code", icon: "📝" },
  ]
};

const SkillsSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("languages");
  const [frameworkCategory, setFrameworkCategory] = useState("frontend");

  const translations = {
    en: {
      title: "Skills",
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      libraries: "Libraries/Platforms",
      select: "Select category"
    },
    fr: {
      title: "Compétences",
      languages: "Langages",
      frameworks: "Frameworks",
      tools: "Outils",
      frontend: "Frontend",
      backend: "Backend",
      database: "Base de données",
      libraries: "Bibliothèques/Plateformes",
      select: "Sélectionner catégorie"
    }
  };

  const t = translations[language];

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'frontend': return <Globe size={16} />;
      case 'backend': return <Server size={16} />;
      case 'database': return <Database size={16} />;
      case 'libraries': return <Library size={16} />;
      default: return <Globe size={16} />;
    }
  };

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
              <Wrench size={18} />
              <span className="hidden sm:inline">{t.tools}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="languages" className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {skillsData.languages.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl group-hover:animate-bounce">{skill.icon}</span>
                  <h3 className="font-medium text-white text-sm">{skill.name}</h3>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frameworks" className="mt-0">
            <div className="mb-4">
              <Select
                value={frameworkCategory}
                onValueChange={setFrameworkCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-white/5 border-purple-500/20 text-white">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(frameworkCategory)} 
                    <SelectValue placeholder={t.select} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A3A] border-purple-500/20">
                  <SelectItem value="frontend" className="text-white flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Globe size={16} /> {t.frontend}
                    </div>
                  </SelectItem>
                  <SelectItem value="backend" className="text-white">
                    <div className="flex items-center gap-2">
                      <Server size={16} /> {t.backend}
                    </div>
                  </SelectItem>
                  <SelectItem value="database" className="text-white">
                    <div className="flex items-center gap-2">
                      <Database size={16} /> {t.database}
                    </div>
                  </SelectItem>
                  <SelectItem value="libraries" className="text-white">
                    <div className="flex items-center gap-2">
                      <Library size={16} /> {t.libraries}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {skillsData.frameworks[frameworkCategory].map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl group-hover:animate-bounce">{skill.icon}</span>
                  <h3 className="font-medium text-white text-sm">{skill.name}</h3>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {skillsData.tools.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl group-hover:animate-bounce">{skill.icon}</span>
                  <h3 className="font-medium text-white text-sm">{skill.name}</h3>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
