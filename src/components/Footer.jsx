import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* 1. Brand & Info */}
          <div className="flex flex-col gap-4 pr-4">
            <div className="text-2xl font-extrabold text-white tracking-wide">
              CODEXPERT
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered platform to help software teams manage, collaborate, and deliver faster.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="#home" className="hover:text-[var(--color-zoom-blue)] transition-colors">Home</a>
              <a href="#code-comments" className="hover:text-[var(--color-zoom-blue)] transition-colors">Code Comments</a>
              <a href="#improve-code" className="hover:text-[var(--color-zoom-blue)] transition-colors">Improve Code</a>
              <a href="#bug-finder" className="hover:text-[var(--color-zoom-blue)] transition-colors">Bug Finder</a>
            </div>
          </div>

          {/* 3. Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">Contact & Social</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="mailto:info@codexpert.com" className="hover:text-[var(--color-zoom-blue)] transition-colors flex items-center gap-2">
                ✉️ info@codexpert.com
              </a>
              <a href="https://twitter.com/CodeXpert" target="_blank" rel="noreferrer" className="hover:text-[var(--color-zoom-blue)] transition-colors flex items-center gap-2">
                🐦 Twitter: @CodeXpert
              </a>
              <a href="#" className="hover:text-[var(--color-zoom-blue)] transition-colors flex items-center gap-2">
                💼 LinkedIn: CodeXpert
              </a>
            </div>
          </div>

          {/* 4. Value Add: Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe for the latest AI coding trends.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="bg-slate-800 text-white text-sm rounded-lg px-4 py-2.5 w-full outline-none focus:ring-1 focus:ring-[var(--color-zoom-blue)] border border-slate-700"
              />
              <button className="bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm shadow-md">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Centered Credits */}
        <div className="border-t border-slate-800 pt-8 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} CodeXpert. All rights reserved.
          </p>
          <p className="font-bold text-slate-300 tracking-widest uppercase text-xs">
            designed by Shivansh Dwivedi
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;