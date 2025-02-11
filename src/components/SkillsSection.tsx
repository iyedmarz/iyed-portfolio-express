
const skills = [
  { name: "Web Development", level: "Advanced" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Node.js", level: "Basic" },
  { name: "Git", level: "Intermediate" },
  { name: "UI/UX Design", level: "Basic" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{skill.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
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
                <span className="text-sm text-gray-500">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
