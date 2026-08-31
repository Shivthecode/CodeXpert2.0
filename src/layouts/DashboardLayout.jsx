import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import DashboardFooter from '../components/dashboard/DashboardFooter';

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <DashboardNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;