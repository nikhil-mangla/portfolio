import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendMail = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_yhraazh"; 
    const templateID = "template_226ikmm"; 
    const publicKey = "3WpAerJgUVK3qXuTq"; // Your EmailJS Public Key

    try {
      await emailjs.send(serviceID, templateID, formData, publicKey);
      setFormData({ name: "", email: "", message: "" });
      Swal.fire({
        title: "Message sent successfully!",
        text: "I'll get back to you soon!",
        icon: "success",
      });
    } catch (error) {
      console.error("❌ Email sending error:", error);
      Swal.fire({
        title: "Error!",
        text: "Error sending email. Please try again.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
      <h2
        data-aos="fade-down"
        data-aos-duration="1000"
        className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
      >
        Contact Me
      </h2>
      <p
        data-aos="fade-up"
        data-aos-duration="1100"
        className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
      >
        Got a question? Send me a message, and I'll get back to you soon.
      </p>

      <div className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0" id="Contact">
        <div className="container mx-auto w-full lg:w-2/4">
          <div data-aos="fade-right" className="bg-white/5 rounded-3xl shadow-2xl p-5 sm:p-10 w-full">
            <form method="POST" onSubmit={sendMail} className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
