import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';
import TestimonialSection from '../../components/sections/TestimonialSection';
import HowItWorksSection from '../../components/sections/HowItworks';
import { sol, usd } from '../../assets';
import FeaturesSection from '../../components/sections/FeaturesSection';
import Navbar from '../../components/shared/Navbar';
import FAQSection from '../../components/sections/FaqSection';
import Footer from '../../components/shared/Footer';
import Roadmap from '../../components/sections/Roadmap';
import Cta from '../../components/sections/Cta';
import Team from '../../components/sections/Team';
import { useNavigate } from 'react-router-dom';
// import ConnectButton from '../../components/providers/ConnectButton';

// Main App Component
export default function FlexVestLandingPage() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showDollarValue, setShowDollarValue] = useState(false);
  const [nairaDollarValue, setNairaDollarValue] = useState(0);
  const [nairaDollarHistory, setNairaDollarHistory] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  console.log(activeSection)

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

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   setIsMenuOpen(false);
  // };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      {/* Navigation */}
     <Navbar />

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
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3.5 px-7 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center" 
                onClick={() => navigate('/waitlist')}>
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
                      className="p-2 bg-transparent bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors"
                      onClick={() => setShowDollarValue(!showDollarValue)}
                      aria-label="Toggle dollar value display"
                    >
                      <img src={usd} className='w-[30px]' alt="" />
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
      
      <Roadmap />
      
      {/* FAQ Section */}
      <FAQSection />
      <Team />
      {/* CTA Section */}
      <Cta />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}