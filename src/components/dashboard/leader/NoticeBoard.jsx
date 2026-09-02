import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // 🔴 1. Socket.io import kiya

const NoticeBoard = ({ teams = [] }) => {
  const [notices, setNotices] = useState([]);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [targetAudience, setTargetAudience] = useState('All');
  const [priority, setPriority] = useState('Normal');
  const [loading, setLoading] = useState(true);

  const allMembers = [...new Set(teams.flatMap(t => t.membersList?.map(m => m.email) || []))];

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/notices/all', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        setNotices(data);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(); // Pehli baar fetch karega

    // 🔴 2. Socket connection setup
    const socket = io('http://localhost:5000');

    // 🔴 3. Signal aate hi Leader ka notice feed bhi bina refresh kiye update ho jayega
    socket.on('noticeUpdated', () => {
      fetchNotices();
    });

    // Cleanup function memory leak rokne ke liye
    return () => socket.disconnect();
  }, []);

  const handlePostNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent || !selectedTeamId) {
      return alert("Please select a team and fill out all fields!");
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notices/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          title: newNoticeTitle,
          message: newNoticeContent,
          teamId: selectedTeamId,
          audience: targetAudience,
          priority: priority
        })
      });

      const data = await response.json();
      if (response.ok) {
        fetchNotices();
        setNewNoticeTitle('');
        setNewNoticeContent('');
        setSelectedTeamId('');
        setPriority('Normal');
        setTargetAudience('All');
        alert('Notice published successfully!');
      } else {
        alert(data.message || "Failed to publish notice");
      }
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  const getPriorityBadge = (level) => {
    if (level === 'Urgent') return 'bg-red-50 text-red-600 border-red-200';
    if (level === 'Normal') return 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  if (loading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Loading notice board...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
        <h3 className="text-xl font-bold text-slate-900 mb-2">📢 Publish Notice</h3>
        <p className="text-xs text-slate-500 mb-6">Send important updates to specific teams, members, or everyone.</p>
        
        <form onSubmit={handlePostNotice} className="space-y-4">
          
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Team Selection Dropdown (Required) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Select Team</label>
              <select 
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
                required
              >
                <option value="" disabled>Choose Team...</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Send To</label>
              <select 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none cursor-pointer"
              >
                <option value="All">🌐 Everyone</option>
                {allMembers.map((m, idx) => (
                  <option key={`member-${idx}`} value={`Member: ${m}`}>👤 {m}</option>
                ))}
              </select>
            </div>

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

          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all cursor-pointer">
            Publish Notice
          </button>
        </form>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Notice Board Feed</h3>
        
        {notices.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-500 text-sm font-medium">No notices published yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map(n => (
              <div key={n._id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative overflow-hidden">
                {n.priority === 'Urgent' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>}
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-lg">{n.title}</h4>
                  <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-lg">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadge(n.priority)}`}>
                    {n.priority}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-100 text-slate-600 border-slate-200">
                    Team: {n.team?.name || 'Workspace'}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mt-2 p-3 bg-white rounded-xl border border-slate-100 whitespace-pre-line">
                  {n.message || n.content}
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