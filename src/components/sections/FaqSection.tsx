import { useState } from 'react';
import { PlusCircle, MinusCircle, ArrowRight, DollarSign, Wallet, BarChart4, Shield } from 'lucide-react';

// Improved FAQ Accordion Item
const FAQItem = ({ question, answer, isOpen, toggle, index }: any) => {
  return (
    <div 
      className={`mb-4 overflow-hidden border rounded-xl transition-all duration-300 ${
        isOpen ? 'bg-white shadow-md border-indigo-100' : 'bg-white/50 border-gray-100 hover:border-indigo-100'
      }`}
    >
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className={`flex items-center justify-center w-8 h-8 mr-4 rounded-full transition-colors ${
            isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {index + 1}
          </span>
          <span className={`font-medium text-lg ${isOpen ? 'text-indigo-900' : 'text-gray-800'}`}>
            {question}
          </span>
        </span>
        <span className="text-indigo-500">
          {isOpen ? <MinusCircle size={20} /> : <PlusCircle size={20} />}
        </span>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 pt-0 pl-16 text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

// Featured FAQ card with icon
const FeatureFAQ = ({ icon: Icon, title, description, linkText }: any) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon size={22} />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <a 
      href="#" 
      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
    >
      {linkText} <ArrowRight size={16} className="ml-1" />
    </a>
  </div>
);

// Main FAQ Component
export default function FAQSection() {
  // Track which FAQ item is open
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqData = [
    {
      question: "What is USDC and why should I save in it?",
      answer: "USDC is a digital dollar (stablecoin) that's always worth $1 USD. By saving in USDC instead of Naira, you protect your money from inflation and currency devaluation that affects the Nigerian Naira. This means your savings maintain their purchasing power over time."
    },
    {
      question: "Do I need a bank account to use FlexVest?",
      answer: "No! FlexVest works directly with your Solana wallet. You don't need a bank account, BVN, or any traditional banking information to get started. All you need is a Solana wallet and some USDC to begin saving."
    },
    {
      question: "How do I get USDC to save on FlexVest?",
      answer: "You can purchase USDC on exchanges like Binance and transfer it to your Solana wallet. In future updates, we'll add direct on-ramps from Naira to USDC, making the process even more seamless and accessible."
    },
    {
      question: "Is there a minimum amount I need to start with?",
      answer: "No minimum! You can start saving with any amount of USDC that makes sense for your financial situation. FlexVest is designed to be accessible to everyone, regardless of how much you can save initially."
    },
    {
      question: "What are the fees for using FlexVest?",
      answer: "FlexVest charges a small 0.5% fee only when you withdraw your USDC. There are no fees for deposits or maintaining your savings. We believe in transparent pricing with no hidden charges."
    }
  ];
  
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about saving with FlexVest. Can't find what you're looking for?{' '}
            <a href="#contact" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              Contact our team
            </a>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureFAQ 
            icon={DollarSign}
            title="Stable Value Savings"
            description="Save in USDC to protect your money from inflation and maintain your purchasing power over time."
            linkText="Learn about USDC"
          />
          <FeatureFAQ 
            icon={Wallet}
            title="No Bank Required"
            description="Use your Solana wallet to save and grow your money without traditional banking complications."
            linkText="Get a wallet"
          />
          <FeatureFAQ 
            icon={BarChart4}
            title="Transparent Earnings"
            description="Earn competitive yields on your savings with complete transparency and no hidden fees."
            linkText="View rates"
          />
          <FeatureFAQ 
            icon={Shield}
            title="Security First"
            description="Your funds are secured by blockchain technology and smart contracts that are publicly verifiable."
            linkText="Security details"
          />
        </div>
        
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Common Questions</h3>
          
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              index={index}
            />
          ))}
          
          <div className="mt-8 flex justify-center">
            <button className="flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-5 py-3 rounded-lg font-medium transition-colors">
              View All FAQs <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}