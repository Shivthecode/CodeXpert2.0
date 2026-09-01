import React, { useState } from 'react';

// Yahan props mein 'teams' ko add kar diya gaya hai
const TaskBoard = ({ tasks, setTasks, teams = [] }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [assignedMember, setAssignedMember] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Jo team select hui hai, uske members nikalne ke liye
  const currentTeam = teams.find(t => t.id.toString() === selectedTeamId);
  const availableMembers = currentTeam ? currentTeam.membersList || [] : [];

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedTeamId || !assignedMember) return;
    
    setTasks([...tasks, { 
      id: Date.now(), 
      title: newTaskTitle, 
      teamName: currentTeam.name,
      assignedTo: assignedMember, 
      priority: priority,
      status: 'todo' 
    }]);
    
    setNewTaskTitle('');
    // Hum team aur member clear nahi kar rahe taaki lagatar multiple tasks assign kiye ja sakein
    alert('Task successfully assigned and added to Todo!');
  };

  const moveTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  // Priority ke hisaab se color set karne ka function
  const getPriorityBadge = (level) => {
    if (level === 'High') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
  };

  return (
    <div className="space-y-6">
      
      {/* 📌 ASSIGN TASK FORM */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">📌 Assign New Task</h3>
        
        {teams.length === 0 ? (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm font-semibold text-center">
            You haven't created any teams yet. Please go to "My Teams" to create a team and add members first.
          </div>
        ) : (
          <form onSubmit={handleCreateTask} className="space-y-4">
            {/* Task Title Row */}
            <div>
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task description or title..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50"
                required
              />
            </div>

            {/* Dropdowns Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Select Team */}
              <select 
                value={selectedTeamId}
                onChange={(e) => {
                  setSelectedTeamId(e.target.value);
                  setAssignedMember(''); // Team change hone par member reset
                }}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Team</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              {/* Select Member */}
              <select 
                value={assignedMember}
                onChange={(e) => setAssignedMember(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
                disabled={!selectedTeamId || availableMembers.length === 0}
                required
              >
                <option value="" disabled>
                  {availableMembers.length === 0 ? 'No members found' : 'Select Member'}
                </option>
                {availableMembers.map((m, idx) => (
                  <option key={idx} value={m.email}>{m.email}</option>
                ))}
              </select>

              {/* Select Priority */}
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer font-semibold"
              >
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🔵 Low Priority</option>
              </select>

              {/* Submit Button */}
              <button type="submit" className="bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all">
                Assign Task
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 📋 KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* 1. Todo Column */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider border-b pb-2 flex justify-between">
            <span>📝 Todo</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-xs">{tasks.filter(t => t.status === 'todo').length}</span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                <p className="text-[11px] text-slate-500 font-medium">To: {task.assignedTo}</p>
                <button onClick={() => moveTaskStatus(task.id, 'in-progress')} className="w-full text-xs bg-blue-50 text-[var(--color-zoom-blue)] font-bold py-1.5 rounded-lg hover:bg-blue-100 transition-colors mt-2">
                  Move to In Progress &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. In Progress Column */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-amber-600 text-sm uppercase tracking-wider border-b pb-2 flex justify-between">
            <span>⚡ In Progress</span>
            <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md text-xs">{tasks.filter(t => t.status === 'in-progress').length}</span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'in-progress').map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                <p className="text-[11px] text-slate-500 font-medium">To: {task.assignedTo}</p>
                <button onClick={() => moveTaskStatus(task.id, 'review')} className="w-full text-xs bg-amber-50 text-amber-700 font-bold py-1.5 rounded-lg hover:bg-amber-100 transition-colors mt-2">
                  Send to Review &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Review Column */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider border-b pb-2 flex justify-between">
            <span>🔍 Review</span>
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-xs">{tasks.filter(t => t.status === 'review').length}</span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'review').map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                <p className="text-[11px] text-slate-500 font-medium">By: {task.assignedTo}</p>
                <button onClick={() => moveTaskStatus(task.id, 'completed')} className="w-full text-xs bg-emerald-50 text-emerald-700 font-bold py-1.5 rounded-lg hover:bg-emerald-100 transition-colors mt-2">
                  Approve & Complete &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Completed Column */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-emerald-600 text-sm uppercase tracking-wider border-b pb-2 flex justify-between">
            <span>✅ Completed</span>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-xs">{tasks.filter(t => t.status === 'completed').length}</span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'completed').map(task => (
              <div key={task.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1 relative opacity-75">
                 <div className="flex justify-between items-start mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                    {task.priority || 'Medium'}
                  </span>
                </div>
                <p className="font-semibold text-emerald-900 text-sm line-through">{task.title}</p>
                <p className="text-[11px] text-emerald-600 font-medium">Done by: {task.assignedTo}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskBoard;