import React, { useState } from 'react';

const LeaderDashboard = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'AI Core Team', members: 4, project: 'CodeXpert Engine' },
    { id: 2, name: 'UI/UX Frontend', members: 3, project: 'Workspace Dashboard' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix Navbar responsive bug', assignedTo: 'Shiv', status: 'Pending Review' },
    { id: 2, title: 'Optimize Tailwind CSS builds', assignedTo: 'Rahul', status: 'Completed' }
  ]);

  const [newTeamName, setNewTeamName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [assignedMember, setAssignedMember] = useState('');

  // Handle Team Creation
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeamName) return;
    setTeams([...teams, { id: Date.now(), name: newTeamName, members: 1, project: 'New Initiative' }]);
    setNewTeamName('');
    alert('Team created successfully!');
  };

  // Handle Task Assignment
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !assignedMember) return;
    setTasks([...tasks, { id: Date.now(), title: newTaskTitle, assignedTo: assignedMember, status: 'Pending Review' }]);
    setNewTaskTitle('');
    setAssignedMember('');
    alert('Task assigned successfully!');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Active Teams</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{teams.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-[var(--color-zoom-blue)] rounded-xl flex items-center justify-center text-xl font-bold">
            👥
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Tasks Managed</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{tasks.length}</h3>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">
            📌
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Pending Approvals</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {tasks.filter(t => t.status === 'Pending Review').length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold">
            🔍
          </div>
        </div>
      </div>

      {/* Management Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Create New Team Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>➕</span> Create New Team
            </h3>
            <p className="text-sm text-slate-500 mb-6">Form specialized project teams and scale development.</p>
            
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Team Name</label>
                <input 
                  type="text" 
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Backend Security Squad" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-sm"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm"
              >
                Launch Team
              </button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Existing Teams</h4>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <span key={t.id} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-slate-200">
                  {t.name} ({t.members} members)
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Assign Tasks Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>📌</span> Assign Tasks & Work
            </h3>
            <p className="text-sm text-slate-500 mb-6">Distribute code modules and track workflow instantly.</p>
            
            <form onSubmit={handleAssignTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Task Title</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Fix authentication token bug" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Assign To Member</label>
                <input 
                  type="text" 
                  value={assignedMember}
                  onChange={(e) => setAssignedMember(e.target.value)}
                  placeholder="e.g. Shiv / Rahul" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-sm"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm"
              >
                Assign Task
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Project Insights & Submissions Review Table */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">📊 Code Submissions & Insights</h3>
        <p className="text-sm text-slate-500 mb-6">Review pending code submissions from team members and accept or decline.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Task Name</th>
                <th className="py-3 px-4">Assigned Member</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-800">{task.title}</td>
                  <td className="py-4 px-4 text-slate-600">{task.assignedTo}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      task.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button 
                      onClick={() => alert(`Accepted submission for: ${task.title}`)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => alert(`Declined submission for: ${task.title}`)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors border border-rose-200"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LeaderDashboard;