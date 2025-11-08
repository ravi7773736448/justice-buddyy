import React from 'react';
import { MessageCircle, Bot, ArrowRight, Mic, Type, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: <MessageCircle className="h-16 w-16 text-teal-500" />,
      title: "Type or Speak Your Question",
      description: "Share your legal concern in your preferred language. You can type your question or use voice input for convenience.",
      features: ["Voice input support", "Multiple local languages", "Simple conversation interface"]
    },
    {
      step: 2,
      icon: <Bot className="h-16 w-16 text-blue-500" />,
      title: "AI Gives Simple Legal Guidance",
      description: "Our AI analyzes your question and provides clear, easy-to-understand legal advice tailored to your specific situation.",
      features: ["Instant responses", "Simple, clear language", "Contextual legal advice"]
    },
    {
      step: 3,
      icon: <ArrowRight className="h-16 w-16 text-green-500" />,
      title: "Take Action or Connect to Real Experts",
      description: "Follow the step-by-step guidance provided or get connected to legal professionals and NGOs for further assistance.",
      features: ["Actionable steps", "Expert connections", "Follow-up support"]
    }
  ];

  const inputMethods = [
    { icon: <Type className="h-8 w-8 text-blue-500" />, title: "Text Input", description: "Type your legal questions in any supported language" },
    { icon: <Mic className="h-8 w-8 text-green-500" />, title: "Voice Input", description: "Speak naturally in your local language for convenience" },
    { icon: <Globe className="h-8 w-8 text-purple-500" />, title: "Language Selection", description: "Choose from multiple regional languages for better understanding" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Justice Buddy <span className="text-emerald-600">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get legal help in three simple steps. Our AI-powered platform makes legal guidance accessible and easy to understand for everyone.
          </p>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-16`}
            >
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <div className="flex justify-center mb-6">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Input Methods Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Interact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the most comfortable way to communicate your legal concerns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inputMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-center mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-center lg:text-left">
              <Shield className="h-16 w-16 text-emerald-500 mx-auto lg:mx-0 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Privacy is Protected</h2>
              <p className="text-lg text-gray-600 mb-8">
                All conversations are encrypted and secure. Your personal information is never shared without consent.
              </p>
              <div className="space-y-4">
                {["End-to-end encryption", "No data sharing without consent", "Secure and confidential"].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
                {["Messages encrypted", "Data protected", "Privacy guaranteed"].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
