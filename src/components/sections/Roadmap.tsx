import { CheckCircle } from 'lucide-react';

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Roadmap</h2>
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
  )
}

export default Roadmap;

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