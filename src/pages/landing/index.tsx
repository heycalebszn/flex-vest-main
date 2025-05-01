import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Target, 
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
  Clock,
  Zap,
  Lock
} from 'lucide-react';

// Main App Component
export default function FlexVestLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showDollarValue, setShowDollarValue] = useState(false);
  const [nairaDollarValue, setNairaDollarValue] = useState(0);
  const [nairaDollarHistory, setNairaDollarHistory] = useState<any[]>([]);

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
      <nav className="fixed w-full bg-white shadow-md z-50 py-4">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <ShieldCheck size={24} />
            </div>  
            <span className="text-xl font-bold text-blue-800">FlexVest</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink isActive={activeSection === 'home'} onClick={() => scrollToSection('home')}>Home</NavLink>
            <NavLink isActive={activeSection === 'features'} onClick={() => scrollToSection('features')}>Features</NavLink>
            <NavLink isActive={activeSection === 'how-it-works'} onClick={() => scrollToSection('how-it-works')}>How It Works</NavLink>
            <NavLink isActive={activeSection === 'roadmap'} onClick={() => scrollToSection('roadmap')}>Roadmap</NavLink>
            <NavLink isActive={activeSection === 'faq'} onClick={() => scrollToSection('faq')}>FAQ</NavLink>
          </div>
          
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Connect Wallet
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-inner">
            <div className="flex flex-col space-y-4">
              <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('features')}>Features</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('how-it-works')}>How It Works</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('roadmap')}>Roadmap</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('faq')}>FAQ</MobileNavLink>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-3 space-x-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Launching Soon</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Solana-Powered</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Save in Digital Dollars, <span className="text-blue-600">Beat Inflation</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                FlexVest helps Nigerians protect their money from Naira inflation by saving in USDC on Solana — simple, secure, and accessible.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                  Get Started <ChevronRight size={20} className="ml-2" />
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                  Learn More
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CheckCircle size={16} className="text-green-500" />
                <span>No bank account needed</span>
                <span className="mx-2">•</span>
                <CheckCircle size={16} className="text-green-500" />
                <span>Low fees</span>
                <span className="mx-2">•</span>
                <CheckCircle size={16} className="text-green-500" />
                <span>Instant transactions</span>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-md w-full">
                <div className="bg-blue-600 text-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Naira vs. USDC</h3>
                      <p className="text-blue-100 text-sm">See the difference in stability</p>
                    </div>
                    <button 
                      className="p-2 bg-white bg-opacity-10 rounded-md"
                      onClick={() => setShowDollarValue(!showDollarValue)}
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
                        Unstable {renderMiniChart()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold">₦{nairaDollarValue.toFixed(2)}</span>
                      <span className="text-sm text-gray-500"> = $1.00</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">USDC Value</span>
                      <span className="text-sm font-medium text-green-500">Stable</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold">$1.00</span>
                      <span className="text-sm text-gray-500"> = $1.00</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Your Savings Projection</h4>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">₦100,000 saved in Naira for 1 year</span>
                      <span className="text-sm font-medium text-red-500">-22% value</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">₦100,000 saved in USDC for 1 year</span>
                      <span className="text-sm font-medium text-green-500">Value maintained</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 p-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full flex items-center justify-center">
                    Start Saving in USDC <ChevronRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FlexVest?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              FlexVest combines the stability of digital dollars with the speed of Solana to help you achieve your financial goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-600" size={28} />}
              title="Stable Dollar Savings"
              description="Save in USDC to protect your money from Naira inflation and currency devaluation."
            />
            <FeatureCard 
              icon={<Zap className="text-blue-600" size={28} />}
              title="Fast Transactions"
              description="Instant deposits and withdrawals powered by Solana's lightning-fast blockchain."
            />
            <FeatureCard 
              icon={<Lock className="text-blue-600" size={28} />}
              title="Self-Custody"
              description="Your funds stay in your wallet. No intermediaries, complete control over your money."
            />
            <FeatureCard 
              icon={<Target className="text-blue-600" size={28} />}
              title="Savings Goals"
              description="Create personalized savings goals and track your progress in real-time."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-blue-600" size={28} />}
              title="Low Fees"
              description="Only 0.5% withdrawal fee. No hidden charges, no expensive international transfer fees."
            />
            <FeatureCard 
              icon={<Clock className="text-blue-600" size={28} />}
              title="24/7 Access"
              description="Access your money anytime, anywhere with our mobile-friendly platform."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How FlexVest Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start saving in digital dollars in just a few simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard 
              number="1"
              title="Connect Your Wallet"
              description="Link your Phantom or other Solana wallet to FlexVest with just a click."
            />
            <StepCard 
              number="2"
              title="Deposit USDC"
              description="Add USDC to your FlexVest account using our simple deposit interface."
            />
            <StepCard 
              number="3"
              title="Create Savings Goals"
              description="Set up personal savings goals and watch your digital dollars grow."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nigerians Love FlexVest</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who are protecting their savings from Naira inflation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Oluwaseun A."
              role="Freelance Designer"
              quote="Since I started saving in USDC with FlexVest, I no longer worry about my income losing value. The platform is so simple to use!"
            />
            <TestimonialCard 
              name="Chioma E."
              role="Small Business Owner"
              quote="FlexVest has changed how I save for business expenses. With my money in digital dollars, I can plan better for the future."
            />
            <TestimonialCard 
              name="Ademola T."
              role="Student"
              quote="As a student, I need to make my money last. FlexVest helps me save my allowance in USDC, so it keeps its value semester after semester."
            />
          </div>
        </div>
      </section>
      
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
    className={`text-sm font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ children, onClick }: any) => (
  <button 
    onClick={onClick}
    className="text-gray-700 hover:text-blue-600 font-medium py-2 w-full text-left transition-colors"
  >
    {children}
  </button>
);

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex flex-col items-start">
      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, description }: any) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, quote }: any) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <p className="text-gray-600 mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
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