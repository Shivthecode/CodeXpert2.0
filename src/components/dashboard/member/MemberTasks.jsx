import React, { useState, useEffect } from 'react';

const MemberTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Backend se member ke saare assigned tasks fetch karna
  const fetchMemberTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/tasks/all', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching member tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberTasks();
  }, []);

  // 2. Member dwara Task Status update karna (jaise 'in-progress' karna)
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks/update-progress', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': token 
        },
        body: JSON.stringify({ taskId, status: newStatus })
      });

      const data = await response.json();
      if (response.ok) {
        fetchMemberTasks();
      } else {
        alert(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  // 3. Member dwara task ko Review ke liye submit karna (status -> in_review)
  const handleSubmitForReview = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks/submit-review', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': token 
        },
        body: JSON.stringify({ taskId })
      });

      const data = await response.json();
      if (response.ok) {
        fetchMemberTasks();
        alert(data.message);
      } else {
        alert(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  // Priority Badge Color Logic
  const getPriorityBadge = (level) => {
    if (level === 'High') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
  };

  // 📊 Calculate Stats
  const pendingCount = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress').length;
  const reviewCount = tasks.filter(t => t.status === 'in_review').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  if (loading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Loading your tasks...</div>;
  }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      
      {/* 🔴 TOP STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">Pending Work</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{pendingCount}</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">To-Do & In-Progress</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm">
            ⏳
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">In Review</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{reviewCount}</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Awaiting Leader Approval</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm">
            🔍
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">Completed</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{completedCount}</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Verified & Approved</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm">
            ✅
          </div>
        </div>

      </div>

      {/* 🔴 KANBAN BOARD SECTION */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">📋 My Assigned Tasks</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. To-Do Column */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-slate-700 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between items-center">
              <span>📝 To-Do</span>
              <span className="bg-slate-200 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'todo').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'todo').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">No pending tasks.</p>
            ) : (
              tasks.filter(t => t.status === 'todo').map(task => (
                <div key={task._id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority)}`}>
                      {task.priority || 'Medium'} Priority
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{task.team?.name}</span>
                  </div>
                  
                  <p className="font-bold text-slate-800 text-xs sm:text-sm break-words">{task.title}</p>
                  
                  {/* Start Work Button -> Moves to In-Progress */}
                  <button 
                    onClick={() => handleUpdateStatus(task._id, 'in-progress')} 
                    className="w-full text-xs bg-[var(--color-zoom-blue)] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Start Work &rarr;
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 2. In-Progress (Working) Column */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-amber-600 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between items-center">
              <span>⚡ Working (In Progress)</span>
              <span className="bg-amber-100 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'in-progress').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'in-progress').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">No tasks in progress.</p>
            ) : (
              tasks.filter(t => t.status === 'in-progress').map(task => (
                <div key={task._id} className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority)}`}>
                      {task.priority || 'Medium'} Priority
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{task.team?.name}</span>
                  </div>
                  
                  <p className="font-bold text-slate-800 text-xs sm:text-sm break-words">{task.title}</p>
                  
                  {/* Submit for Review Button */}
                  <button 
                    onClick={() => handleSubmitForReview(task._id)} 
                    className="w-full text-xs bg-amber-50 text-amber-700 border border-amber-200 font-bold py-2.5 rounded-lg hover:bg-amber-100 transition-colors shadow-sm cursor-pointer"
                  >
                    Submit for Review &rarr;
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 3. Review & Completed Column */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
            <h4 className="font-bold text-indigo-600 text-sm uppercase border-b border-slate-200 pb-2 flex justify-between items-center">
              <span>🔍 Review / Done</span>
              <span className="bg-indigo-100 px-2 py-0.5 rounded text-xs">{tasks.filter(t => t.status === 'in_review' || t.status === 'completed').length}</span>
            </h4>
            
            {tasks.filter(t => t.status === 'in_review' || t.status === 'completed').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">No tasks in review or completed.</p>
            ) : (
              tasks.filter(t => t.status === 'in_review' || t.status === 'completed').map(task => (
                <div key={task._id} className={`p-4 bg-white rounded-xl border shadow-sm space-y-2 ${task.status === 'completed' ? 'border-emerald-200 bg-emerald-50/30' : 'border-indigo-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                      {task.status === 'completed' ? '✅ Verified & Done' : '⏳ Pending Leader Approval'}
                    </span>
                  </div>
                  <p className={`font-bold text-xs sm:text-sm mt-2 break-words ${task.status === 'completed' ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800'}`}>
                    {task.title}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberTasks;