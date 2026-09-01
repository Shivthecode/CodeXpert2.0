import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side - Logo (CodeXpert only) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-zoom-blue)] to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-[var(--color-zoom-blue)] bg-clip-text text-transparent tracking-tight">
            CodeXpert
          </span>
        </Link>

        {/* Right Side - Desktop Links (Stylish Login & Signup Buttons) */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-slate-700 hover:text-[var(--color-zoom-blue)] font-semibold px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200 text-sm border border-slate-200 shadow-sm"
          >
            Log In
          </Link>
          
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-[var(--color-zoom-blue)] to-indigo-600 hover:opacity-95 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-300 text-sm shadow-md shadow-blue-500/25 flex items-center gap-2"
          >
            <span>Sign Up</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 hover:text-[var(--color-zoom-blue)] focus:outline-none p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 pb-3 flex flex-col gap-2 border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="text-center text-slate-700 hover:text-[var(--color-zoom-blue)] font-semibold py-2.5 rounded-xl border border-slate-200 mx-2 transition-colors"
          >
            Log In
          </Link>
          <Link 
            to="/signup" 
            onClick={() => setIsOpen(false)}
            className="text-center bg-gradient-to-r from-[var(--color-zoom-blue)] to-indigo-600 hover:opacity-95 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 mx-2"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;