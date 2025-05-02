import { Github, Linkedin, Globe } from "lucide-react";
import { useState } from "react";
import { rapto } from "../../assets";

const Team = () => {
    const team = [
      {
        name: "Jesse",
        role: "Founder & Frontend Developer",
        image: rapto,
        socials: {
          github: "#",
          linkedin: "#",
          website: "#"
        }
      },
      {
        name: "Rapto",
        role: "Tech Lead & Blockchain Developer",
        image: rapto,
        socials: {
          github: "https://github.com/heycalebszn",
          linkedin: "#",
          website: "https://rapto.vercel.app"
        }
      },
      {
        name: "Ezekiel",
        role: "UI/UX Designer",
        image: rapto,
        socials: {
          github: "#",
          linkedin: "#",
          website: "#"
        }
      }
    ];
  
    return (
        <section id="team" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're a team of Nigerian builders who've lived this problem and are passionate about local financial inclusion through blockchain.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <TeamMember key={index} member={member} />
              ))}
            </div>
          </div>
        </section>
      );
  };
  
  const TeamMember = ({ member }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className="rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 overflow-hidden">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-80 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-0'}`}></div>
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-16'}`}>
            <div className="flex space-x-3 justify-center">
              {member.socials.github && (
                <a href={member.socials.github} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                  <Github size={16} />
                </a>
              )}
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                  <Linkedin size={16} />
                </a>
              )}
              {member.socials.website && (
                <a href={member.socials.website} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="text-blue-600 font-medium mb-3">{member.role}</p>
          <p className="text-gray-600">{member.bio}</p>
        </div>
      </div>
    );
  };
  
  // Export both components
  export default Team;