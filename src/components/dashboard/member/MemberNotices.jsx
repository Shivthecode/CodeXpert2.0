import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // 🔴 Socket.io import kiya

const MemberNotices = () => {
  const [notices, setNotices] = useState([]);
  const [readNoticeIds, setReadNoticeIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Backend se notices fetch karna
  const fetchMemberNotices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/notices/all', {
        method: 'GET',
        headers: { 'auth-token': token }
      });

      const data = await response.json();
      if (response.ok) {
        setNotices(data);
      }
    } catch (error) {
      console.error("Error fetching member notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberNotices(); // Pehli baar load hone par fetch karega

    // 🔴 Socket connection setup
    const socket = io('http://localhost:5000');

    // 🔴 Backend se 'noticeUpdated' signal aate hi bina refresh kiye fetch karega
    socket.on('noticeUpdated', () => {
      fetchMemberNotices();
    });

    // Component unmount hone par connection close
    return () => socket.disconnect();
  }, []);

  const handleMarkAsRead = (id) => {
    setReadNoticeIds([...readNoticeIds, id]);
  };

  // Jo read nahi hue sirf wo dikhenge
  const visibleNotices = notices.filter(n => !readNoticeIds.includes(n._id));

  if (loading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Loading notices...</div>;
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Official Notice Board</h3>
          
          {/* 🔴 Naya Notice aane par header mein Red Alert Dot */}
          {visibleNotices.length > 0 && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </div>
        
        {visibleNotices.length > 0 && (
          <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {visibleNotices.length} New Notice{visibleNotices.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {visibleNotices.length === 0 ? (
        <div className="text-center py-8 sm:py-10 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-800 font-bold mb-1 text-sm sm:text-base">All Caught Up</p>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">You have no new notices to read.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleNotices.map(n => (
            <div key={n._id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative overflow-hidden transition-all duration-500">
              
              {n.priority === 'Urgent' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>}
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2">
                    {/* 🔴 Notice card ke title ke paas bhi flashing red alert dot */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-tight break-words">{n.title}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${n.priority === 'Urgent' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200'}`}>
                      {n.priority}
                    </span>
                    <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5 rounded-md">
                      By: {n.sender?.name || n.sender?.email || 'Leader'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleMarkAsRead(n._id)}
                  className="w-full sm:w-auto shrink-0 text-xs font-bold bg-white border border-slate-200 text-slate-600 px-4 py-2.5 sm:py-2 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Mark Read
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mt-2 p-3 sm:p-3.5 bg-white rounded-xl border border-slate-100 leading-relaxed break-words whitespace-pre-line">
                {n.message || n.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberNotices;