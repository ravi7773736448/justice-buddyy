import { useState } from 'react';
import { motion } from 'framer-motion';

const legalCategories = [
  "Land & Farming Disputes",
  "Women's Rights & Protection",
  "Labor & Wage Issues",
  "Pensions & Government Schemes",
  "Property & Inheritance Issues",
  "RTI & Government Applications",
];

const stepsData = {
  "Land & Farming Disputes": [
    { title: "Document Your Land", description: "Collect ownership papers, tenancy agreements, and relevant records." },
    { title: "Consult Legal Aid", description: "Reach out to local legal experts or government land officers." },
    { title: "File Your Complaint", description: "Submit disputes through proper authorities or local courts." }
  ],
  "Women's Rights & Protection": [
    { title: "Know Your Rights", description: "Understand domestic violence, inheritance, and workplace protection laws." },
    { title: "Reach Out for Help", description: "Contact local women's rights groups or legal aid centers." },
    { title: "File Your Complaint", description: "File legal cases or applications as needed." }
  ],
  "Labor & Wage Issues": [
    { title: "Check Employment Documents", description: "Verify your employment contract and wage records." },
    { title: "Consult Labor Authorities", description: "Report wage or safety violations to labor offices." },
    { title: "Take Legal Action", description: "Follow step-by-step process to claim dues legally." }
  ],
  "Pensions & Government Schemes": [
    { title: "Check Eligibility", description: "Confirm if you qualify for pension or government schemes." },
    { title: "Gather Documents", description: "Prepare identity, employment, and income proofs." },
    { title: "Submit Applications", description: "Apply for pension or subsidy programs through official portals." }
  ],
  "Property & Inheritance Issues": [
    { title: "Gather Property Papers", description: "Collect ownership documents, sale deeds, and family records." },
    { title: "Consult Legal Aid", description: "Reach out to local lawyers specializing in property law." },
    { title: "File Disputes if Needed", description: "Submit legal claims in court or mediation." }
  ],
  "RTI & Government Applications": [
    { title: "Identify Your Request", description: "Decide which information or service you need." },
    { title: "Prepare Your Application", description: "Fill forms and gather necessary details." },
    { title: "Submit to Authorities", description: "Send RTI or other applications to relevant departments." }
  ],
};

const GetLegalHelp = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const steps = selectedCategory ? stepsData[selectedCategory] : [];

  const handleSubmit = () => {
    if (!selectedCategory || !userQuery) {
      alert("Please select a category and enter your question.");
      return;
    }

    // Future integration: send `selectedCategory` and `userQuery` to backend/admin panel
    console.log({ category: selectedCategory, question: userQuery });

    setSubmitted(true);
    setUserQuery("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Legal Help
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your legal category and get step-by-step guidance to resolve your issue.
          </p>
        </motion.div>
      </section>

      {/* Category Selector & Query Input */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <label className="block text-gray-700 font-semibold mb-2">
              Choose Legal Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Select Category --</option>
              {legalCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 text-center">
            <label className="block text-gray-700 font-semibold mb-2">
              Describe Your Issue
            </label>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Describe your legal issue here..."
              className="w-full md:w-3/4 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={4}
            />
          </div>

          <div className="text-center mb-12">
            <button
              onClick={handleSubmit}
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
            >
              Submit Your Question
            </button>
            {submitted && (
              <p className="mt-4 text-green-600 font-semibold">
                Your question has been submitted!
              </p>
            )}
          </div>

          {/* Step-by-Step Guidance */}
          {steps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📌</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {selectedCategory === "" && (
            <p className="text-gray-500 text-center mt-6">
              Please select a category to see guidance steps.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default GetLegalHelp;
