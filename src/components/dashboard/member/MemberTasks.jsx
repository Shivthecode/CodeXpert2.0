import React from 'react';

const MemberTasks = ({ tasks, updateTaskStatus }) => {
  // Priority Badge Color Logic
  const getPriorityBadge = (level) => {
    if (level === 'Urgent' || level === 'High') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
  };

  // 📊 Calculate Stats for the Top Section
  const pendingCount = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length;
  const reviewCount = tasks.filter(t => t.status === 'review').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      
      {/* 🔴 TOP STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Pending Work</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{pendingCount}</h3>
            <p className="text-xs text-slate-400 mt-1">To-do & In Progress</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            ⏳
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">In Review</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{reviewCount}</h3>
            <p className="text-xs text-slate-400 mt-1">Awaiting Leader Approval</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            🔍
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Completed</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{completedCount}</h3>
            <p className="text-xs text-slate-400 mt-1">Verified by Leader</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
            ✅
          </div>
        </div>
      </div>

      {/* 🔴 KANBAN BOARD SECTION */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">📋 Task Board</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Todo Column (with Rejected Feedback Support) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-slate-700 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between">
              <span>📝 To-Do</span>
              <span className="bg-slate-200 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'todo').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 relative">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <p className="font-bold text-slate-800 text-sm">{task.title}</p>
                
                {/* Agar Leader ne reject kiya hai toh yeh message dikhega */}
                {task.feedback && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-medium">
                    <span className="font-bold block mb-1">⚠️ Fix Required:</span> 
                    {task.feedback}
                  </div>
                )}
                
                <button 
                  onClick={() => updateTaskStatus(task.id, 'in-progress')} 
                  className="w-full text-xs bg-[var(--color-zoom-blue)] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Start Work
                </button>
              </div>
            ))}
          </div>

          {/* 2. In Progress (Working) Column */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-amber-600 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between">
              <span>⚡ Working</span>
              <span className="bg-amber-100 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'in-progress').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'in-progress').map(task => (
              <div key={task.id} className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm space-y-3">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <p className="font-bold text-slate-800 text-sm">{task.title}</p>
                <button 
                  onClick={() => updateTaskStatus(task.id, 'review')} 
                  className="w-full text-xs bg-amber-50 text-amber-700 border border-amber-200 font-bold py-2.5 rounded-lg hover:bg-amber-100 transition-colors shadow-sm"
                >
                  Submit for Review
                </button>
              </div>
            ))}
          </div>

          {/* 3. Review & Completed View */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-indigo-600 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between">
              <span>🔍 Review / Done</span>
              <span className="bg-indigo-100 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'review' || t.status === 'completed').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'review' || t.status === 'completed').map(task => (
              <div key={task.id} className={`p-4 bg-white rounded-xl border shadow-sm space-y-2 ${task.status === 'completed' ? 'border-emerald-200 bg-emerald-50/30' : 'border-indigo-200'}`}>
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                    {task.status === 'completed' ? '✅ Verified & Done' : '⏳ Pending Leader Approval'}
                  </span>
                </div>
                <p className={`font-bold text-sm mt-2 ${task.status === 'completed' ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800'}`}>
                  {task.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberTasks;