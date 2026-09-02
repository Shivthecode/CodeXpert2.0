import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // UI States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 🔴 Naye API States
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); 
    window.location.href = '/'; 
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // 🔴 1. Backend se Notifications Fetch Karna
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5000/api/teams/notifications', {
        method: 'GET',
        headers: { 'auth-token': token }
      });
      
      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Jab navbar load ho tab API call karo
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔴 2. Invite Accept ya Reject Karna
  const handleAction = async (notificationId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/teams/respond-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ notificationId, action })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // List se action li gayi notification ko hata do
        setNotifications(notifications.filter(n => n._id !== notificationId));
        // Notification dropdown band kar do agar chaho toh:
        // setShowNotifications(false); 
      } else {
        alert(data.message || "Action failed.");
      }
    } catch (error) {
      console.error("Error in responding:", error);
      alert("Server se connect nahi ho paya.");
    }
  };

  // 🔴 3. Dropdown UI banane ka chota function (Kyunki Desktop/Mobile dono jagah lagana hai)
  const renderNotificationContent = () => {
    return (
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500 font-medium">No new notifications.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif._id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <p className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold">{notif.sender?.name || 'Someone'}</span> invited you to team <span className="font-bold text-[var(--color-zoom-blue)]">"{notif.team?.name || 'Unknown'}"</span>
              </p>
              <div className="flex gap-2 mt-1">
                <button 
                  onClick={() => handleAction(notif._id, 'accepted')}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer shadow-sm"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleAction(notif._id, 'rejected')}
                  className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
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

          {/* 2. Notification Icon (Desktop) */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowTools(false); setShowProfile(false); }}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors relative shadow-sm cursor-pointer"
            >
              🔔
              {/* 🔴 Dynamic Notification Badge */}
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</h4>
                </div>
                {/* 🔴 Yahan function call kiya jo notification list banayega */}
                {renderNotificationContent()}
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
          
          {/* Notification for Mobile */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMobileMenu(false); }}
              className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 relative shadow-sm cursor-pointer"
            >
              🔔
              {/* 🔴 Dynamic Notification Badge for Mobile */}
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-[-10px] sm:right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 origin-top-right max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</h4>
                </div>
                {/* 🔴 Yahan bhi function call kiya */}
                {renderNotificationContent()}
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