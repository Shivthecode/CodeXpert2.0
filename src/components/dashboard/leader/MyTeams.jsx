import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // 🔴 1. Socket.io import kiya

const MyTeams = ({ teams = [], setTeams }) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [memberEmail, setMemberEmail] = useState('');

  // 1. Page load hote hi Database se Asli Teams Fetch karna
  const fetchMyTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/teams/my-teams', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        const formattedTeams = data.map(t => ({
          id: t._id,
          name: t.name,
          project: 'Project Workspace',
          membersList: t.members.map(m => ({
            id: m._id, 
            name: m.name || 'Developer',
            email: m.email || '',
            status: 'Active' // Jo accept kar chuke hain
          }))
        }));
        setTeams(formattedTeams);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchMyTeams(); // Pehli baar page load hone par fetch karega

    // 🔴 2. Socket connection setup
    const socket = io('http://localhost:5000');

    // 🔴 3. Jab koi member invite accept karega ya team update hogi, bina refresh kiye data change hoga
    socket.on('teamUpdated', () => {
      fetchMyTeams();
    });

    // Cleanup function memory leak rokne ke liye
    return () => socket.disconnect();
  }, []);

  // 2. Nayi Team Banane ka function
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first!");

      const response = await fetch('http://localhost:5000/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ name: newTeamName })
      });

      const data = await response.json();

      if (response.ok) {
        fetchMyTeams(); 
        setNewTeamName('');
        alert('Team created successfully!');
      } else {
        alert(data.message || "Error creating team");
      }
    } catch (error) {
      console.error("API Call Error: ", error);
      alert("Server connection failed.");
    }
  };

  // 3. Email ke zariye Member ko Invite karne ka function
  const handleInviteMember = async (e, teamId) => {
    e.preventDefault();
    if (!memberEmail.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Please login first!");

      const response = await fetch('http://localhost:5000/api/teams/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ teamId: teamId, memberEmail: memberEmail })
      });

      const data = await response.json();

      if (response.ok) {
        // Invite bhejte hi turant UI state mein "Pending Approval" status ke sath add kar do
        setTeams(teams.map(team => {
          if (team.id === teamId) {
            return {
              ...team,
              membersList: [...(team.membersList || []), { name: '', email: memberEmail, status: 'Pending Approval' }]
            };
          }
          return team;
        }));
        alert(data.message);
      } else {
        alert(data.message || "Invite failed.");
      }
    } catch (error) {
      console.error("API Call Error: ", error);
      alert("Server connection failed.");
    }

    setMemberEmail('');
    setSelectedTeamId(null);
  };

  // 4. Team Delete karne ka function
  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm("Kya aap sach mein is team ko delete karna chahte hain?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/teams/delete/${teamId}`, {
        method: 'DELETE',
        headers: { 'auth-token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setTeams(teams.filter(t => t.id !== teamId));
        fetchMyTeams(); 
        alert(data.message);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  // 5. Team se Member Remove karne ka function
  const handleRemoveMember = async (teamId, memberId) => {
    if (!window.confirm("Kya aap is member ko team se hatana chahte hain?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/teams/remove-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
        body: JSON.stringify({ teamId, memberId })
      });
      const data = await response.json();
      if (response.ok) {
        fetchMyTeams(); 
        alert(data.message);
      } else {
        alert(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      
      {/* 1. CREATE TEAM SECTION */}
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

      {/* 2. VIEW TEAMS & ADD MEMBERS SECTION */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm w-full">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Your Created Teams</h3>
        
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
                    
                    {/* 🔴 Top Right Corner Delete Icon */}
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-[var(--color-zoom-blue)] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap">
                        {(t.membersList || []).length} Members
                      </span>
                      <button 
                        onClick={() => handleDeleteTeam(t.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Team"
                      >
                        🗑️
                      </button>
                    </div>
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
                            <div>
                              <span className="font-bold text-slate-800 block">{m.name || m.email}</span>
                              {m.name && <span className="text-[10px] text-slate-400">{m.email}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] whitespace-nowrap ${m.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                                {m.status}
                              </span>
                              
                              {/* 🔴 Remove Member Cross Icon */}
                              {m.id && (
                                <button 
                                  onClick={() => handleRemoveMember(t.id, m.id)}
                                  className="text-red-400 hover:text-red-700 font-bold text-xs p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Remove Member"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Member Form */}
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