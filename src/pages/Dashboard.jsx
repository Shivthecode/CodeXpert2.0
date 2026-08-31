import React from 'react';
import { useAuth } from '../context/AuthContext';
import LeaderDashboard from '../components/dashboard/LeaderDashboard';
import MemberDashboard from '../components/dashboard/MemberDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Fallback user state agar direct URL open kiya ho
  const currentUser = user || { name: 'Shiv', role: 'member' };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[var(--color-zoom-blue)] text-white p-8 rounded-3xl shadow-lg mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            {currentUser.role === 'leader' ? '👔 Team Leader Portal' : '💻 Team Member Workspace'}
          </span>
          <h1 className="text-3xl font-extrabold mt-3">Welcome back, {currentUser.name}!</h1>
          <p className="text-blue-100 text-sm mt-1">Here is your project overview and system status.</p>
        </div>
      </div>

      {/* Render Component based on User Role */}
      {currentUser.role === 'leader' ? <LeaderDashboard /> : <MemberDashboard />}

    </div>
  );
};

export default Dashboard;