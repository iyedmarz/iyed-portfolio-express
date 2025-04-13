
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_48njowf",
        "template_0inc7kn",
        formRef.current,
        "xte223UBcDtxZBAWZ"
      );

      if (result.text === "OK") {
        toast({
          title: language === "en" ? "Message sent!" : "Message envoyé !",
          description: language === "en" 
            ? "Thanks for reaching out. I'll get back to you soon." 
            : "Merci de m'avoir contacté. Je vous répondrai bientôt.",
        });
        formRef.current.reset();
      }
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Erreur",
        description: language === "en"
          ? "Something went wrong. Please try again."
          : "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
        <AnimatedSection animation="fade-down">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            {language === "en" ? "Get in Touch" : "Contactez-moi"}
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-right" delay={200} className="space-y-6">
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Mail
                className="text-purple-400 mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1 text-white">Email</h3>
                <p className="text-purple-200">iyedmarz@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Phone
                className="text-purple-400 mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1 text-white">
                  {language === "en" ? "Phone" : "Téléphone"}
                </h3>
                <p className="text-purple-200">+216 96 950 288</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <MapPin
                className="text-purple-400 mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1 text-white">
                  {language === "en" ? "Location" : "Localisation"}
                </h3>
                <p className="text-purple-200">Tunis, Tunisia</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-left" delay={400}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="user_name"
                placeholder={language === "en" ? "Your Name" : "Votre Nom"}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <input
                type="email"
                name="user_email"
                placeholder={language === "en" ? "Your Email" : "Votre Email"}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <textarea
                name="message"
                placeholder={language === "en" ? "Your Message" : "Votre Message"}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-500 transition-all duration-300 hover:scale-105 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting 
                    ? (language === "en" ? "Sending..." : "Envoi en cours...") 
                    : (language === "en" ? "Send Message" : "Envoyer le Message")}
                </span>
                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
