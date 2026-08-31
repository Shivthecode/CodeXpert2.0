import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-6 px-6 text-center text-sm text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} CodeXpert Workspace. All rights reserved.
        </p>
        <p className="font-bold text-slate-400 tracking-widest uppercase text-[11px]">
          designed by codewebx
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;