import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, quote, active }: any) => (
  <div className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-500 transform ${active ? "scale-100 opacity-100" : "scale-95 opacity-40"} flex flex-col h-full`}>
    <div className="mb-6 text-blue-500">
      <Quote size={32} />
    </div>
    <p className="text-gray-700 mb-6 flex-grow text-lg font-light leading-relaxed">"{quote}"</p>
    <div className="flex items-center mt-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 shadow-md">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="ml-auto flex text-yellow-400">
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Oluwaseun A.",
      role: "Freelance Designer",
      quote: "Since I started saving in USDC with FlexVest, I no longer worry about my income losing value. The platform is so simple to use!"
    },
    {
      name: "Chioma E.",
      role: "Small Business Owner",
      quote: "FlexVest has changed how I save for business expenses. With my money in digital dollars, I can plan better for the future."
    },
    {
      name: "Ademola T.",
      role: "Student",
      quote: "As a student, I need to make my money last. FlexVest helps me save my allowance in USDC, so it keeps its value semester after semester."
    },
    {
      name: "Emeka N.",
      role: "Software Developer",
      quote: "The FlexVest app makes dollar savings accessible to everyone. I've recommended it to all my colleagues who want to preserve their earnings."
    },
    {
      name: "Amina B.",
      role: "Healthcare Professional",
      quote: "I'm saving for medical equipment for my clinic. FlexVest's stable USDC savings ensure inflation doesn't eat away at my funds."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isHovered, testimonials.length]);

  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Why Nigerians Love FlexVest
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from people who are protecting their savings from Naira inflation and securing their financial future.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                {...testimonial}
                active={index === activeIndex}
                index={index}
              />
            ))}
          </div>

          <div className="lg:hidden">
            <TestimonialCard 
              {...testimonials[activeIndex]}
              active={true}
              index={activeIndex}
            />
          </div>
          
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button 
              onClick={goToPrev}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-blue-600 w-6" : "bg-blue-200"
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="font-medium text-lg mb-4 text-blue-800">
            Join over 10,000+ Nigerians saving in digital dollars
          </p>
          <a
            href="#signup"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            Start Saving in USDC Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;