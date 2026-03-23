export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">STAR-C</h1>
          <nav className="flex gap-8 items-center">
            <a href="#about" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">About</a>
            <a href="#programs" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">Programs</a>
            <a href="#news" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">News</a>
            <a href="/login" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">Login</a>
            <a href="/register" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">Register</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Solar Training & Research Centre</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">Accelerating Bhutan&apos;s clean energy transition through expert-led solar training programs and research initiatives</p>
          <a href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">Get Started Today</a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full">
        {/* Features Section */}
        <section id="programs" className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Why Choose STAR-C?</h3>
          <p className="text-center text-gray-600 mb-12 text-lg">Comprehensive solar education and training</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">📚</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Expert Training</h4>
              <p className="text-gray-700 leading-relaxed">Learn solar technology from industry experts and certified instructors in Bhutan</p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">🔧</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Hands-On Experience</h4>
              <p className="text-gray-700 leading-relaxed">Practical workshops and real-world project experience with cutting-edge equipment</p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">🏆</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Certification</h4>
              <p className="text-gray-700 leading-relaxed">Recognized credentials and certifications in solar energy technology</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Solar Journey?</h3>
          <p className="text-blue-100 mb-8 text-lg">Join thousands of professionals advancing clean energy in Bhutan</p>
          <a href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">Register Now</a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">STAR-C</h4>
              <p className="text-sm">Solar Training & Research Centre for Bhutan&apos;s clean energy transition</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Learning</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 STAR-C. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
