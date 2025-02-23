
const skills = [
  { name: "Web Development", level: "Advanced", icon: "🚀" },
  { name: "JavaScript", level: "Intermediate", icon: "⚡" },
  { name: "React", level: "Intermediate", icon: "🛠" },
  { name: "Node.js", level: "Basic", icon: "🔧" },
  { name: "Git", level: "Intermediate", icon: "🏁" },
  { name: "UI/UX Design", level: "Basic", icon: "🎨" },
];

const SkillsSection = () => {
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
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Skills</h2>
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
                <span className="text-sm text-purple-300">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
