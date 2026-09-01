import React, { useState } from 'react';

// Default value teams = [] set kar diya hai error se bachne ke liye
const MyTeams = ({ teams = [], setTeams }) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [memberEmail, setMemberEmail] = useState('');

  // 1. Nayi Team Banane ka function
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return; // Agar naam khali hai toh kuch mat karo
    
    const newTeam = {
      id: Date.now(),
      name: newTeamName,
      project: 'Project Workspace',
      membersList: [] // Nayi team banate waqt member list bilkul khali hogi
    };

    setTeams([...teams, newTeam]);
    setNewTeamName(''); // Input clear karo
    alert('Team created successfully!');
  };

  // 2. Email ke zariye Member ko Invite karne ka function
  const handleInviteMember = (e, teamId) => {
    e.preventDefault();
    if (!memberEmail.trim()) return;

    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          // Pehle ke members ke sath naya member add karo
          membersList: [...(team.membersList || []), { email: memberEmail, status: 'Pending Approval' }]
        };
      }
      return team;
    }));

    alert(`Invitation sent to ${memberEmail}! Once they accept, they will join the team.`);
    setMemberEmail(''); // Input clear karo
    setSelectedTeamId(null); // Form close karo
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      
      {/* 🟢 1. CREATE TEAM SECTION */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto md:mx-0">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">➕ Create New Team</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">Create a workspace team and invite developers via email.</p>
        
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Team Name</label>
            <input 
              type="text" 
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="e.g. CodeXpert Core Squad" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-xs sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[var(--color-zoom-blue)] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md hover:bg-blue-700 transition-all cursor-pointer">
            Launch Team
          </button>
        </form>
      </div>

      {/* 🟢 2. VIEW TEAMS & ADD MEMBERS SECTION */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm w-full">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Your Created Teams</h3>
        
        {/* Agar koi team nahi banayi, toh message dikhao */}
        {teams.length === 0 ? (
          <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">No teams created yet. Create your first team above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teams.map(t => (
              <div key={t.id} className="p-4 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col justify-between space-y-4">
                
                {/* Team Info */}
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg break-words">{t.name}</h4>
                    <span className="bg-blue-100 text-[var(--color-zoom-blue)] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      {(t.membersList || []).length} Members
                    </span>
                  </div>
                  
                  {/* Members List */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Team Roster:</p>
                    {(!t.membersList || t.membersList.length === 0) ? (
                      <p className="text-xs text-slate-400 italic">No members invited yet.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {t.membersList.map((m, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs">
                            <span className="font-medium text-slate-700 break-all">{m.email}</span>
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-amber-600 whitespace-nowrap">
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Member Button / Form */}
                <div className="pt-2">
                  {selectedTeamId === t.id ? (
                    <form onSubmit={(e) => handleInviteMember(e, t.id)} className="space-y-2 border-t border-slate-200 pt-3">
                      <input 
                        type="email" 
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder="Enter member's email ID..." 
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="flex-grow bg-slate-900 hover:bg-black text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer">
                          Send Invite
                        </button>
                        <button type="button" onClick={() => setSelectedTeamId(null)} className="px-3 sm:px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      onClick={() => setSelectedTeamId(t.id)}
                      className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl text-xs border border-slate-200 transition-colors shadow-sm cursor-pointer"
                    >
                      + Add Member by Email
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MyTeams;