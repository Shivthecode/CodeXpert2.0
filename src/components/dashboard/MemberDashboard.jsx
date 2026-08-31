import React, { useState } from 'react';

const MemberDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix Navbar responsive bug', assignedBy: 'Shiv (Leader)', status: 'Pending' },
    { id: 2, title: 'Build custom product showcase UI', assignedBy: 'Shiv (Leader)', status: 'In Progress' }
  ]);

  const [codeSnippet, setCodeSnippet] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  // Handle Mark as Completed
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
    ));
  };

  // Handle Code Submission
  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (!commitMessage || !codeSnippet) {
      alert('Please provide both a commit message and code snippet.');
      return;
    }
    alert(`Code submitted successfully for review!\nCommit: "${commitMessage}"`);
    setCommitMessage('');
    setCodeSnippet('');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Assigned Tasks</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{tasks.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-[var(--color-zoom-blue)] rounded-xl flex items-center justify-center text-xl font-bold">
            📋
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Completed Tasks</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {tasks.filter(t => t.status === 'Completed').length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold">
            ✅
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Pending Reviews</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {tasks.filter(t => t.status !== 'Completed').length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. My Assigned Tasks Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>📋</span> My Assigned Tasks
            </h3>
            <p className="text-sm text-slate-500 mb-6">View pending and completed tasks assigned by your team leader.</p>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Assigned by: {task.assignedBy}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      task.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {task.status}
                    </span>
                    <button 
                      onClick={() => handleToggleComplete(task.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                        task.status === 'Completed'
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-[var(--color-zoom-blue)] text-white hover:bg-[var(--color-zoom-azure)]'
                      }`}
                    >
                      {task.status === 'Completed' ? 'Mark Pending' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Code Submission Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>⚡</span> Submit Code for Review
            </h3>
            <p className="text-sm text-slate-500 mb-6">Send your updated code modules and logs directly to the team leader.</p>

            <form onSubmit={handleSubmitCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Commit Summary / Message</label>
                <input 
                  type="text" 
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="e.g. Added responsive layout fixes" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Code Snippet / Repository Link</label>
                <textarea 
                  rows="3"
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Paste git diff or GitHub branch link..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50 text-sm font-mono"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm"
              >
                Submit Code to Leader
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MemberDashboard;