import React from 'react';

const Features = () => {
  const featureList = [
    {
      title: "Create Teams",
      description: "Form and organize project-specific teams with ease.",
      icon: "👥"
    },
    {
      title: "Work Together",
      description: "Collaborate with team members in real-time across tasks.",
      icon: "⚡"
    },
    {
      title: "Task Assignment",
      description: "Team leaders can assign tasks and monitor progress instantly.",
      icon: "📌"
    },
    {
      title: "Track Progress",
      description: "Employees view pending and completed tasks in one dashboard.",
      icon: "📊"
    },
    {
      title: "Project Insights",
      description: "See who assigned what and choose to accept or decline.",
      icon: "🔍"
    },
    {
      title: "Multi-Project Management",
      description: "Leaders can handle multiple teams and projects efficiently.",
      icon: "🏢"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-[var(--color-zoom-azure)]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] font-bold tracking-wider uppercase text-xs mb-5 border border-[var(--color-zoom-blue)]/20 shadow-sm">
            An AI that masters your codebase
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-zoom-blue)] to-[var(--color-zoom-azure)]">Team</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-light">
            Manage projects, collaborate effectively, and track team progress — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-zoom-blue)]/10 transition-all duration-500 overflow-hidden"
            >
              {/* Card Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-zoom-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Icon Box */}
                <div className="w-14 h-14 flex items-center justify-center text-3xl mb-6 bg-[var(--color-zoom-blue)]/10 text-[var(--color-zoom-blue)] rounded-2xl group-hover:scale-110 group-hover:bg-[var(--color-zoom-blue)] group-hover:text-white transition-all duration-500 shadow-sm">
                  {feature.icon}
                </div>
                
                {/* Text Content */}
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-zoom-blue)] transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
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