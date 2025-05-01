import { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  Target, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  DollarSign,
  Smartphone,
  Users
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index, isActive, onClick, color }: any) => {
  return (
    <div 
      className={`relative rounded-xl transition-all duration-300 overflow-hidden cursor-pointer group ${
        isActive 
          ? "bg-white shadow-xl border-l-4 transform scale-100 z-10" 
          : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
      }`}
      style={{ borderLeftColor: isActive ? color : 'transparent' }}
      onClick={onClick}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"} transition-opacity`} 
        style={{ backgroundColor: color }}></div>
      
      <div className="p-6">
        <div className="flex items-start">
          <div 
            className="p-3 rounded-lg mr-4"
            style={{ backgroundColor: `${color}15` }} // 15% opacity version of the color
          >
            <Icon color={color} size={28} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              {title}
              {isActive && <ChevronRight size={18} className="ml-2 text-gray-400" />}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        
        {isActive && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {getFeatureDetails(index).map((detail, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                  <span className="text-sm text-gray-600">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getFeatureDetails = (index: any) => {
  const detailsByFeature = [
    ["USDC pegged to USD", "Protection from inflation", "Globally accepted", "Stable value storage"],
    ["Under 1 second finality", "Low transaction fees", "Immediate settlement", "Scalable architecture"],
    ["No custodial risks", "Full ownership", "Enhanced security", "Private key control"],
    ["Visual progress tracking", "Milestone notifications", "Custom target dates", "Category management"],
    ["Transparent pricing", "No monthly charges", "Minimal withdrawal fee", "Cost-effective solution"],
    ["No downtime", "Global accessibility", "Mobile-optimized", "Real-time updates"]
  ];
  
  return detailsByFeature[index] || [];
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", label: "All Features" },
    { id: "security", label: "Security" },
    { id: "performance", label: "Performance" },
    { id: "usability", label: "Usability" }
  ];
  
  const features = [
    {
      icon: ShieldCheck,
      title: "Stable Dollar Savings",
      description: "Save in USDC to protect your money from Naira inflation and currency devaluation.",
      category: ["security"],
      color: "#2563EB" // blue-600
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "Instant deposits and withdrawals powered by Solana's lightning-fast blockchain.",
      category: ["performance"],
      color: "#9333EA" // purple-600
    },
    {
      icon: Lock,
      title: "Self-Custody",
      description: "Your funds stay in your wallet. No intermediaries, complete control over your money.",
      category: ["security"],
      color: "#16A34A" // green-600
    },
    {
      icon: Target,
      title: "Savings Goals",
      description: "Create personalized savings goals and track your progress in real-time.",
      category: ["usability"],
      color: "#EA580C" // orange-600
    },
    {
      icon: TrendingUp,
      title: "Low Fees",
      description: "Only 0.5% withdrawal fee. No hidden charges, no expensive international transfer fees.",
      category: ["performance"],
      color: "#DC2626" // red-600
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access your money anytime, anywhere with our mobile-friendly platform.",
      category: ["usability"],
      color: "#0891B2" // cyan-600
    }
  ];

  const filteredFeatures = features.filter(feature => 
    selectedCategory === "all" || feature.category.includes(selectedCategory)
  );

  const marketStats = [
    { label: "Nigerian Naira Inflation Rate", value: "22.41%", icon: DollarSign, description: "Annual inflation rate (April 2025)" },
    { label: "Active FlexVest Users", value: "25,000+", icon: Users, description: "Growing community across Nigeria" },
    { label: "Mobile Access Rate", value: "99.7%", icon: Smartphone, description: "Platform availability on mobile devices" }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose FlexVest?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            FlexVest combines the stability of digital dollars with the speed of Solana to help you achieve your financial goals while protecting your savings from inflation.
          </p>
        </div>
        
        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {marketStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-blue-50 mr-3">
                  <stat.icon size={20} className="text-blue-600" />
                </div>
                <h4 className="text-gray-500 font-medium text-sm">{stat.label}</h4>
              </div>
              <div className="flex items-end">
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="ml-2 mb-1 text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              index={features.indexOf(feature)}
              isActive={activeFeature === features.indexOf(feature)}
              onClick={() => setActiveFeature(features.indexOf(feature))}
            />
          ))}
        </div>
        
        {/* Bottom CTA section */}
        <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-white">
            <div className="md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to protect your savings from inflation?</h3>
                <p className="text-blue-100 mb-4">Join thousands of Nigerians who are already saving in digital dollars with FlexVest.</p>
                <div className="flex space-x-3 mt-6">
                  <a 
                    href="#signup" 
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Create Account
                  </a>
                  <a 
                    href="#learn-more" 
                    className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <DollarSign size={40} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;