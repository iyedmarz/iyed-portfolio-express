import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Quote, Linkedin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Iyed Chafroud",
    role: "Project Manager",
    company: "LST",
    avatar: "/lovable-uploads/iyedchafroud.jpg",
    linkedinUrl: "https://www.linkedin.com/in/iyad-chafroud/",
    text: "Working with this developer was a fantastic experience. They delivered high-quality code ahead of schedule and was extremely responsive to feedback.",
    textFr:
      "Travailler avec ce développeur était une expérience fantastique. Il a livré un code de haute qualité avant la date prévue et était extrêmement réceptif aux commentaires.",
  },
  {
    id: 2,
    name: "Ichraf Chatti",
    role: "Academic Assistant",
    company: "Faculty Of Science Monastir",
    avatar: "/profile.jpg",
    linkedinUrl: "https://www.linkedin.com/in/dr-ichraf-chatti-3a151915b/",
    text: "Iyed demonstrated a high level of scientific rigor, autonomy, and technical skills, making him an ideal candidate for demanding environments.",
    textFr:
      "Iyed a démontré un haut niveau de rigueur scientifique, d'autonomie et de compétences techniques, faisant de lui un candidat idéal pour des environnements exigeants.",
  },
  // {
  //   id: 3,
  //   name: "Emma Rodriguez",
  //   role: "UI/UX Designer",
  //   company: "CreativeWorks",
  //   avatar: "/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png",
  //   linkedinUrl: "https://linkedin.com/in/emma-rodriguez",
  //   text: "An exceptional team player who brought creative solutions to our project. Their attention to detail and ability to translate designs into functional code was impressive.",
  //   textFr:
  //     "Un coéquipier exceptionnel qui a apporté des solutions créatives à notre projet. Son attention aux détails et sa capacité à traduire des conceptions en code fonctionnel étaient impressionnantes.",
  // },
];

const ReviewsSection = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [currentReview, setCurrentReview] = useState(0);

  // Removed the useEffect for auto-rotation

  return (
    <section
      id="reviews"
      className={`py-20 px-4 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0B0B1E] to-[#070712]"
          : "bg-gradient-to-b from-white to-purple-50"
      }`}
    >
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

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-14 text-center">
          {language === "en" ? "Reviews" : "Reviews"}
        </h2>

        <div className="relative">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem
                  key={review.id}
                  className="flex justify-center items-center"
                >
                  <div
                    className={`px-4 py-10 md:p-10 rounded-2xl  relative ${
                      theme === "dark"
                        ? "bg-purple-500/5 backdrop-blur-sm border border-purple-500/10"
                        : "bg-white backdrop-blur-sm shadow-lg border border-purple-100"
                    }`}
                  >
                    <Quote
                      className={`absolute top-6 left-6 opacity-20 ${
                        theme === "dark" ? "text-purple-300" : "text-purple-400"
                      }`}
                      size={40}
                    />

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500/30">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p
                        className={`text-lg md:text-xl italic mb-6 max-w-2xl ${
                          theme === "dark" ? "text-purple-200" : "text-gray-700"
                        }`}
                      >
                        "{language === "en" ? review.text : review.textFr}"
                      </p>

                      <div className="flex items-center gap-2">
                        <a
                          href={review.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xl font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          } hover:underline flex items-center gap-2`}
                        >
                          <span>{review.name}</span>
                          <Linkedin
                            size={18}
                            className={
                              theme === "dark"
                                ? "text-blue-300"
                                : "text-blue-600"
                            }
                          />
                        </a>
                      </div>

                      <p
                        className={
                          theme === "dark"
                            ? "text-purple-300"
                            : "text-purple-700"
                        }
                      >
                        {review.role}, {review.company}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentReview
                      ? theme === "dark"
                        ? "bg-purple-500 w-6"
                        : "bg-purple-600 w-6"
                      : theme === "dark"
                      ? "bg-purple-500/30"
                      : "bg-purple-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <CarouselPrevious
              className={`absolute -left-14 top-1/2 -translate-y-1/2 ${
                theme === "dark"
                  ? "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/30"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300"
              }`}
              aria-label={
                language === "en" ? "Previous review" : "Témoignage précédent"
              }
            />

            <CarouselNext
              className={`absolute -right-14 top-1/2 -translate-y-1/2 ${
                theme === "dark"
                  ? "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/30"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300"
              }`}
              aria-label={
                language === "en" ? "Next review" : "Témoignage suivant"
              }
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
