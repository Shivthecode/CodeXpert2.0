import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // 🔴 1. Socket.io import kiya

const TaskBoard = ({ teams = [] }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [assignedMemberId, setAssignedMemberId] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(true);

  const currentTeam = teams.find(t => t.id.toString() === selectedTeamId);
  const availableMembers = currentTeam ? currentTeam.membersList || [] : [];

  // 1. Tasks fetch karna
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/tasks/all', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Pehli baar fetch karega

    // 🔴 2. Socket connection setup for Leader
    const socket = io('http://localhost:5000');

    // 🔴 3. Signal aate hi Leader ka dashboard bina refresh kiye wapas data layega
    socket.on('taskUpdated', () => {
      fetchTasks();
    });

    // Cleanup function memory leak rokne ke liye
    return () => socket.disconnect();
  }, []);

  // 2. Leader dwara Task Assign karna
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle || !selectedTeamId || !assignedMemberId) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': token 
        },
        body: JSON.stringify({
          title: newTaskTitle,
          teamId: selectedTeamId,
          memberId: assignedMemberId,
          priority: priority
        })
      });

      const data = await response.json();
      if (response.ok) {
        fetchTasks();
        setNewTaskTitle('');
        alert('Task successfully assigned to member!');
      } else {
        alert(data.message || "Failed to assign task");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  // 3. Leader dwara task ko Approve karna (Review -> Completed)
  const handleApproveTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks/approve', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': token 
        },
        body: JSON.stringify({ taskId })
      });

      const data = await response.json();
      if (response.ok) {
        fetchTasks();
        alert(data.message);
      } else {
        alert(data.message || "Approval failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityBadge = (level) => {
    if (level === 'High') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
  };

  if (loading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* 📌 ASSIGN TASK FORM */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">📌 Assign New Task to Member</h3>
        
        {teams.length === 0 ? (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm font-semibold text-center">
            You haven't created any teams yet. Please go to "My Teams" to create a team and add members first.
          </div>
        ) : (
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title or details..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Select Team */}
              <select 
                value={selectedTeamId}
                onChange={(e) => {
                  setSelectedTeamId(e.target.value);
                  setAssignedMemberId(''); 
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
                value={assignedMemberId}
                onChange={(e) => setAssignedMemberId(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
                disabled={!selectedTeamId || availableMembers.length === 0}
                required
              >
                <option value="" disabled>
                  {availableMembers.length === 0 ? 'No members found' : 'Select Member'}
                </option>
                {availableMembers.map((m, idx) => (
                  <option key={idx} value={m.id}>{m.name || m.email}</option>
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
              <button type="submit" className="bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer">
                Assign Task
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 📋 LEADER VIEW: 2 COLUMNS (Review Section & Completed Works) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Review Section (Jahan members submit karenge) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-amber-600 text-sm uppercase tracking-wider border-b pb-2 flex justify-between items-center">
            <span>🔍 Review Section (Pending Approval)</span>
            <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md text-xs">
              {tasks.filter(t => t.status === 'in_review').length}
            </span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'in_review').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">No tasks waiting for review.</p>
            ) : (
              tasks.filter(t => t.status === 'in_review').map(task => (
                <div key={task._id} className="p-4 bg-amber-50/30 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                      {task.priority || 'Medium'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{task.team?.name}</span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                  <p className="text-[11px] text-amber-700 font-medium">Done by: {task.assignedTo?.name || task.assignedTo?.email}</p>
                  
                  {/* Approve Button */}
                  <button 
                    onClick={() => handleApproveTask(task._id)} 
                    className="w-full text-xs bg-emerald-50 text-emerald-700 font-bold py-2 rounded-lg hover:bg-emerald-100 transition-colors mt-2 cursor-pointer shadow-sm"
                  >
                    ✅ Approve & Move to Completed
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Completed Works (Approved tasks) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
          <h4 className="font-bold text-emerald-600 text-sm uppercase tracking-wider border-b pb-2 flex justify-between items-center">
            <span>✅ Completed Works</span>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-xs">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </h4>
          <div className="space-y-3 flex-grow">
            {tasks.filter(t => t.status === 'completed').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">No completed tasks yet.</p>
            ) : (
              tasks.filter(t => t.status === 'completed').map(task => (
                <div key={task._id} className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5 opacity-90">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority || 'Medium')}`}>
                      {task.priority || 'Medium'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded">Approved</span>
                  </div>
                  <p className="font-semibold text-emerald-900 text-sm line-through">{task.title}</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Completed by: {task.assignedTo?.name || task.assignedTo?.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskBoard;