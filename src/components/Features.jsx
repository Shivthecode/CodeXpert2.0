import React from 'react';

const Features = () => {
  const featureList = [
    {
      title: "Create Teams",
      description: "Form and organize project-specific teams with ease.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Work Together",
      description: "Collaborate with team members in real-time across tasks.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Task Assignment",
      description: "Team leaders can assign tasks and monitor progress instantly.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Track Progress",
      description: "Employees view pending and completed tasks in one dashboard.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Project Insights",
      description: "See who assigned what and choose to accept or decline.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Multi-Project Management",
      description: "Leaders can handle multiple teams and projects efficiently.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-[var(--color-zoom-azure)]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] font-bold tracking-wider uppercase text-xs mb-4 sm:mb-5 border border-[var(--color-zoom-blue)]/20 shadow-sm">
            An AI that masters your codebase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-zoom-blue)] to-[var(--color-zoom-azure)]">Team</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light px-2 sm:px-0">
            Manage projects, collaborate effectively, and track team progress — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-6 sm:p-8 rounded-3xl border-l-[5px] border-l-[var(--color-zoom-blue)] border-t border-r border-b border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-zoom-blue)]/15 transition-all duration-500 overflow-hidden"
            >
              {/* Card Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-zoom-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Icon Box */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-5 sm:mb-6 bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] rounded-2xl group-hover:scale-110 group-hover:bg-[var(--color-zoom-blue)] group-hover:text-white transition-all duration-500 shadow-sm">
                  {feature.icon}
                </div>
                
                {/* Text Content */}
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-[var(--color-zoom-blue)] transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;