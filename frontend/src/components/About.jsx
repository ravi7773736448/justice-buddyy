import React from 'react';

import { Link } from 'react-router-dom';
import { Ban, DollarSign, FileText, AlertCircle, Bot, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const problems = [
    {
      icon: <Ban className="h-12 w-12 text-red-500" />,
      title: "Limited access to lawyers",
      description: "Many rural communities lack proper legal representation."
    },
    {
      icon: <FileText className="h-12 w-12 text-red-500" />,
      title: "Complex legal language",
      description: "Legal jargon creates barriers for common people."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-red-500" />,
      title: "High consultation costs",
      description: "Professional legal advice is often expensive."
    },
    {
      icon: <AlertCircle className="h-12 w-12 text-red-500" />,
      title: "Lack of awareness",
      description: "People are unaware of their legal rights and benefits."
    }
  ];

  const solutions = [
    {
      icon: <Bot className="h-12 w-12 text-emerald-500" />,
      title: "AI-Powered Guidance",
      description: "Instant answers to common legal queries."
    },
    {
      icon: <Globe className="h-12 w-12 text-emerald-500" />,
      title: "Local Language Support",
      description: "Speak or type in your own language."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-emerald-500" />,
      title: "Mobile-Friendly",
      description: "Works even with low internet access."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Bridging the Justice Gap for{' '}
              <span className="text-emerald-600">Rural Communities</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Justice Buddy is an AI-powered legal aid platform providing free, simple, and 
              accessible legal guidance in local languages for rural areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/chat"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Ask Your Question
              </Link>
              <Link
                to="/features"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="bg-green-100 rounded-full p-12 flex items-center justify-center shadow-lg">
              <div className="flex space-x-4">
                <div className="w-16 h-20 bg-orange-300 rounded-t-full flex items-end justify-center">
                  <div className="w-8 h-8 bg-orange-400 rounded-full mb-2"></div>
                </div>
                <div className="w-16 h-20 bg-yellow-300 rounded-t-full flex items-end justify-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full mb-2"></div>
                </div>
                <div className="w-16 h-20 bg-blue-200 rounded-t-full flex items-end justify-center">
                  <div className="w-8 h-8 bg-blue-300 rounded-full mb-2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe justice should be accessible to everyone. 
              Justice Buddy uses technology to break barriers, empower rural communities, 
              and provide timely legal support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Challenges We Address</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Many people in rural areas face legal barriers due to cost, awareness, and language.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{problem.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Justice Buddy leverages AI and mobile tech to make legal guidance accessible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-emerald-50 p-8 rounded-xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A world where every villager, farmer, worker, and woman has equal access to legal information 
              and can stand up for their rights with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Legal Help?</h2>
            <p className="text-xl mb-8">
              Join thousands of people who have already found guidance through Justice Buddy.
            </p>
            <Link
              to="/chat"
              className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 shadow-lg transition-all duration-300"
            >
              Start Your Legal Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
