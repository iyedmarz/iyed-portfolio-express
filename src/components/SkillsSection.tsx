import { useState } from "react";
import {
  Code,
  Languages,
  Wrench,
  Database,
  Globe,
  Server,
  Library,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const skillsData = {
  languages: [
    { name: "JavaScript", icon: "" },
    { name: "TypeScript", icon: "" },
    { name: "C / C++", icon: "" },
    { name: "Python", icon: "" },
    { name: "Php", icon: "" },
  ],
  frameworks: {
    frontend: [
      { name: "HTML/CSS", icon: "" },
      { name: "React", icon: "" },
      { name: "Next.js", icon: "" },
      { name: "Redux", icon: "" },
      { name: "Tailwind CSS", icon: "" },
      { name: "Bootstrap", icon: "" },
    ],
    backend: [
      { name: "Node.js", icon: "" },
      { name: "Express.js", icon: "" },
      { name: "NestJS", icon: "" },
      { name: "FireBase", icon: "" },
    ],
    database: [
      { name: "MongoDB", icon: "" },
      { name: "PostgreSQL", icon: "" },
      { name: "MySQL", icon: "" },
    ],
    libraries: [
      { name: "WordPress", icon: "" },
      { name: "TenserFlow", icon: "" },
      { name: "Tauri", icon: "" },
    ],
  },
  tools: [
    { name: "Git/GitHub", icon: "" },
    { name: "Postman", icon: "" },
    { name: "Pg4Admin", icon: "" },
    { name: "VS Code", icon: "" },
    { name: "Jira", icon: "" },
    { name: "Figma", icon: "" },
  ],
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
      frameworks: "Web Developement",
      tools: "Tools",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      libraries: "Other",
    },
    fr: {
      title: "Compétences",
      languages: "Langages",
      frameworks: "Développement Web",
      tools: "Outils",
      frontend: "Frontend",
      backend: "Backend",
      database: "Base de données",
      libraries: "Autre",
    },
  };

  const t = translations[language];

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-[#0B0B1E] relative overflow-hidden"
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

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          {t.title}
        </h2>

        <Tabs
          defaultValue="languages"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 w-full bg-white/5 backdrop-blur-sm">
            <TabsTrigger
              value="languages"
              className={`flex items-center gap-2 ${
                activeTab === "languages" ? "text-purple-300" : "text-gray-400"
              }`}
            >
              <Languages size={18} />
              <span className="hidden sm:inline">{t.languages}</span>
            </TabsTrigger>
            <TabsTrigger
              value="frameworks"
              className={`flex items-center gap-2 ${
                activeTab === "frameworks" ? "text-purple-300" : "text-gray-400"
              }`}
            >
              <Code size={18} />
              <span className="hidden sm:inline">{t.frameworks}</span>
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className={`flex items-center gap-2 ${
                activeTab === "tools" ? "text-purple-300" : "text-gray-400"
              }`}
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
                  <span className="text-xl group-hover:animate-bounce">
                    {skill.icon}
                  </span>
                  <h3 className="font-medium text-white text-sm">
                    {skill.name}
                  </h3>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="frameworks" className="mt-0">
            <Tabs
              defaultValue="frontend"
              value={frameworkCategory}
              onValueChange={setFrameworkCategory}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6 w-full bg-white/5 backdrop-blur-sm">
                <TabsTrigger
                  value="frontend"
                  className={`flex items-center gap-2 ${
                    frameworkCategory === "frontend"
                      ? "text-purple-300"
                      : "text-gray-400"
                  }`}
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">{t.frontend}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="backend"
                  className={`flex items-center gap-2 ${
                    frameworkCategory === "backend"
                      ? "text-purple-300"
                      : "text-gray-400"
                  }`}
                >
                  <Server size={16} />
                  <span className="hidden sm:inline">{t.backend}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="database"
                  className={`flex items-center gap-2 ${
                    frameworkCategory === "database"
                      ? "text-purple-300"
                      : "text-gray-400"
                  }`}
                >
                  <Database size={16} />
                  <span className="hidden sm:inline">{t.database}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="libraries"
                  className={`flex items-center gap-2 ${
                    frameworkCategory === "libraries"
                      ? "text-purple-300"
                      : "text-gray-400"
                  }`}
                >
                  <Library size={16} />
                  <span className="hidden sm:inline">{t.libraries}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frontend" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  {skillsData.frameworks.frontend.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-xl group-hover:animate-bounce">
                        {skill.icon}
                      </span>
                      <h3 className="font-medium text-white text-sm">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="backend" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  {skillsData.frameworks.backend.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-xl group-hover:animate-bounce">
                        {skill.icon}
                      </span>
                      <h3 className="font-medium text-white text-sm">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="database" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  {skillsData.frameworks.database.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-xl group-hover:animate-bounce">
                        {skill.icon}
                      </span>
                      <h3 className="font-medium text-white text-sm">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="libraries" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  {skillsData.frameworks.libraries.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-xl group-hover:animate-bounce">
                        {skill.icon}
                      </span>
                      <h3 className="font-medium text-white text-sm">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {skillsData.tools.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm p-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group border border-purple-500/20 flex items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl group-hover:animate-bounce">
                    {skill.icon}
                  </span>
                  <h3 className="font-medium text-white text-sm">
                    {skill.name}
                  </h3>
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
