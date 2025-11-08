import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scale,
  Globe,
  Smartphone,
  Shield,
  MessageCircle,
  Bot,
  ArrowRight,
  Briefcase,
  Heart,
  User,
  PiggyBank,
} from "lucide-react";
import { motion } from "framer-motion";

// Typewriter hook
const useTypewriter = (text, speed = 150) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayedText;
};

// Reusable Section Card Component
const Card = ({ icon, title, delay = 0, direction = "y" }) => (
  <motion.div
    initial={{ opacity: 0, [direction]: 20 }}
    whileInView={{ opacity: 1, [direction]: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transform hover:scale-105 transition"
  >
    {icon}
    <span className="font-medium text-gray-800 text-center sm:text-left">{title}</span>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const heroText = useTypewriter("AI-Powered Legal Aid for Rural Communities");

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 sm:py-28 text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-snug">
            <span className="text-emerald-600">{heroText}</span>
            <span className="animate-blink">|</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 px-2 sm:px-0">
            Simple, reliable, and free legal guidance in your local language.
          </p>

          {/* Interactive Chat-Like Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={() => navigate("/chat")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-emerald-600 text-emerald-600 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center relative mb-3 sm:mb-0"
            >
              Ask Your Question
              <span className="absolute right-5 animate-blink">|</span>
            </motion.button>

            <button className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 text-center px-4 sm:px-6">
          {[
            { icon: <Scale className="h-10 w-10 text-blue-500 mx-auto" />, title: "Free AI Legal Help" },
            { icon: <Globe className="h-10 w-10 text-green-500 mx-auto" />, title: "Local Language Support" },
            { icon: <Smartphone className="h-10 w-10 text-blue-500 mx-auto" />, title: "Mobile Friendly" },
            { icon: <Shield className="h-10 w-10 text-green-500 mx-auto" />, title: "Secure & Private" },
          ].map((f, i) => (
            <Card key={i} icon={f.icon} title={f.title} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-gray-50 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-10 sm:mb-12">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            { icon: <MessageCircle className="h-14 w-14 text-teal-500 mx-auto" />, title: "Ask Your Question" },
            { icon: <Bot className="h-14 w-14 text-blue-500 mx-auto" />, title: "AI Gives Guidance" },
            { icon: <ArrowRight className="h-14 w-14 text-green-500 mx-auto" />, title: "Take Action" },
          ].map((step, i) => (
            <Card key={i} icon={step.icon} title={step.title} delay={i * 0.2} />
          ))}
        </div>
      </section>

      {/* Legal Areas Section */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-12">Featured Legal Help Areas</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {[
            { icon: <Briefcase className="text-green-600 h-7 w-7" />, title: "Land & Farming Disputes" },
            { icon: <Heart className="text-green-600 h-7 w-7" />, title: "Women's Rights" },
            { icon: <User className="text-green-600 h-7 w-7" />, title: "Labor & Wage Issues" },
            { icon: <PiggyBank className="text-green-600 h-7 w-7" />, title: "Pension & Schemes" },
          ].map((area, i) => (
            <Card key={i} icon={area.icon} title={area.title} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-600 to-green-700 text-center text-white px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Don't struggle alone — Justice Buddy is here to guide you.</h2>
        <button className="bg-white text-emerald-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started Now
        </button>
      </section>

      {/* Tailwind Blink Animation */}
      <style>
        {`
          .animate-blink {
            animation: blink 1s steps(2, start) infinite;
          }
          @keyframes blink {
            to { visibility: hidden; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
