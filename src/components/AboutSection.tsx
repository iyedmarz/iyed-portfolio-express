
import { User, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";
import { useEffect, useRef } from "react";

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  const animationRef = useRef<number | null>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  // Setup the continuous vertical animation
  useEffect(() => {
    const container = imagesContainerRef.current;
    if (!container) return;
    
    let position = 0;
    const speed = 0.5; // Pixels per frame, adjust for speed
    const totalImages = 4;
    
    // Clone first images and append them to the end for seamless loop
    const firstImages = container.querySelectorAll('.image-item');
    firstImages.forEach(img => {
      const clone = img.cloneNode(true) as HTMLElement;
      container.appendChild(clone);
    });
    
    const animate = () => {
      if (!container) return;
      
      position += speed;
      const imgHeight = container.querySelector('.image-item')?.clientHeight || 0;
      const resetPoint = imgHeight * totalImages;
      
      // Reset position when we've scrolled through the original set
      if (position >= resetPoint) {
        position = 0;
      }
      
      container.style.transform = `translateY(-${position}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="min-h-screen bg-[#0B0B1E] py-20 px-4 relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <div className="space-y-6 text-white z-10">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="text-purple-400" />
                {t.mission}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t.description}
              </p>
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

          {/* Gallery with Continuous Vertical Animation */}
          <div className="h-full bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 overflow-hidden">
            <div 
              ref={imagesContainerRef} 
              className="transition-transform"
            >
              {/* Image 1 */}
              <div className="image-item relative w-full">
                <img 
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                  alt="Starry Night Sky"
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
              </div>
              
              {/* Image 2 */}
              <div className="image-item relative w-full">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Technology"
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
              </div>
              
              {/* Image 3 */}
              <div className="image-item relative w-full">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  alt="Programming"
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
              </div>
              
              {/* Image 4 */}
              <div className="image-item relative w-full">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Person using laptop"
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
