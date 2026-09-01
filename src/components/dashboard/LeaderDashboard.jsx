import React, { useState } from 'react';

// Naye modular components import kar rahe hain
import MyTeams from './leader/MyTeams';
import TaskBoard from './leader/TaskBoard';
import WorkReport from './leader/WorkReport';
import NoticeBoard from './leader/NoticeBoard';

const LeaderDashboard = () => {
  const [activeTab, setActiveTab] = useState('teams'); // Default tab 'teams'

  // Global State Data
  const [teams, setTeams] = useState([]); // Khali array taaki default teams na dikhein

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix Navbar responsive bug', assignedTo: 'Shiv', status: 'todo' },
    { id: 2, title: 'Optimize Tailwind CSS builds', assignedTo: 'Rahul', status: 'in-progress' }
  ]);

  return (
    <div className="space-y-6">
      
      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'teams' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            My Teams
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'kanban' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Task Board (Kanban)
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'reports' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Work Report
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'notices' ? 'bg-[var(--color-zoom-blue)] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Notice Board
          </button>
        </div>
      </div>

      {/* RENDER DYNAMIC COMPONENTS (Tumhari alag files yahan load hongi) */}
      <div className="mt-6">
        {activeTab === 'teams' && <MyTeams teams={teams} setTeams={setTeams} />}
        {activeTab === 'kanban' && <TaskBoard tasks={tasks} setTasks={setTasks} teams={teams} />}
        {activeTab === 'reports' && <WorkReport tasks={tasks} />}
        {activeTab === 'notices' && <NoticeBoard teams={teams} />}
      </div>

    </div>
  );
};

export default LeaderDashboard;