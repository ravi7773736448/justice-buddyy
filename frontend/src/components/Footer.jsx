import React from "react";
import { Link } from "react-router-dom";
import { Scale, Facebook, Instagram, Twitter, MessageCircle, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <Scale className="h-7 w-7 text-emerald-400" />
              <span className="text-xl font-bold text-white">Justice Buddy</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              Simplifying access to justice for everyone. Guidance you can trust, when you need it most.
            </p>
            <div className="flex space-x-3 mt-4">
              {[Facebook, Instagram, Twitter, MessageCircle, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-emerald-600 rounded-full hover:bg-emerald-500 transition-colors"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/legal-insights" className="hover:text-white transition">Legal Insights</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:support@justicebuddy.org" className="hover:text-white transition">support@justicebuddy.org</a></li>
              <li>Phone: <a href="tel:+1800123456" className="hover:text-white transition">1800-123-456</a></li>
              <li><Link to="/contact" className="hover:text-white transition">Get in Touch</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Justice Buddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
