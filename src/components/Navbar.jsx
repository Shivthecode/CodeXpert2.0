import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path apne project ke hisaab se check kar lena

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Auth context se user aur logout function nikal rahe hain
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    setIsOpen(false);
    setShowProfile(false);
    window.location.href = '/'; 
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

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

        {/* Right Side - Desktop Links */}
        <div className="hidden md:flex items-center gap-3 relative">
          
          {/* Agar user logged in hai toh Profile dikhao, warna Login/Signup */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-bold text-[var(--color-zoom-blue)] hover:underline"
              >
                Dashboard
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/30 shadow-sm cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--color-zoom-blue)] text-white flex items-center justify-center font-bold text-sm">
                    {getInitials(user?.name)}
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {user?.name || 'Developer'}
                  </span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desktop Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-50">
                    <div className="flex flex-col items-center text-center mb-5">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] flex items-center justify-center font-bold text-2xl mb-3">
                        {getInitials(user?.name)}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{user?.name || 'Developer'}</h4>
                      <p className="text-xs text-slate-500 font-medium mb-2 w-full truncate">{user?.email || 'email@example.com'}</p>
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200">
                        {user?.role || 'Member'}
                      </span>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4">
                      <button 
                        onClick={handleLogout}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => { setIsOpen(!isOpen); setShowProfile(false); }}
            className="text-slate-600 hover:text-[var(--color-zoom-blue)] focus:outline-none p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
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
          
          {user ? (
            <>
              {/* Logged in Mobile View */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 mx-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[var(--color-zoom-blue)] text-white flex items-center justify-center font-bold text-sm">
                  {getInitials(user?.name)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Developer'}</h4>
                  <p className="text-xs text-slate-500 truncate">{user?.email || 'email@example.com'}</p>
                </div>
              </div>
              
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="text-center bg-[var(--color-zoom-blue)] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md mx-2"
              >
                Go to Dashboard
              </Link>
              
              <button 
                onClick={handleLogout}
                className="w-[calc(100%-1rem)] mx-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged out Mobile View */}
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
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;