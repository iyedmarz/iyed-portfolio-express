
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Mail className="text-primary mt-1 group-hover:rotate-12 transition-transform" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">iyed.marzouki@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <Phone className="text-primary mt-1 group-hover:rotate-12 transition-transform" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+216 XX XXX XXX</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
              <MapPin className="text-primary mt-1 group-hover:rotate-12 transition-transform" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">Tunisia</p>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 group flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
