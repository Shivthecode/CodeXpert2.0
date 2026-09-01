import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
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
              <Link to="/login" className="hover:text-[var(--color-zoom-blue)] transition-colors">Home</Link>
              <Link to="/login" className="hover:text-[var(--color-zoom-blue)] transition-colors">Code Comments</Link>
              <Link to="/login" className="hover:text-[var(--color-zoom-blue)] transition-colors">Improve Code</Link>
              <Link to="/login" className="hover:text-[var(--color-zoom-blue)] transition-colors">Bug Finder</Link>
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

          {/* 4. Infrastructure & Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">Infrastructure</h4>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-200">Cloud Servers</span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-slate-700/80 text-slate-300 text-[10px] font-medium rounded">React</span>
                <span className="px-2 py-0.5 bg-slate-700/80 text-slate-300 text-[10px] font-medium rounded">Node.js</span>
                <span className="px-2 py-0.5 bg-slate-700/80 text-slate-300 text-[10px] font-medium rounded">Tailwind</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Centered Credits */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-slate-500 text-xs sm:text-sm">
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