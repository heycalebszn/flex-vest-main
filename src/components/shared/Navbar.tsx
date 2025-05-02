import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import ConnectButton from '../providers/ConnectButton';

// Define base components
const NavLink = ({ children, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive 
        ? 'text-indigo-900' 
        : 'text-gray-600 hover:text-indigo-800'
    }`}
  >
    <span className="relative z-10">{children}</span>
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
    )}
  </button>
);

const MobileNavLink = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full text-left py-3 border-b border-gray-100 text-gray-700 font-medium transition-colors hover:text-indigo-700"
  >
    {children}
  </button>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (section: any) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    
    // Find the section element and scroll to it
    const element = document.getElementById(section);
    if (element) {
      // Offset for the navbar height
      const navElement = document.querySelector('nav');
      const navbarHeight = navElement ? navElement.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for navbar appearance
      setScrolled(window.scrollY > 20);
      
      // Find which section is currently in view
      const sections = ['home', 'features', 'how-it-works', 'roadmap', 'faq'];
      const navElement = document.querySelector('nav');
      const navbarHeight = navElement ? navElement.offsetHeight : 0;
      
      // Find the current active section
      let current = '';
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop - navbarHeight - 100; // buffer
          const sectionBottom = sectionTop + element.offsetHeight;
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section;
          }
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-white py-5'
    }`}>
      <div className="container mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-md flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <span className="font-semibold text-lg tracking-tight text-gray-900">FlexVest</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink isActive={activeSection === 'home'} onClick={() => scrollToSection('home')}>Home</NavLink>
          <NavLink isActive={activeSection === 'features'} onClick={() => scrollToSection('features')}>Features</NavLink>
          <NavLink isActive={activeSection === 'how-it-works'} onClick={() => scrollToSection('how-it-works')}>How It Works</NavLink>
          <NavLink isActive={activeSection === 'roadmap'} onClick={() => scrollToSection('roadmap')}>Roadmap</NavLink>
          <NavLink isActive={activeSection === 'faq'} onClick={() => scrollToSection('faq')}>FAQ</NavLink>
        </div>
        
        <div className="hidden md:block">
          {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md">
            Connect Wallet
          </button> */}
          <ConnectButton />
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 text-gray-600 focus:outline-none rounded-lg hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100 shadow-md' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-5 py-2">
          <div className="flex flex-col">
            <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('features')}>Features</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('how-it-works')}>How It Works</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('roadmap')}>Roadmap</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('faq')}>FAQ</MobileNavLink>
            <div className="py-3 pt-4">
              {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors w-full">
                Connect Wallet
              </button> */}

<ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}