import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-100">
      
      {/* Left Side - Brand Logo */}
      <Link to="/dashboard" className="text-2xl font-extrabold text-[var(--color-zoom-blue)] tracking-wide">
        CodeXpert
      </Link>

      {/* Right Side - Options */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        
        {/* 1. AI Tools Dropdown (Code Review & Text Formatter) */}
        <div className="relative">
          <button 
            onClick={() => { setShowTools(!showTools); setShowNotifications(false); }}
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
            onClick={() => { setShowNotifications(!showNotifications); setShowTools(false); }}
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

        {/* 3. Logout Button */}
        <button 
          onClick={handleLogout}
          className="bg-slate-900 hover:bg-black text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default DashboardNavbar;