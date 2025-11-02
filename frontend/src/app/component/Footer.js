"use client";
// Footer Component
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-[#4cc9f0] mb-4">
              SkillShare
            </h3>
            <p className="text-gray-400 mb-6">
              Connecting people through knowledge exchange. Learn new skills and
              share your expertise with our growing community.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#4361ee] transition-all duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#4361ee] transition-all duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#4361ee] transition-all duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#4361ee] transition-all duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#4cc9f0] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Explore Skills
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Teach on SkillShare
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-[#4cc9f0] mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Community Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-[#4cc9f0] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                <span>hello@skillshare.com</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Learning St, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; 2023 SkillShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
