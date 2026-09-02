import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client'; 

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // UI States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // API States
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); 
    window.location.href = '/'; 
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // 🔴 useCallback use kiya taaki function refresh na ho aur proper data aaye
  const fetchNotifications = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchNotifications(); 

    // 🔴 Transports add kiye taaki connection fast aur stable ho
    const socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    // Debugging ke liye (Browser console mein dikhega)
    socket.on('connect', () => {
      console.log('✅ Navbar Socket Connected!');
    });

    // 🔴 'notificationUpdated' aur 'teamUpdated' dono ko listen karo
    socket.on('notificationUpdated', () => {
      console.log('🔔 New Notification Signal Received!');
      fetchNotifications();
    });

    socket.on('teamUpdated', () => {
      fetchNotifications();
    });

    return () => socket.disconnect();
  }, [fetchNotifications]);

  // 2. Invite Accept ya Reject Karna
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
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
      } else {
        alert(data.message || "Action failed.");
      }
    } catch (error) {
      console.error("Error in responding:", error);
      alert("Server se connect nahi ho paya.");
    }
  };

  // 3. Dropdown UI
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
          
          {/* AI Tools */}
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

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowTools(false); setShowProfile(false); }}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors relative shadow-sm cursor-pointer"
            >
              🔔
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
                {renderNotificationContent()}
              </div>
            )}
          </div>

          {/* Profile */}
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
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-50">
                <div className="flex flex-col items-center text-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] flex items-center justify-center font-bold text-2xl mb-3">
                    {getInitials(user?.name)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{user?.name || 'Developer'}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-2 w-full truncate">{user?.email || 'email@example.com'}</p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMobileMenu(false); }}
              className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 relative shadow-sm cursor-pointer"
            >
              🔔
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-[-10px] sm:right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</h4>
                </div>
                {renderNotificationContent()}
              </div>
            )}
          </div>

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
    </nav>
  );
};

export default DashboardNavbar;