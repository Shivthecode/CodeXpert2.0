import React, { useState } from 'react';

const WorkReport = ({ tasks }) => {
  const [selectedMember, setSelectedMember] = useState('All');

  // Tasks me se unique members ki list nikalna
  const teamMembers = [...new Set(tasks.map(t => t.assignedTo).filter(Boolean))];

  // Dropdown ke selection ke hisaab se tasks filter karna
  const displayTasks = selectedMember === 'All' 
    ? tasks 
    : tasks.filter(t => t.assignedTo === selectedMember);

  // Status Metrics Calculate karna
  const totalTasks = displayTasks.length;
  const completedTasks = displayTasks.filter(t => t.status === 'completed').length;
  const reviewTasks = displayTasks.filter(t => t.status === 'review').length;
  const inProgressTasks = displayTasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = displayTasks.filter(t => t.status === 'todo').length;

  // Priority Metrics Calculate karna (Agar priority set nahi hai toh default 'Medium' mane)
  const highPriority = displayTasks.filter(t => t.priority === 'High').length;
  const mediumPriority = displayTasks.filter(t => t.priority === 'Medium' || !t.priority).length; 
  const lowPriority = displayTasks.filter(t => t.priority === 'Low').length;

  // Bar Graph ke liye Percentage nikalne ka function
  const getPercent = (count) => {
    return totalTasks === 0 ? 0 : Math.round((count / totalTasks) * 100);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
      
      {/* 🔴 HEADER & FILTER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-slate-900">📊 Team Work Analytics</h3>
        
        {/* Member Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-500">Analyze Report For:</span>
          <select 
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 font-bold text-slate-700 cursor-pointer"
          >
            <option value="All">All Team Members</option>
            {teamMembers.map((member, idx) => (
              <option key={idx} value={member}>{member}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔴 TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Tasks</p>
          <h4 className="text-4xl font-extrabold text-slate-900 mt-2">{totalTasks}</h4>
          <p className="text-xs text-slate-400 mt-2">Overall assigned workload</p>
        </div>
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider">Completed Work</p>
          <h4 className="text-4xl font-extrabold text-emerald-700 mt-2">{completedTasks}</h4>
          <p className="text-xs text-emerald-500 mt-2">{getPercent(completedTasks)}% of total tasks</p>
        </div>
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-xs text-indigo-600 uppercase font-bold tracking-wider">Pending Reviews</p>
          <h4 className="text-4xl font-extrabold text-indigo-700 mt-2">{reviewTasks}</h4>
          <p className="text-xs text-indigo-500 mt-2">Awaiting leader's approval</p>
        </div>
      </div>

      {/* 🔴 VISUAL GRAPHS SECTION */}
      {totalTasks === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <p className="text-slate-500 font-medium">No tasks found for the selected member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. Task Progress Graph */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-white">
            <h4 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
              Task Status Breakdown
              <span className="text-xs font-normal text-slate-500">Based on {totalTasks} tasks</span>
            </h4>
            
            <div className="space-y-5">
              {/* Completed Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-emerald-600">✅ Completed ({completedTasks})</span>
                  <span className="text-slate-500">{getPercent(completedTasks)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(completedTasks)}%` }}></div>
                </div>
              </div>

              {/* Review Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-indigo-600">🔍 In Review ({reviewTasks})</span>
                  <span className="text-slate-500">{getPercent(reviewTasks)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(reviewTasks)}%` }}></div>
                </div>
              </div>

              {/* In Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-amber-600">⚡ In Progress ({inProgressTasks})</span>
                  <span className="text-slate-500">{getPercent(inProgressTasks)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(inProgressTasks)}%` }}></div>
                </div>
              </div>

              {/* Todo Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">📝 Todo ({todoTasks})</span>
                  <span className="text-slate-500">{getPercent(todoTasks)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-slate-400 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(todoTasks)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Priority Distribution Graph */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-white">
            <h4 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
              Workload by Priority
              <span className="text-xs font-normal text-slate-500">Distribution</span>
            </h4>
            
            <div className="space-y-5">
              {/* High Priority Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-red-600">🔴 High Priority ({highPriority})</span>
                  <span className="text-slate-500">{getPercent(highPriority)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(highPriority)}%` }}></div>
                </div>
              </div>

              {/* Medium Priority Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-amber-500">🟡 Medium Priority ({mediumPriority})</span>
                  <span className="text-slate-500">{getPercent(mediumPriority)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(mediumPriority)}%` }}></div>
                </div>
              </div>

              {/* Low Priority Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[var(--color-zoom-blue)]">🔵 Low Priority ({lowPriority})</span>
                  <span className="text-slate-500">{getPercent(lowPriority)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-[var(--color-zoom-blue)] h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${getPercent(lowPriority)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default WorkReport;