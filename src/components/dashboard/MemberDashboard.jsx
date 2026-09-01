import React, { useState } from 'react';

// Naye modular components import kar rahe hain
import MemberTeam from './member/MemberTeam';
import MemberTasks from './member/MemberTasks';
import MemberNotices from './member/MemberNotices';

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks'); // Default tasks tab

  // --- MOCK DATA ---
  const [teamData] = useState({
    name: 'CodeXpert Core Squad',
    membersList: [
      { email: 'leader@codexpert.com', role: 'Team Leader' },
      { email: 'me@developer.com', role: 'Member (You)' }
    ]
  });

  const [notices] = useState([
    { id: 1, title: 'Code Freeze Tomorrow', date: 'Just now', content: 'Please push all your code before EOD.', priority: 'Urgent' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 101, title: 'Build Header Component', priority: 'High', status: 'todo' },
    { id: 102, title: 'Fix Login Bug', priority: 'Urgent', status: 'todo', feedback: 'Login is crashing on Safari. Please check the token logic again.' },
    { id: 103, title: 'Setup Tailwind Colors', priority: 'Medium', status: 'in-progress' },
    { id: 104, title: 'Footer UI', priority: 'Low', status: 'review' }
  ]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedTask = { ...t, status: newStatus };
        if (newStatus === 'in-progress' && t.feedback) {
          delete updatedTask.feedback;
        }
        return updatedTask;
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'team' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          👥 My Team
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'tasks' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          📋 Assigned Tasks
        </button>
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'notices' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          📢 Notice Board
        </button>
      </div>

      {/* Tab Components Load */}
      <div className="mt-6">
        {activeTab === 'team' && <MemberTeam team={teamData} />}
        {activeTab === 'tasks' && <MemberTasks tasks={tasks} updateTaskStatus={updateTaskStatus} />}
        {activeTab === 'notices' && <MemberNotices notices={notices} />}
      </div>

    </div>
  );
};

export default MemberDashboard;