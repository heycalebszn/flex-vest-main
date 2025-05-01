import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  ChevronRight, 
  DollarSign, 
  CheckCircle, 
  ChevronDown, 
  Menu, 
  X, 
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import TestimonialSection from '../../components/sections/TestimonialSection';
import HowItWorksSection from '../../components/sections/HowItworks';
import { sol } from '../../assets';
import FeaturesSection from '../../components/sections/FeaturesSection';
// import ConnectButton from '../../components/providers/ConnectButton';

// Main App Component
export default function FlexVestLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showDollarValue, setShowDollarValue] = useState(false);
  const [nairaDollarValue, setNairaDollarValue] = useState(0);
  const [nairaDollarHistory, setNairaDollarHistory] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Track which section is in view for navigation highlighting
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'faq', 'roadmap'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    // Simulated Naira value fluctuation animation
    const simulateNairaFluctuation = () => {
      // Start value (around 1740 Naira to 1 USD as of early 2025)
      const baseValue = 1740;
      // Add some random fluctuation to show instability
      const newValue = baseValue - 20 + Math.random() * 40;
      setNairaDollarValue(newValue);
      
      // Update history for mini chart
      setNairaDollarHistory(prev => {
        const newHistory = [...prev, newValue];
        if (newHistory.length > 10) {
          return newHistory.slice(1);
        }
        return newHistory;
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize with starting values
    setNairaDollarValue(1740);
    setNairaDollarHistory([1740, 1735, 1742, 1750, 1755, 1747, 1749]);
    
    // Update value every 2 seconds to simulate fluctuation
    const interval = setInterval(simulateNairaFluctuation, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Create a simple line chart for Naira fluctuation
  const renderMiniChart = () => {
    if (nairaDollarHistory.length < 2) return null;
    
    const height = 40;
    const width = 100;
    const max = Math.max(...nairaDollarHistory);
    const min = Math.min(...nairaDollarHistory);
    const range = max - min || 1;
    
    const points = nairaDollarHistory.map((value: any, index: any) => {
      const x = (index / (nairaDollarHistory.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="chart">
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className={`fixed w-full bg-white shadow-lg z-50 transition-all duration-300`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-md">
              <ShieldCheck size={24} />
            </div>  
            <span className="text-xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">FlexVest</span>
          </div>
          
          {/* Desktop Navigation with Improved Spacing */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink isActive={activeSection === 'home'} onClick={() => scrollToSection('home')}>Home</NavLink>
            <NavLink isActive={activeSection === 'features'} onClick={() => scrollToSection('features')}>Features</NavLink>
            <NavLink isActive={activeSection === 'how-it-works'} onClick={() => scrollToSection('how-it-works')}>How It Works</NavLink>
            <NavLink isActive={activeSection === 'roadmap'} onClick={() => scrollToSection('roadmap')}>Roadmap</NavLink>
            <NavLink isActive={activeSection === 'faq'} onClick={() => scrollToSection('faq')}>FAQ</NavLink>
          </div>
          
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-5 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
              Connect Wallet
            </button> 
            {/* <ConnectButton /> */}
          </div>
          
          {/* Mobile menu button with improved touch target */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 text-gray-700 focus:outline-none rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu with Animation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-inner overflow-hidden animate-in slide-in-from-top duration-300">
            <div className="flex flex-col">
              <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('features')}>Features</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('how-it-works')}>How It Works</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('roadmap')}>Roadmap</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('faq')}>FAQ</MobileNavLink>
              <div className="p-2">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full flex items-center justify-center">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Enhanced Visual Appeal */}
      <section id="home" className="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 items-center gap-8 md:gap-16">
            <div className={`order-2 md:order-1 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5 animate-pulse"></span>
                  Launching Soon
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                  <img src={sol} alt="Solana logo" className="w-3.5 h-3.5 mr-1.5 rounded-full" />
                  Solana-Powered
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
                Save in Digital Dollars, <br />
                <span className="relative">
                  Beat Inflation
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                FlexVest helps Nigerians protect their money from Naira inflation by saving in USDC on Solana — simple, secure, and accessible.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3.5 px-7 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center">
                  Get Started <ChevronRight size={20} className="ml-2" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3.5 px-7 rounded-lg transition-colors flex items-center justify-center">
                  Learn More
                </button>
              </div>
              
              <div className="flex flex-wrap md:items-center md:space-x-4 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <div className="bg-green-50 rounded-full p-1 mr-2">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <span>No bank account needed</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="bg-green-50 rounded-full p-1 mr-2">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <span>Low fees</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-50 rounded-full p-1 mr-2">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <span>Instant transactions</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Card UI */}
            <div className={`order-1 md:order-2 flex justify-center md:justify-end transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full transform hover:scale-102 transition-transform">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Naira vs. USDC</h3>
                      <p className="text-blue-100 text-sm">See the difference in stability</p>
                    </div>
                    <button 
                      className="p-2 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors"
                      onClick={() => setShowDollarValue(!showDollarValue)}
                      aria-label="Toggle dollar value display"
                    >
                      <DollarSign size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Naira Value</span>
                      <span className="text-sm font-medium text-red-500 flex items-center">
                        Volatile {renderMiniChart()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold">₦{nairaDollarValue.toFixed(2)}</span>
                      <span className="text-sm text-gray-500"> = $1.00</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">USDC Value</span>
                      <span className="text-sm font-medium text-green-500 flex items-center">
                        Stable
                        <svg width="50" height="20" viewBox="0 0 50 20" className="ml-1">
                          <path
                            d="M1,10 L10,10 L20,10 L30,10 L40,10 L49,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold">$1.00</span>
                      <span className="text-sm text-gray-500"> = $1.00</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5">
                    <h4 className="font-medium mb-3 flex items-center">
                      <TrendingUp size={18} className="mr-2 text-blue-600" />
                      Your 1-Year Savings Projection
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">₦100,000 in Naira</span>
                          <span className="text-sm font-medium text-red-500">-22% value</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">₦100,000 in USDC</span>
                          <span className="text-sm font-medium text-green-500">Value maintained</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 p-5">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-102 shadow-md hover:shadow-lg w-full flex items-center justify-center">
                    Start Saving in USDC <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Roadmap</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building FlexVest to be the best dollar savings platform for Nigerians.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <RoadmapItem 
              phase="Phase 1 (Current)"
              title="Hackathon MVP"
              features={[
                "Landing page",
                "Wallet connect (Phantom)",
                "Create & track savings goals",
                "Deposit/withdraw USDC"
              ]}
              active={true}
            />
            <RoadmapItem 
              phase="Phase 2"
              title="Enhanced Features"
              features={[
                "Add goal progress tracking",
                "Invite & referral system"
              ]}
            />
            <RoadmapItem 
              phase="Phase 3"
              title="Mobile & Advanced Features"
              features={[
                "Mobile app",
                "Auto-saving from local currency via on-ramps",
                "Group savings (Esusu-style)"
              ]}
              isLast={true}
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about saving with FlexVest.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FAQItem 
              question="What is USDC and why should I save in it?"
              answer="USDC is a digital dollar (stablecoin) that's always worth $1 USD. By saving in USDC instead of Naira, you protect your money from inflation and currency devaluation that affects the Nigerian Naira."
            />
            <FAQItem 
              question="Do I need a bank account to use FlexVest?"
              answer="No! FlexVest works directly with your Solana wallet. You don't need a bank account, BVN, or any traditional banking information to get started."
            />
            <FAQItem 
              question="How do I get USDC to save on FlexVest?"
              answer="You can purchase USDC on exchanges like Binance and transfer it to your Solana wallet. In future updates, we'll add direct on-ramps from Naira to USDC."
            />
            <FAQItem 
              question="Is there a minimum amount I need to start with?"
              answer="No minimum! You can start saving with any amount of USDC that makes sense for your financial situation."
            />
            <FAQItem 
              question="What are the fees for using FlexVest?"
              answer="FlexVest charges a small 0.5% fee only when you withdraw your USDC. There are no fees for deposits or maintaining your savings."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Money?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Join FlexVest today and start saving in digital dollars. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                Connect Wallet
              </button>
              <button className="border border-white text-white hover:bg-blue-700 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-md">
                  <ShieldCheck size={20} />
                </div>  
                <span className="text-xl font-bold">FlexVest</span>
              </div>
              <p className="text-gray-400 mb-4">
                Save in digital dollars (USDC) on Solana — helping Nigerians protect their money from inflation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Savings Goals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">USDC on Solana</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Wallet Connect</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Referral Program</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">How-to Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} FlexVest. All rights reserved.</p>
            <p className="mt-2">Built on Solana by Nigerian developers, for Nigerians.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
const NavLink = ({ children, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`relative font-medium transition-colors ${
        isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
      )}
    </button>
  );

  const MobileNavLink = ({ children, onClick }: any) => (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
    >
      {children}
    </button>
  );

const RoadmapItem = ({ phase, title, features, active = false, isLast = false }: any) => (
  <div className={`relative pl-8 pb-8 ${!isLast && 'border-l-2'} ${active ? 'border-blue-600' : 'border-gray-200'}`}>
    <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full ${active ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
    <div className={`bg-${active ? 'blue-50' : 'white'} rounded-lg p-6 shadow-sm border border-gray-100`}>
      <span className="text-sm font-medium text-blue-600 block mb-1">{phase}</span>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {features.map((feature: any, index: any) => (
          <li key={index} className="flex items-start">
            <CheckCircle size={16} className={`mr-2 mt-1 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown 
          size={20} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};