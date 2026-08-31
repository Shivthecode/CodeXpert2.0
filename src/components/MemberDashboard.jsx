import React from 'react';

const MemberDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">📋 My Assigned Tasks</h3>
        <p className="text-sm text-slate-500 mb-4">View pending and completed tasks in real-time.</p>
        <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-200">
          Fix Navbar responsive bug (Pending)
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">⚡ Code Submission</h3>
        <p className="text-sm text-slate-500 mb-4">Submit your codebase updates for leader review.</p>
        <button className="bg-[var(--color-zoom-blue)] text-white font-medium px-4 py-2 rounded-xl text-sm">Submit Code</button>
      </div>
    </div>
  );
};

export default MemberDashboard;