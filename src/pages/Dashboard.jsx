import React from 'react';
import { useAuth } from '../context/AuthContext';
import LeaderDashboard from '../components/dashboard/LeaderDashboard';
import MemberDashboard from '../components/dashboard/MemberDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Fallback user state agar direct URL open kiya ho
  const currentUser = user || { name: 'Shiv', role: 'member' };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[var(--color-zoom-blue)] text-white p-6 sm:p-8 rounded-3xl shadow-lg mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-block bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-2 sm:mb-3">
            {currentUser.role === 'leader' ? '👔 Team Leader Portal' : '💻 Team Member Workspace'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Welcome back, {currentUser.name}!</h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">Here is your project overview and system status.</p>
        </div>
      </div>

      {/* Render Component based on User Role */}
      <div className="w-full">
        {currentUser.role === 'leader' ? <LeaderDashboard /> : <MemberDashboard />}
      </div>

    </div>
  );
};

export default Dashboard;