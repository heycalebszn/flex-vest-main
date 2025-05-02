const Cta = () => {
  return (
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
  )
}

export default Cta
