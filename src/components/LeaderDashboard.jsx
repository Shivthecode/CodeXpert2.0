import React from 'react';

const LeaderDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">➕ Create New Team</h3>
        <p className="text-sm text-slate-500 mb-4">Form projects and assign members.</p>
        <button className="bg-[var(--color-zoom-blue)] text-white font-medium px-4 py-2 rounded-xl text-sm">Create Team</button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">📌 Assign Tasks</h3>
        <p className="text-sm text-slate-500 mb-4">Distribute work across development teams.</p>
        <button className="bg-slate-900 text-white font-medium px-4 py-2 rounded-xl text-sm">Manage Tasks</button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">📊 Project Insights</h3>
        <p className="text-sm text-slate-500 mb-4">Accept or decline code submissions.</p>
        <button className="bg-[var(--color-zoom-tango)] text-white font-medium px-4 py-2 rounded-xl text-sm">View Reports</button>
      </div>
    </div>
  );
};

export default LeaderDashboard;