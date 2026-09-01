import React, { useState } from 'react';

const MemberNotices = ({ notices }) => {
  const [readNoticeIds, setReadNoticeIds] = useState([]);

  const handleMarkAsRead = (id) => {
    setReadNoticeIds([...readNoticeIds, id]);
  };

  const visibleNotices = notices.filter(n => !readNoticeIds.includes(n.id));

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">Official Notice Board</h3>
        
        {visibleNotices.length > 0 && (
          <span className="bg-blue-100 text-[var(--color-zoom-blue)] text-xs font-bold px-3 py-1 rounded-full">
            {visibleNotices.length} New
          </span>
        )}
      </div>
      
      {visibleNotices.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-800 font-bold mb-1">All Caught Up</p>
          <p className="text-slate-500 text-sm font-medium">You have no new notices to read.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleNotices.map(n => (
            <div key={n.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative overflow-hidden transition-all duration-500">
              
              {n.priority === 'Urgent' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>}
              
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">{n.title}</h4>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${n.priority === 'Urgent' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-[var(--color-zoom-blue)] border-blue-200'}`}>
                      {n.priority}
                    </span>
                    <span className="text-[10px] font-bold bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
                      {n.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  className="shrink-0 text-xs font-bold bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm flex items-center gap-1.5"
                >
                  Mark Read
                </button>
              </div>

              <p className="text-sm text-slate-700 mt-2 p-3.5 bg-white rounded-xl border border-slate-100 leading-relaxed">
                {n.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberNotices;