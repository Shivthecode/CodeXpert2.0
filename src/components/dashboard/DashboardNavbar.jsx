import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); 
    // Isse forcefully Home Page par redirect hoga, chahe Protected Route kuch bhi kare
    window.location.href = '/'; 
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="w-full bg-gradient-to-r from-white via-slate-50/80 to-blue-50/30 backdrop-blur-md px-4 sm:px-6 py-3.5 sticky top-0 z-50 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side - Brand Logo */}
        <Link to="/dashboard" className="text-xl sm:text-2xl font-extrabold text-[var(--color-zoom-blue)] tracking-wide">
          CodeXpert
        </Link>

        {/* Right Side - Desktop Options */}
        <div className="hidden md:flex items-center gap-4 relative">
          
          {/* 1. AI Tools Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowTools(!showTools); setShowNotifications(false); setShowProfile(false); }}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[var(--color-zoom-blue)] transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
            >
              <span>✨ AI Tools</span>
            </button>

            {showTools && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                <button 
                  onClick={() => { alert('Opening Code Review AI...'); setShowTools(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                >
                  🔍 Code Review
                </button>
                <button 
                  onClick={() => { alert('Opening Text Formatter with AI...'); setShowTools(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                >
                  📝 Text Formatter with AI
                </button>
              </div>
            )}
          </div>

          {/* 2. Notification Icon */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowTools(false); setShowProfile(false); }}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors relative shadow-sm cursor-pointer"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Notifications</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    New task assigned by team leader.
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    Code submission approved successfully.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowTools(false); setShowNotifications(false); }}
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

        {/* Mobile Right Icons & Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          
          {/* Notification for Mobile - FIXED RESPONSIVENESS */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMobileMenu(false); }}
              className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 relative shadow-sm cursor-pointer"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-[-10px] sm:right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 origin-top-right">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Notifications</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    New task assigned by team leader.
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    Code submission approved successfully.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Toggle Button */}
          <button
            onClick={() => { setShowMobileMenu(!showMobileMenu); setShowNotifications(false); }}
            className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 shadow-sm focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-4 pb-4 border-t border-slate-200/60 pt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* User Profile Info Card inside Mobile Menu */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-[var(--color-zoom-blue)] text-white flex items-center justify-center font-bold text-sm">
              {getInitials(user?.name)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Developer'}</h4>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'email@example.com'}</p>
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">AI Tools</span>
            <button 
              onClick={() => { alert('Opening Code Review AI...'); setShowMobileMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 font-medium cursor-pointer"
            >
              🔍 Code Review
            </button>
            <button 
              onClick={() => { alert('Opening Text Formatter with AI...'); setShowMobileMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 font-medium cursor-pointer"
            >
              📝 Text Formatter with AI
            </button>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;