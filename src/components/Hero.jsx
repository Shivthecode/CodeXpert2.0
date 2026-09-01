import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-[var(--color-zoom-blue)] to-slate-800 min-h-[85vh] flex items-center px-4 sm:px-6 py-12 md:px-12 relative overflow-hidden">
      
      {/* Light glow highlights */}
      <div className="absolute top-10 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-[var(--color-zoom-azure)] rounded-full blur-[120px] sm:blur-[140px] opacity-35 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-white rounded-full blur-[140px] sm:blur-[160px] opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Content Box */}
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            AI Agent Platform for <br className="hidden lg:block" />
            <span className="text-[var(--color-zoom-tango)]">Software Development Teams</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-lg font-normal px-2 md:px-0">
            Transform software development with codeXpert’s Agentic AI Platform...
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
            <button className="bg-white text-[var(--color-zoom-blue)] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md w-full sm:w-auto cursor-pointer">
              Create Free Account
            </button>
            <button className="border-2 border-white/80 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl transition-all w-full sm:w-auto cursor-pointer">
              Login
            </button>
          </div>
        </div>

        {/* Right Side: Image Box */}
        <div className="flex justify-center md:justify-end mt-6 md:mt-0 px-2 sm:px-0">
          <img 
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjBzZXR1cCUyMGltZ3xlbnwwfHwwfHx8MA%3D%3D" 
            alt="CodeXpert Platform Preview" 
            className="w-full max-w-sm sm:max-w-md md:max-w-lg object-contain border-4 border-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;