"use client";

import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "fa-exchange-alt",
      title: "Skill Exchange",
      description:
        "Trade your expertise for new knowledge. No money needed - just share what you know and learn what you don't.",
    },
    {
      icon: "fa-users",
      title: "Community Driven",
      description:
        "Join a vibrant community of learners and teachers who are passionate about sharing knowledge.",
    },
    {
      icon: "fa-chart-line",
      title: "Track Progress",
      description:
        "Monitor your learning journey and skill development with our intuitive progress tracking system.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description:
        "Sign up and list the skills you have to share and those you want to learn.",
    },
    {
      number: "2",
      title: "Connect & Schedule",
      description:
        "Find matching skill partners and schedule learning sessions that work for both.",
    },
    {
      number: "3",
      title: "Learn & Share",
      description:
        "Engage in skill exchange sessions and grow together with your community.",
    },
  ];

  const testimonials = [
    {
      text: "I taught web development while learning graphic design. In just three months, I've built a portfolio and landed freelance projects!",
      author: "Jamie Smith",
      role: "Web Developer & Designer",
      initials: "JS",
    },
    {
      text: "As a language teacher, I exchanged Spanish lessons for coding skills. Now I'm building my own language learning app!",
      author: "Maria Rodriguez",
      role: "Language Teacher & App Developer",
      initials: "MR",
    },
    {
      text: "I never thought I could learn photography without expensive courses. SkillShare connected me with an amazing mentor who taught me everything.",
      author: "Taylor Wilson",
      role: "Photography Enthusiast",
      initials: "TW",
    },
  ];

  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-100 py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4cc9f0]/20 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#f72585]/20 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3a0ca3] leading-tight mb-6">
                Share Your Skills, Learn From Others
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Connect with passionate individuals to exchange knowledge,
                develop new abilities, and grow together in our vibrant
                community of learners and teachers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#f72585] text-white px-8 py-4 rounded-full hover:bg-pink-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                  Share a Skill
                </button>
                <button className="border-2 border-[#3a0ca3] text-[#3a0ca3] px-8 py-4 rounded-full hover:bg-[#3a0ca3] hover:text-white transition-all duration-300 font-semibold text-lg">
                  Find a Skill
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-2xl p-2 rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-[#4361ee] to-[#3a0ca3] rounded-xl p-1">
                  <div className="bg-gray-200 rounded-lg h-64 lg:h-80 w-full flex items-center justify-center">
                    <i className="fas fa-users text-6xl text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3a0ca3] mb-4">
              Why Choose SkillShare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique features that make skill sharing easy,
              effective, and enjoyable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#4361ee]"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] rounded-full flex items-center justify-center text-white text-2xl mb-6 mx-auto">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-[#3a0ca3] text-center mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3a0ca3] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with SkillShare is simple. Follow these three easy
              steps to begin your learning journey.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-1 bg-[#4361ee] z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#4361ee] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-[#3a0ca3] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3a0ca3] mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from members who have transformed their skills through our
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#f72585]"
              >
                <p className="text-gray-600 italic mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4361ee] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3a0ca3]">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Skill Sharing Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already expanding
            their horizons on SkillShare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/SignUp"} className="bg-white text-[#4361ee] px-8 py-4 rounded-full hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
              Create Account
            </Link>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#4361ee] transition-all duration-300 font-semibold text-lg">
              Learn More
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
}
