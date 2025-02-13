
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "../hooks/use-toast";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Vous devrez remplacer ceci
        'YOUR_TEMPLATE_ID', // Vous devrez remplacer ceci
        formRef.current,
        'YOUR_PUBLIC_KEY' // Vous devrez remplacer ceci
      );

      if (result.text === 'OK') {
        toast({
          title: "Message envoyé !",
          description: "Merci de m'avoir contacté. Je vous répondrai dès que possible.",
        });
        formRef.current.reset();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Mail
                className="text-primary mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">iyedmarz@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Phone
                className="text-primary mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+216 96 950 288</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <MapPin
                className="text-primary mt-1 group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">Tunis, Tunisia</p>
              </div>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <Send
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
