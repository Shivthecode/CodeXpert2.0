import React, { useState } from 'react';

const MemberTeam = ({ teams = [] }) => {
  // State to track which team is currently being viewed
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
      <h3 className="text-xl font-bold text-slate-900 mb-2">👥 My Teams</h3>
      <p className="text-xs text-slate-500 mb-6">
        {selectedTeam ? `Viewing details for ${selectedTeam.name}` : 'Here are the teams you are currently assigned to.'}
      </p>

      {/* Agar koi team nahi hai */}
      {teams.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">You are not assigned to any team yet.</p>
        </div>
      ) : selectedTeam ? (
        
        /* 🔴 DETAILED VIEW (Single Team Roster) */
        <div className="p-6 rounded-2xl border border-[var(--color-zoom-blue)] bg-blue-50/30 relative">
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-5 text-xs font-bold text-slate-500 hover:text-[var(--color-zoom-blue)] flex items-center gap-1 transition-colors"
          >
            &larr; Back to all teams
          </button>

          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-[var(--color-zoom-blue)] text-xl">{selectedTeam.name}</h4>
            <span className="bg-[var(--color-zoom-blue)] text-white text-xs font-bold px-3 py-1 rounded-full">
              {selectedTeam.membersList?.length || 0} Members
            </span>
          </div>
          
          <div className="space-y-2 mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Team Roster:</p>
            {selectedTeam.membersList?.map((m, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm">
                <span className="font-medium text-slate-700">{m.email}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                  {m.role || 'Member'}
                </span>
              </div>
            ))}
          </div>
        </div>

      ) : (

        /* 🔴 LIST VIEW (All Teams) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map(t => (
            <div key={t.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50 transition-all group flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-900 group-hover:text-[var(--color-zoom-blue)] transition-colors pr-2">
                  {t.name}
                </h4>
                <span className="bg-blue-100 text-[var(--color-zoom-blue)] text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {t.membersList?.length || 0} Members
                </span>
              </div>
              <button
                onClick={() => setSelectedTeam(t)}
                className="w-full text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl group-hover:bg-[var(--color-zoom-blue)] group-hover:text-white group-hover:border-[var(--color-zoom-blue)] transition-all shadow-sm"
              >
                View Team Details
              </button>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default MemberTeam;