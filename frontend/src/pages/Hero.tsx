

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200">
        <div className="text-2xl font-bold tracking-tight text-indigo-600">
          AdmissionPRO
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition">Courses</a>
          <a href="#" className="hover:text-indigo-600 transition">About</a>
          <a href="#" className="hover:text-indigo-600 transition">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-slate-600 font-medium hover:text-indigo-600">Login</button>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20 md:py-32 flex flex-col items-center text-center">
        <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          ardis 💦💦
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Your journey to <span className="text-indigo-600">Higher Education</span> starts here.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          The simplest way to manage your university applications, track your admission status, and pay fees—all in one secure dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Apply Now
          </button>
          <button className="bg-white border border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition">
            Browse Courses
          </button>
        </div>

        {/* Floating Stat/Social Proof */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12 w-full">
          <div>
            <div className="text-3xl font-bold text-slate-900">10k+</div>
            <div className="text-slate-500 text-sm">Active Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">500+</div>
            <div className="text-slate-500 text-sm">Colleges</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">98%</div>
            <div className="text-slate-500 text-sm">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">24/7</div>
            <div className="text-slate-500 text-sm">Support</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;