import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-6 px-4 sm:px-6 md:px-12 text-center text-sm text-slate-500 mt-auto shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} CodeXpert Workspace. All rights reserved.
        </p>
        <p className="font-bold text-slate-400 tracking-wider sm:tracking-widest uppercase text-[10px] sm:text-[11px]">
          designed by Shivansh Dwivedi
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;