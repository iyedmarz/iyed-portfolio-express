
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechVision Inc.",
    avatar: "/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png",
    rating: 5,
    text: "Working with this developer was a fantastic experience. They delivered high-quality code ahead of schedule and was extremely responsive to feedback.",
    textFr: "Travailler avec ce développeur était une expérience fantastique. Il a livré un code de haute qualité avant la date prévue et était extrêmement réceptif aux commentaires."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupLaunch",
    avatar: "/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png",
    rating: 5,
    text: "One of the best developers I've worked with. Their technical skills and problem-solving abilities are top-notch. Would definitely hire again.",
    textFr: "L'un des meilleurs développeurs avec qui j'ai travaillé. Ses compétences techniques et ses capacités de résolution de problèmes sont excellentes. Je l'embaucherais certainement à nouveau."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "UI/UX Designer",
    company: "CreativeWorks",
    avatar: "/lovable-uploads/26e439cf-e0f5-41d2-baba-495715e4ae9d.png",
    rating: 5,
    text: "An exceptional team player who brought creative solutions to our project. Their attention to detail and ability to translate designs into functional code was impressive.",
    textFr: "Un coéquipier exceptionnel qui a apporté des solutions créatives à notre projet. Son attention aux détails et sa capacité à traduire des conceptions en code fonctionnel étaient impressionnantes."
  }
];

const ReviewsSection = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextReview();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentReview]);

  const handlePrevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="reviews"
      className={`py-20 px-4 relative overflow-hidden ${
        theme === "dark" 
          ? "bg-gradient-to-b from-[#0B0B1E] to-[#070712]" 
          : "bg-gradient-to-b from-white to-purple-50"
      }`}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-14 text-center">
          {language === "en" ? "Client Testimonials" : "Témoignages de Clients"}
        </h2>

        <div className="relative px-12">
          {/* Navigation buttons */}
          <Button
            onClick={handlePrevReview}
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full z-10 ${
              theme === "dark" 
                ? "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/30" 
                : "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300"
            }`}
            aria-label={language === "en" ? "Previous review" : "Témoignage précédent"}
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            onClick={handleNextReview}
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full z-10 ${
              theme === "dark" 
                ? "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500/30" 
                : "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300"
            }`}
            aria-label={language === "en" ? "Next review" : "Témoignage suivant"}
          >
            <ChevronRight size={24} />
          </Button>

          {/* Reviews carousel */}
          <div className="relative overflow-hidden rounded-2xl px-4 py-10 md:p-10">
            <div className={`absolute inset-0 ${
              theme === "dark" 
                ? "bg-purple-500/5 backdrop-blur-sm border border-purple-500/10" 
                : "bg-white backdrop-blur-sm shadow-lg border border-purple-100"
            } rounded-2xl`}></div>
            
            <Quote 
              className={`absolute top-6 left-6 opacity-20 ${
                theme === "dark" ? "text-purple-300" : "text-purple-400"
              }`} 
              size={40} 
            />

            <div className="relative mt-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`transition-all duration-500 absolute top-0 left-0 w-full ${
                    index === currentReview 
                      ? "opacity-100 translate-x-0" 
                      : index < currentReview || (currentReview === 0 && index === reviews.length - 1)
                        ? "opacity-0 -translate-x-full" 
                        : "opacity-0 translate-x-full"
                  }`}
                  style={{ display: index === currentReview ? "block" : "none" }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500/30">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    
                    <p className={`text-lg md:text-xl italic mb-6 max-w-2xl ${
                      theme === "dark" ? "text-purple-200" : "text-gray-700"
                    }`}>
                      "{language === "en" ? review.text : review.textFr}"
                    </p>
                    
                    <h3 className={`text-xl font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {review.name}
                    </h3>
                    
                    <p className={theme === "dark" ? "text-purple-300" : "text-purple-700"}>
                      {review.role}, {review.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentReview(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
