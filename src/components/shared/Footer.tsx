import { Instagram, Linkedin, ShieldCheck, Twitter } from "lucide-react"

const Footer = () => {
  return (
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
  )
}

export default Footer
