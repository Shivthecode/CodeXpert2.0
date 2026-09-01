import React, { useState } from 'react';

const NoticeBoard = ({ teams = [] }) => {
  // Sabhi teams ke andar se saare unique members nikalne ka logic
  const allMembers = [...new Set(teams.flatMap(t => t.membersList?.map(m => m.email) || []))];

  const [notices, setNotices] = useState([
    { 
      id: 1, 
      title: 'Server Maintenance', 
      date: 'Today', 
      content: 'Server will be down for 30 minutes tonight for urgent security patching.',
      audience: 'All',
      priority: 'Urgent'
    }
  ]);
  
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('All');
  const [priority, setPriority] = useState('Normal');

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    
    const newNotice = {
      id: Date.now(),
      title: newNoticeTitle,
      date: 'Just now',
      content: newNoticeContent,
      audience: targetAudience,
      priority: priority
    };

    // Naya notice hamesha list ke upar dikhega
    setNotices([newNotice, ...notices]);
    
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setPriority('Normal');
    setTargetAudience('All');
    alert('Notice published successfully!');
  };

  // Priority ke hisaab se badge color
  const getPriorityBadge = (level) => {
    if (level === 'Urgent') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Normal') return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div className="space-y-6">
      
      {/* 📢 PUBLISH NOTICE FORM */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
        <h3 className="text-xl font-bold text-slate-900 mb-2">📢 Publish Notice</h3>
        <p className="text-xs text-slate-500 mb-6">Send important updates to specific teams, members, or everyone.</p>
        
        <form onSubmit={handlePostNotice} className="space-y-4">
          
          {/* Title Row */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Notice Title</label>
            <input 
              type="text" 
              value={newNoticeTitle}
              onChange={(e) => setNewNoticeTitle(e.target.value)}
              placeholder="e.g. Code Freeze Tomorrow" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50"
              required
            />
          </div>

          {/* Select Audience & Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Target Audience Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Send To</label>
              <select 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
              >
                <option value="All">🌐 Everyone (All Teams)</option>
                
                {teams.length > 0 && (
                  <optgroup label="--- Specific Teams ---">
                    {teams.map(t => (
                      <option key={`team-${t.id}`} value={`Team: ${t.name}`}>👥 Team: {t.name}</option>
                    ))}
                  </optgroup>
                )}

                {allMembers.length > 0 && (
                  <optgroup label="--- Individual Members ---">
                    {allMembers.map((m, idx) => (
                      <option key={`member-${idx}`} value={`Member: ${m}`}>👤 Member: {m}</option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Priority Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Urgent">🔴 Urgent</option>
                <option value="Normal">🔵 Normal</option>
                <option value="Low">⚪ Low</option>
              </select>
            </div>

          </div>

          {/* Content Row */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Notice Details</label>
            <textarea 
              rows="3"
              value={newNoticeContent}
              onChange={(e) => setNewNoticeContent(e.target.value)}
              placeholder="Type the detailed message here..." 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 resize-none"
              required
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all">
            Publish Notice
          </button>
        </form>
      </div>

      {/* 📰 NOTICE BOARD FEED */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Notice Board Feed</h3>
        
        {notices.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-500 text-sm font-medium">No notices published yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map(n => (
              <div key={n.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative overflow-hidden">
                
                {/* Urgent Side Bar UI Indicator */}
                {n.priority === 'Urgent' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-lg">{n.title}</h4>
                  <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-lg">
                    {n.date}
                  </span>
                </div>
                
                {/* Notice Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadge(n.priority)}`}>
                    {n.priority}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                    To: {n.audience}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mt-2 p-3 bg-white rounded-xl border border-slate-100">
                  {n.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default NoticeBoard;