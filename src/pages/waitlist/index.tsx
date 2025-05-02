import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  ChevronRight,
  Clock, 
  Shield, 
  Lock, 
  BarChart,
  Users,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import Footer from '../../components/shared/Footer';

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({ days: 14, hours: 8, minutes: 45, seconds: 30 });
  const [userCount, setUserCount] = useState(762);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate waitlist count increasing
    const interval = setInterval(() => {
      setUserCount(prev => prev + 1);
    }, 12000);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Animation of count
    const countAnimation = setInterval(() => {
      setAnimatedCount(prev => {
        if (prev < userCount) {
          return prev + 1;
        }
        return prev;
      });
    }, 30);

    // Set visibility for animation
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearInterval(countAnimation);
    };
  }, [userCount]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg shadow-lg">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">FlexVest</span>
              <span className="text-xs text-gray-600 font-medium">Smart Investing</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="group relative">
              <a href="#features" className="flex items-center text-gray-700 hover:text-black font-medium transition-colors">
                Features <ChevronDown className="ml-1 w-4 h-4" />
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                <a href="#portfolio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black rounded-md">
                  Portfolio Management
                </a>
                <a href="#analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black rounded-md">
                  Analytics Dashboard
                </a>
                <a href="#automation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black rounded-md">
                  Smart Automation
                </a>
              </div>
            </div>
            <a href="#faq" className="text-gray-700 hover:text-black font-medium transition-colors">FAQ</a>
            <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors">Blog</a>
            <a href="#pricing" className="text-gray-700 hover:text-black font-medium transition-colors">Pricing</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <a href="#login" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Log in
              </a>
            </div>
            <a 
              href="#waitlist" 
              className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              Join Waitlist
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs">Early Access</span>
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-4">
            <div className="flex flex-col space-y-3">
              <a href="#features" className="text-gray-700 hover:text-black font-medium px-2 py-1 rounded-md hover:bg-gray-50">Features</a>
              <a href="#faq" className="text-gray-700 hover:text-black font-medium px-2 py-1 rounded-md hover:bg-gray-50">FAQ</a>
              <a href="#" className="text-gray-700 hover:text-black font-medium px-2 py-1 rounded-md hover:bg-gray-50">Blog</a>
              <a href="#pricing" className="text-gray-700 hover:text-black font-medium px-2 py-1 rounded-md hover:bg-gray-50">Pricing</a>
              <a href="#login" className="text-gray-700 hover:text-black font-medium px-2 py-1 rounded-md hover:bg-gray-50">Log in</a>
            </div>
          </div>
        )}
      </div>
    </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-[100px] pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                  {userCount} people on waitlist
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Protect Your Savings from <span className="relative inline-block">
                    Naira Inflation
                    <div className="absolute -bottom-2 left-0 right-0">
                      <svg className="w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,5 Q75,0 150,5 T300,5" fill="none" stroke="#000" strokeWidth="2" />
                      </svg>
                    </div>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Save in stable digital dollars (USDC) on Solana — launching in {countdown.days} days. 
                  Join our exclusive waitlist for early access.
                </p>
              </div>

              <div id="waitlist" className={`w-full max-w-md transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                    <div className="text-left mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Join the FlexVest Waitlist</h3>
                      <p className="text-sm text-gray-500">Get early access to our exclusive beta release</p>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <div className="flex">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-r-lg font-medium transition-colors disabled:opacity-70 flex items-center justify-center"
                        >
                          {isLoading ? (
                            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            'Join'
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <Lock size={14} />
                      <span>We respect your privacy. No spam.</span>
                    </div>
                  </form>
                ) : (
                  <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={30} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                    <p className="text-gray-600 mb-4">Thank you for joining our waitlist. We'll notify you when we launch.</p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-2">
                      <button className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                        Share on Twitter <ArrowUpRight size={14} className="ml-1" />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Share with friends
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{countdown.days}</div>
                      <div className="text-xs text-gray-500 uppercase">Days</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{countdown.hours}</div>
                      <div className="text-xs text-gray-500 uppercase">Hours</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{countdown.minutes}</div>
                      <div className="text-xs text-gray-500 uppercase">Minutes</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{countdown.seconds}</div>
                      <div className="text-xs text-gray-500 uppercase">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-8 transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="p-8 rounded-2xl bg-gray-900 text-white overflow-hidden relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Why Nigerians Need FlexVest</h2>
                    <p className="text-gray-300 mb-6">
                      With Naira inflation at 25% and rising, your savings are losing value every day. 
                      FlexVest helps you preserve your wealth in stable digital dollars.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Protect Against Inflation</h3>
                          <p className="text-sm text-gray-300">Save in USDC to maintain your purchasing power</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Fast & Low-Cost Transactions</h3>
                          <p className="text-sm text-gray-300">Powered by Solana's high-performance blockchain</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">User-Friendly Interface</h3>
                          <p className="text-sm text-gray-300">No technical knowledge required to get started</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <a href="#waitlist" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                        Join Waitlist <ChevronRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                      <div className="w-full bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Naira Devaluation</h3>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">2021</span>
                              <span className="text-sm font-medium">₦411 = $1</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">2022</span>
                              <span className="text-sm font-medium">₦570 = $1</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">2023</span>
                              <span className="text-sm font-medium">₦860 = $1</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">2024</span>
                              <span className="text-sm font-medium">₦1,450 = $1</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">2025</span>
                              <span className="text-sm font-medium text-red-500">₦1,740+ = $1</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-500 mb-1">25%+</div>
                            <div className="text-sm text-gray-500">Current Annual Inflation Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background elements */}
                <div className="absolute top-0 right-0 w-2/3 h-full opacity-5">
                  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose FlexVest</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're building the simplest way for Nigerians to protect their savings against inflation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                  <Shield size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Stable Value</h3>
                <p className="text-gray-600">
                  Save in USDC stablecoin, maintaining your purchasing power against Naira devaluation
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                  <BarChart size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Goal Tracking</h3>
                <p className="text-gray-600">
                  Set savings goals and track your progress with our intuitive dashboard
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Group Savings</h3>
                <p className="text-gray-600">
                  Coming soon: Esusu-style group savings with friends and family
                </p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-xl max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Be Among the First</h3>
                  <p className="text-gray-600 max-w-md">
                    Join {animatedCount} others on our waitlist and get early access when we launch.
                  </p>
                </div>
                <div className="w-full md:w-auto">
                  <a 
                    href="#waitlist" 
                    className="flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white hover:bg-gray-800 transition-colors w-full md:w-auto"
                  >
                    Join Waitlist <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about FlexVest
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">When will FlexVest launch?</h3>
                <p className="text-gray-600">
                  We're currently in the final stages of development and plan to launch in {countdown.days} days. Join our waitlist to be the first to know!
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">How does saving in USDC protect against inflation?</h3>
                <p className="text-gray-600">
                  USDC is a stablecoin pegged to the US Dollar. While the Naira continually loses value against the dollar, USDC maintains its value, protecting your purchasing power.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Is FlexVest secure?</h3>
                <p className="text-gray-600">
                  Absolutely. FlexVest is built on Solana, a secure and high-performance blockchain. We also implement industry-standard security best practices to protect your assets.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Do I need a bank account to use FlexVest?</h3>
                <p className="text-gray-600">
                  No, you don't need a traditional bank account. FlexVest works with your blockchain wallet and local on-ramps for deposits and withdrawals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Counter */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-2xl bg-gray-900 overflow-hidden shadow-xl">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join {animatedCount} Early Adopters</h2>
                    <p className="text-gray-300 mb-6">
                      The waitlist is growing fast. Secure your spot now.
                    </p>
                    <div className="flex space-x-4 mb-6">
                      <div className="flex-1 bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{countdown.days}d {countdown.hours}h</div>
                        <div className="text-xs text-gray-300 uppercase">Until Launch</div>
                      </div>
                      <div className="flex-1 bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                          <span className="inline-flex items-center">
                            <Clock size={18} className="mr-1" />
                            Limited
                          </span>
                        </div>
                        <div className="text-xs text-gray-300 uppercase">Early Access</div>
                      </div>
                    </div>
                    <div>
                      <a 
                        href="#waitlist" 
                        className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        Join Waitlist <ArrowRight size={18} className="ml-2" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
                      <div className="relative bg-white/10 rounded-xl p-8">
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-white animate-pulse">{animatedCount}</div>
                          <div className="text-sm text-gray-300">People on Waitlist</div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-300">Lagos</span>
                              <span className="text-xs text-gray-300">310 users</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="bg-white h-1.5 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-300">Abuja</span>
                              <span className="text-xs text-gray-300">248 users</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="bg-white h-1.5 rounded-full" style={{ width: '32%' }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-300">Port Harcourt</span>
                              <span className="text-xs text-gray-300">104 users</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="bg-white h-1.5 rounded-full" style={{ width: '14%' }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-300">Other Cities</span>
                              <span className="text-xs text-gray-300">100 users</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="bg-white h-1.5 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </section>

        <Footer />
      </div>
  );
};

export default WaitlistPage;
