import { Link } from 'react-router-dom';

const FeaturesSimple = () => {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Legal Help Tailored for <span className="text-emerald-600">Rural Communities</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Justice Buddy provides simple, reliable, and free legal guidance on issues that matter to rural communities.
          </p>
        </div>
      </section>

      {/* Legal Areas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">Land & Farming Disputes</div>
            <div className="bg-gray-50 p-8 rounded-xl">Women's Rights & Protection</div>
            <div className="bg-gray-50 p-8 rounded-xl">Labor & Wage Issues</div>
            <div className="bg-gray-50 p-8 rounded-xl">Pensions & Government Schemes</div>
            <div className="bg-gray-50 p-8 rounded-xl">Property & Inheritance Issues</div>
            <div className="bg-gray-50 p-8 rounded-xl">RTI & Govt. Applications</div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Help You</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Our comprehensive approach ensures you get the legal support you need</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg">Immediate Guidance</div>
          <div className="bg-white p-8 rounded-lg">Expert Connections</div>
          <div className="bg-white p-8 rounded-lg">Step-by-Step Support</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Real stories from people who found justice through our platform</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-lg">Testimonial 1</div>
          <div className="bg-gray-50 p-8 rounded-lg">Testimonial 2</div>
          <div className="bg-gray-50 p-8 rounded-lg">Testimonial 3</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Legal Help Today</h2>
        <p className="text-xl mb-8">Start your conversation now - it's completely free.</p>
        <Link
          to="/chat"
          className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100"
        >
          Ask Your Legal Question
        </Link>
      </section>
      
    </div>
  );
};

export default FeaturesSimple;
