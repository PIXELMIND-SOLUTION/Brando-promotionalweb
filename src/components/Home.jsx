// App.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  Building,
  Calendar,
  Shield,
  Menu,
  X,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
  Bed,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Zap,
  TrendingUp,
  Heart,
  Award,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Building className="w-10 h-10" />,
      title: "Smart Room Allocation",
      description: "AI-powered room assignment based on preferences and availability with real-time updates",
      gradient: "from-red-500 to-rose-500",
      shadow: "shadow-red-500/25"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "User Management",
      description: "Complete student profiles, check-in/check-out tracking, and visitor management system",
      gradient: "from-rose-500 to-pink-500",
      shadow: "shadow-rose-500/25"
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Booking System",
      description: "Online room booking with instant confirmation and intelligent waitlist management",
      gradient: "from-pink-500 to-red-500",
      shadow: "shadow-pink-500/25"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Payment Processing",
      description: "Secure online payments, automatic invoicing, and comprehensive expense tracking",
      gradient: "from-red-600 to-rose-600",
      shadow: "shadow-red-600/25"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Security & Access",
      description: "Biometric access control, visitor logs, and 24/7 security monitoring system",
      gradient: "from-rose-600 to-red-500",
      shadow: "shadow-rose-600/25"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Maintenance Tracking",
      description: "Smart request submission, real-time status tracking, and automated scheduling",
      gradient: "from-red-400 to-pink-500",
      shadow: "shadow-red-400/25"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Hostel Manager",
      content: "Brando has transformed how we manage our hostel. The room allocation feature alone saved us hours of work!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Property Owner",
      content: "The payment processing and user management features are game-changers. Highly recommended for any hostel owner.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Davis",
      role: "Student Resident",
      content: "As a student, I love how easy it is to book rooms and track my payments. The interface is super intuitive!",
      rating: 5,
      avatar: "ED"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      gradient: "from-red-400 to-red-500",
      features: [
        "Up to 50 rooms",
        "Basic user management",
        "Email support",
        "Payment tracking",
        "Maintenance requests"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      featured: true,
      gradient: "from-red-500 to-rose-600",
      features: [
        "Up to 200 rooms",
        "Advanced user management",
        "Priority support",
        "Automated payments",
        "Smart room allocation",
        "Visitor management",
        "Analytics dashboard"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      gradient: "from-rose-500 to-pink-600",
      features: [
        "Unlimited rooms",
        "Full feature access",
        "24/7 dedicated support",
        "Custom integrations",
        "API access",
        "White-label option",
        "On-premise deployment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-red-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <h1 className="relative text-3xl font-black bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Brando
                </h1>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['Features', 'How-It-Works', 'Pricing', 'Testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const section = document.getElementById(
                      item.toLowerCase().replace(" ", "-")
                    );

                    section?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50"
                >
                  {item}
                </button>
              ))}
              <button className="ml-4 relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 group">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
                  <span className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-red-100 shadow-2xl">
            <div className="px-4 py-6 space-y-3">
              {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
              <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-red-400/20 to-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-full text-sm font-semibold animate-slide-in-left">
                <Sparkles className="w-4 h-4" />
                <span>Smart Hostel Management Platform</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-tight animate-slide-in-up">
                Manage Your Hostel
                <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Smarter & Faster
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-slide-in-up delay-200">
                Streamline your hostel operations with our AI-powered management platform.
                From smart room allocation to seamless payment processing.
              </p>

              <div className="flex flex-wrap gap-4 animate-slide-in-up delay-300">
                <button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>

                <button className="relative border-2 border-red-200 text-gray-700 px-10 py-4 rounded-full text-lg font-bold hover:border-red-500 hover:text-red-600 transition-all duration-300 transform hover:scale-105 group">
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Watch Demo
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8 animate-slide-in-up delay-400">
                <div className="flex -space-x-3">
                  {['SJ', 'MC', 'ED', 'AK'].map((avatar, i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-rose-500 border-3 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg transform hover:scale-110 transition-transform">
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 font-bold text-lg">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 1000+ hostels worldwide</p>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-500/10 p-8 border border-white/50 transform hover:scale-105 transition-all duration-500">
                <div className="space-y-6">
                  <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-8 text-white shadow-2xl shadow-red-500/25">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Room Occupancy</h3>
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div className="text-5xl font-black mb-2">85%</div>
                      <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
                        <div className="bg-white rounded-full h-3 animate-progress" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Bed className="w-6 h-6" />, label: "Total Rooms", value: "150", bg: "bg-red-50", text: "text-red-600" },
                      { icon: <Users className="w-6 h-6" />, label: "Residents", value: "234", bg: "bg-rose-50", text: "text-rose-600" },
                      { icon: <DollarSign className="w-6 h-6" />, label: "Revenue", value: "$12.5K", bg: "bg-pink-50", text: "text-pink-600" },
                      { icon: <Heart className="w-6 h-6" />, label: "Satisfaction", value: "98%", bg: "bg-red-50", text: "text-red-600" }
                    ].map((stat, i) => (
                      <div key={i} className={`${stat.bg} rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group`}>
                        <div className={`${stat.text} mb-3 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                        <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-8 text-sm font-semibold uppercase tracking-wider">Trusted by leading institutions worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50">
            {['University', 'College', 'Institute', 'Academy', 'School'].map((company) => (
              <div key={company} className="text-center text-2xl font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Why Choose Brando</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Powerful Features for
              <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                Seamless Management
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run your hostel efficiently, powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 ${feature.shadow} group-hover:shadow-none transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-red-600 group-hover:text-white transition-colors duration-500">
                    <span className="text-sm font-bold">Learn more</span>
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1000+", label: "Active Hostels" },
              { value: "50K+", label: "Rooms Managed" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl font-black mb-2 animate-count-up">{stat.value}</div>
                <div className="text-red-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              How
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"> Brando </span>
              Works
            </h2>
            <p className="text-xl text-gray-600">Get started in minutes with our simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Sign Up", description: "Create your account and set up your hostel profile in minutes with our guided setup wizard" },
              { step: "02", title: "Configure", description: "Add rooms, set pricing rules, and customize your management dashboard to your needs" },
              { step: "03", title: "Go Live", description: "Start managing bookings, users, and payments seamlessly with real-time analytics" }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute -top-4 -left-4 text-8xl font-black text-red-100 group-hover:text-red-200 transition-colors">
                  {item.step}
                </div>
                <div className="relative text-center pt-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3 group-hover:rotate-6 transition-all duration-300 shadow-2xl shadow-red-500/25">
                    <span className="text-3xl font-black text-white">{item.step}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Powerful
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"> Dashboard</span>
            </h2>
            <p className="text-xl text-gray-600">Get complete visibility into your hostel operations</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl shadow-red-500/10 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Rooms", value: "150", change: "+12%", color: "red" },
                { label: "Occupied", value: "127", change: "+8%", color: "rose" },
                { label: "Available", value: "23", change: "-3%", color: "pink" },
                { label: "Maintenance", value: "5", change: "0%", color: "red" }
              ].map((stat, index) => (
                <div key={index} className={`relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-${stat.color}-500/50 transition-all duration-300 group`}>
                  <p className="text-gray-400 text-sm mb-3">{stat.label}</p>
                  <p className="text-white text-4xl font-black mb-2">{stat.value}</p>
                  <span className={`inline-flex items-center gap-1 text-${stat.color}-400 text-sm font-semibold`}>
                    <TrendingUp className="w-4 h-4" />
                    {stat.change} this month
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-white text-xl font-bold">Occupancy Trends</h3>
                  <div className="flex items-end gap-2 h-48">
                    {[60, 75, 85, 70, 90, 85, 95].map((height, i) => (
                      <div key={i} className="flex-1 group cursor-pointer">
                        <div
                          className="bg-gradient-to-t from-red-500 to-rose-500 rounded-t-lg transition-all duration-300 group-hover:from-red-400 group-hover:to-rose-400"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white text-xl font-bold">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Add Room', 'Book Guest', 'Process Payment', 'Report Issue'].map((action, i) => (
                      <button key={i} className="bg-white/10 hover:bg-red-500 text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg font-semibold">
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-red-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Simple,
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"> Transparent </span>
              Pricing
            </h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your hostel</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${plan.featured
                  ? 'bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 shadow-2xl shadow-red-500/25 scale-105'
                  : 'bg-white shadow-xl hover:shadow-2xl border border-gray-100'
                  }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className={`text-center mb-8 ${plan.featured ? 'pt-4' : ''}`}>
                  <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-6xl font-black ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.featured ? 'text-white' : 'text-red-500'}`} />
                      <span className={plan.featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-full font-bold transition-all duration-300 transform group-hover:scale-105 ${plan.featured
                    ? 'bg-white text-red-600 hover:shadow-2xl'
                    : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-xl hover:shadow-red-500/25'
                    }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              What Our
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"> Users </span>
              Say
            </h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied hostel managers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${activeTestimonial === index ? 'ring-2 ring-red-500 shadow-xl' : ''
                  }`}
                onMouseEnter={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600">
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <Zap className="w-4 h-4" />
            <span>Start Your Journey Today</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-black text-white mb-8">
            Ready to Transform Your
            <span className="block">Hostel Management?</span>
          </h2>

          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join over 1,000 hostels that trust Brando for their daily operations and experience the future of hostel management
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="group relative bg-white text-red-600 px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="group border-2 border-white/50 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                Schedule Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 blur-3xl rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/10 pb-16">

            {/* Brand */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
                Brando
              </h2>

              <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-lg">
                Transforming hostel management with modern technology,
                seamless automation, and an unforgettable user experience.
              </p>

              {/* Socials */}
              <div className="flex flex-wrap gap-4 mt-8">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group relative w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden hover:border-red-400/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <Icon className="relative z-10 w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">
                Product
              </h3>

              <ul className="space-y-4">
                {["Features", "Pricing", "API", "Integrations"].map((item) => (
                  <li key={item}>
                    <button
                      className="group flex items-center text-gray-400 hover:text-red-400 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-red-400">
                Contact
              </h3>

              <ul className="space-y-5">
                <li>
                  <a
                    href="mailto:hello@brando.app"
                    style={{ textDecoration: "none" }}
                    className="group flex items-center gap-3 text-red-300 hover:text-red-400 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                      <Mail className="w-5 h-5 text-red-400" />
                    </div>

                    <span className='text-red-400'>hello@brando.app</span>
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+15551234567"
                    style={{ textDecoration: "none" }}
                    className="group flex items-center gap-3 text-red-300 hover:text-red-400 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                      <Phone className="w-5 h-5 text-red-400" />
                    </div>

                    <span className='text-red-400'>+1 (555) 123-4567</span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    style={{ textDecoration: "none" }}
                    className="group flex items-center gap-3 text-red-300 hover:text-red-400 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                      <MapPin className="w-5 h-5 text-red-400" />
                    </div>

                    <span className='text-red-400'>123 Tech Street, SF</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2024 Brando. Crafted with passion & innovation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <button
                  key={item}
                  className="text-sm text-gray-500 hover:text-red-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;