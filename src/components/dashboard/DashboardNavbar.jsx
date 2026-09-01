import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // Naya state profile card ke liye

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); 
    navigate('/login'); 
  };

  // User ke naam ka pehla letter nikalne ke liye function (Avatar ke liye)
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-100">
      
      {/* Left Side - Brand Logo */}
      <Link to="/dashboard" className="text-2xl font-extrabold text-[var(--color-zoom-blue)] tracking-wide">
        CodeXpert
      </Link>

      {/* Right Side - Options */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        
        {/* 1. AI Tools Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowTools(!showTools); setShowNotifications(false); setShowProfile(false); }}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[var(--color-zoom-blue)] transition-colors bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200"
          >
            <span>✨ AI Tools</span>
          </button>

          {showTools && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <button 
                onClick={() => { alert('Opening Code Review AI...'); setShowTools(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
              >
                🔍 Code Review
              </button>
              <button 
                onClick={() => { alert('Opening Text Formatter with AI...'); setShowTools(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
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
            className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-colors relative"
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

        {/* 3. User Profile Dropdown (New Card Logic) */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowTools(false); setShowNotifications(false); }}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/30"
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
              {/* User Details Area */}
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
              
              {/* Logout Button inside Card */}
              <div className="border-t border-slate-100 pt-4">
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
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
    </nav>
  );
};

export default DashboardNavbar;