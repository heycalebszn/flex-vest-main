import { useState, useEffect } from 'react';
import { Wallet, CreditCard, Target, ArrowRight, Check, ChevronDown } from 'lucide-react';

const StepCard = ({ number, title, description, icon: Icon, isActive, onClick, details }: any) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`relative rounded-xl p-6 transition-all duration-300 cursor-pointer group ${
        isActive 
          ? "bg-blue-600 text-white shadow-xl transform scale-105 z-10" 
          : "bg-white border border-gray-100 shadow-md hover:shadow-lg"
      }`}
      onClick={onClick}
    >
      {/* Background number */}
      <div className="absolute -right-3 -top-3 text-8xl font-bold opacity-5">
        {number}
      </div>
      
      {/* Step indicator */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
        isActive ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"
      }`}>
        <Icon size={24} />
      </div>
      
      <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-white" : "text-gray-800"}`}>
        {title}
      </h3>
      
      <p className={`mb-4 ${isActive ? "text-blue-100" : "text-gray-600"}`}>
        {description}
      </p>
      
      {details && (
        <div className="mt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className={`flex items-center text-sm font-medium ${
              isActive ? "text-blue-100" : "text-blue-500"
            }`}
          >
            {expanded ? "Hide details" : "Show details"}
            <ChevronDown 
              size={16} 
              className={`ml-1 transform transition-transform ${expanded ? "rotate-180" : ""}`} 
            />
          </button>
          
          {expanded && (
            <div className={`mt-3 space-y-2 text-sm ${isActive ? "text-blue-100" : "text-gray-600"}`}>
              {details.map((detail: any, index: any) => (
                <div key={index} className="flex items-start">
                  <div className={`mr-2 mt-1 ${isActive ? "text-blue-200" : "text-blue-500"}`}>
                    <Check size={14} />
                  </div>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {isActive && (
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
          <ArrowRight size={24} className="text-blue-600" />
        </div>
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      number: "1",
      title: "Connect Your Wallet",
      description: "Link your Phantom or other Solana wallet to FlexVest with just a click.",
      icon: Wallet,
      details: [
        "Works with Phantom, Solflare, and other Solana wallets",
        "One-time authorization process",
        "No private keys or seed phrases required",
        "Secured by blockchain technology"
      ]
    },
    {
      number: "2",
      title: "Deposit USDC",
      description: "Add USDC to your FlexVest account using our simple deposit interface.",
      icon: CreditCard,
      details: [
        "Direct USDC transfers from connected wallet",
        "Support for bank transfers via partners",
        "Real-time conversion from Naira",
        "Instant confirmation and accessibility"
      ]
    },
    {
      number: "3",
      title: "Create Savings Goals",
      description: "Set up personal savings goals and watch your digital dollars grow.",
      icon: Target,
      details: [
        "Customizable savings categories",
        "Progress tracking dashboard",
        "Optional automatic deposits",
        "Notification alerts for milestones"
      ]
    }
  ];

  // Auto advance through steps
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  // Animation states for the progress line
  const getProgressWidth = () => {
    switch (activeStep) {
      case 1: return "w-0";
      case 2: return "w-1/2";
      case 3: return "w-full";
      default: return "w-0";
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How FlexVest Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start saving in digital dollars in just a few simple steps, protecting your money from Naira inflation.
          </p>
        </div>
        
        {/* Mobile version - vertical steps */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <StepCard
                {...step}
                isActive={parseInt(step.number) === activeStep}
                onClick={() => setActiveStep(parseInt(step.number))}
              />
              
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 h-6 w-px bg-gray-200 bottom-0 translate-y-full"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop version - horizontal steps with progress indicator */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 px-10 relative">
            <div className="absolute left-16 right-16 h-1 bg-gray-200 z-0">
              <div className={`h-full bg-blue-600 transition-all duration-1000 ease-in-out ${getProgressWidth()}`}></div>
            </div>
            
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(parseInt(step.number))}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                  parseInt(step.number) <= activeStep
                    ? "bg-blue-600 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                }`}
              >
                {parseInt(step.number) < activeStep ? (
                  <Check size={20} />
                ) : (
                  step.number
                )}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                isActive={parseInt(step.number) === activeStep}
                onClick={() => setActiveStep(parseInt(step.number))}
              />
            ))}
          </div>
        </div>
        
        {/* CTA button */}
        <div className="mt-16 text-center">
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight size={20} className="ml-2" />
          </a>
          
          <p className="mt-4 text-gray-500">
            No technical knowledge required. We'll guide you through each step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;