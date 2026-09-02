import React, { useState, useEffect } from 'react';

const MemberTeam = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔴 Sirf Member wali teams fetch karne ki API call
  const fetchMemberTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/teams/member-teams', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        const formattedTeams = data.map(t => {
          const leaderId = typeof t.leader === 'object' ? t.leader?._id?.toString() : t.leader?.toString();

          return {
            id: t._id,
            name: t.name,
            leader: t.leader,
            membersList: t.members.map(m => {
              const memberId = typeof m === 'object' ? m._id?.toString() : m?.toString();
              return {
                id: m._id,
                name: m.name || 'Developer',
                email: m.email || '',
                role: memberId === leaderId ? 'Leader' : 'Member'
              };
            })
          };
        });
        setTeams(formattedTeams);
      }
    } catch (error) {
      console.error("Error fetching member teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberTeams();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Loading your teams...</div>;
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm w-full max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">👥 My Teams</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        {selectedTeam ? `Viewing details for ${selectedTeam.name}` : 'Here are the teams you are currently assigned to.'}
      </p>

      {/* Agar koi team nahi hai */}
      {teams.length === 0 ? (
        <div className="text-center py-8 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">You are not assigned to any team yet. Accept a team invite first!</p>
        </div>
      ) : selectedTeam ? (
        
        /* 🔴 DETAILED VIEW (Single Team Roster) */
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--color-zoom-blue)] bg-blue-50/30 relative">
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-5 text-xs font-bold text-slate-500 hover:text-[var(--color-zoom-blue)] flex items-center gap-1 transition-colors cursor-pointer"
          >
            &larr; Back to all teams
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <h4 className="font-bold text-[var(--color-zoom-blue)] text-lg sm:text-xl break-words">{selectedTeam.name}</h4>
            <span className="bg-[var(--color-zoom-blue)] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              {selectedTeam.membersList?.length || 0} Members
            </span>
          </div>
          
          <div className="space-y-2 mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Team Roster:</p>
            {selectedTeam.membersList?.map((m, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-800 block">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.email}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border whitespace-nowrap ${m.role === 'Leader' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      ) : (

        /* 🔴 LIST VIEW (All Teams) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map(t => (
            <div key={t.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50 transition-all group flex flex-col justify-between">
              <div className="flex justify-between items-start gap-2 mb-4">
                <h4 className="font-bold text-slate-900 group-hover:text-[var(--color-zoom-blue)] transition-colors break-words">
                  {t.name}
                </h4>
                <span className="bg-blue-100 text-[var(--color-zoom-blue)] text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {t.membersList?.length || 0} Members
                </span>
              </div>
              <button
                onClick={() => setSelectedTeam(t)}
                className="w-full text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl group-hover:bg-[var(--color-zoom-blue)] group-hover:text-white group-hover:border-[var(--color-zoom-blue)] transition-all shadow-sm cursor-pointer"
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