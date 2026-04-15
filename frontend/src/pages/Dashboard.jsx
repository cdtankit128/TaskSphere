import { useOutletContext } from "react-router-dom";
import { Grid, Box, Skeleton } from "@mui/material";

export default function Dashboard() {
  const { stats, progressPercent, consistencyData, consistencyStreak, uid, studentName, visibleTodos, handleToggle, loading, setFilter } = useOutletContext();

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-10 max-w-7xl mx-auto w-full">
         <Skeleton variant="rounded" width="100%" height={220} sx={{ borderRadius: "24px", bgcolor: "rgba(255,255,255,0.05)" }} />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto h-full flex flex-col gap-4 overflow-hidden box-border pb-6">
      {/* Welcome Section (Hero Bento Row) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 shrink-0 mt-3">
        <div className="md:col-span-8 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold font-headline tracking-tight text-on-surface">Welcome back, {studentName ? studentName.split(' ')[0] : 'Ankit'}!</h2>
          <p className="text-on-surface-variant text-sm mt-1 max-w-xl leading-relaxed">Your productivity is soaring this week. You've completed {progressPercent || 85}% of your targets so far.</p>
        </div>
        <div className="md:col-span-4 flex justify-end items-center">
          <div className="text-right">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">New Achievement</span>
            <p className="mt-2 font-headline font-bold text-on-surface text-sm lg:text-base">Consistent {consistencyStreak || 7}-Day Streak!</p>
          </div>
        </div>
      </section>

      {/* Summary Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
        {/* Efficiency Card */}
        <div className="surface-container-highest p-4 sm:p-5 rounded-xl relative overflow-hidden group flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant text-xs font-medium mb-1">Efficiency</p>
              <h3 className="text-2xl font-extrabold font-headline leading-tight">{progressPercent || 92}<span className="text-primary text-xl">%</span></h3>
            </div>
            <div className="relative w-12 h-12">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-variant" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (progressPercent || 92) / 100)} strokeWidth="4"></circle>
              </svg>
              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary text-base" data-icon="bolt">bolt</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-secondary font-bold uppercase tracking-wide">
            <span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
            +5% from yesterday
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="surface-container-highest p-4 sm:p-5 rounded-xl group flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant text-xs font-medium mb-1">Active Tasks</p>
              <h3 className="text-2xl font-extrabold font-headline leading-tight">{stats?.pending || 12}</h3>
            </div>
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-lg" data-icon="checklist">checklist</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-on-surface-variant font-medium uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-error rounded-full block"></span>
            {stats?.overdue || 3} Tasks due soon
          </div>
        </div>

        {/* Streak Card */}
        <div className="surface-container-highest p-4 sm:p-5 rounded-xl group relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant text-xs font-medium mb-1">Daily Streak</p>
              <h3 className="text-2xl font-extrabold font-headline leading-tight">{consistencyStreak || 24}<span className="text-tertiary text-lg"> days</span></h3>
            </div>
            <div className="w-10 h-10 bg-tertiary/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-lg" data-icon="local_fire_department">local_fire_department</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-on-surface-variant font-medium uppercase tracking-wide">
            Personal best: 28 days
          </div>
        </div>
      </section>

      {/* Middle Section: Tasks & Streak Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left: Active Tasks */}
        <div className="lg:col-span-8 flex flex-col gap-3 min-h-0">
          <div className="flex items-center justify-between shrink-0">
            <h4 className="text-lg font-headline font-bold text-on-surface">Active Tasks</h4>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold hover:bg-primary hover:text-on-primary transition-all duration-300">
              <span className="material-symbols-outlined text-[14px]" data-icon="add">add</span>
              Add Task
            </button>
          </div>

          <div className="flex-1 min-h-0 surface-container rounded-xl flex flex-col items-center justify-center p-6 text-center border border-dashed border-outline-variant/30 overflow-y-auto">
            <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mb-4 relative shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl opacity-40" data-icon="rocket_launch">rocket_launch</span>
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full shadow-[0_0_12px_rgba(186,158,255,0.4)] animate-pulse"></div>
            </div>
            <h5 className="text-xl font-headline font-bold text-on-surface mb-1">No active tasks found</h5>
            <p className="text-on-surface-variant max-w-xs text-xs mb-4 leading-relaxed">It looks like your slate is clean. This is the perfect moment to start your journey and conquer new goals!</p>
            <button className="px-6 py-2 text-sm rounded-lg bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold shadow-[0_0_32px_rgba(186,158,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
              Start your journey!
            </button>
          </div>
        </div>

        {/* Right: Productivity & Streak Widget */}
        <aside className="lg:col-span-4 min-h-0 flex flex-col">
          <div className="glass-card p-4 sm:p-5 rounded-xl shadow-[0_0_32px_0_rgba(186,158,255,0.08)] flex-1 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-headline font-bold text-on-surface">Streak Tracker</h4>
              <span className="text-[10px] font-bold text-on-surface-variant opacity-60">October 2023</span>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center mb-3">
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Mo</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Tu</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">We</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Th</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Fr</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Sa</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Su</span>
              
              {/* Row 1 dummy data */}
              <span className="text-[10px] text-on-surface-variant opacity-30">25</span>
              <span className="text-[10px] text-on-surface-variant opacity-30">26</span>
              <span className="text-[10px] text-on-surface-variant opacity-30">27</span>
              <span className="text-[10px] text-on-surface-variant opacity-30">28</span>
              <span className="text-[10px] text-on-surface-variant opacity-30">29</span>
              <span className="text-[10px] text-on-surface-variant opacity-30">30</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">1</span>
              {/* Row 2 dummy data */}
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">2</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">3</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">4</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">5</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">6</span>
              <span className="text-[10px] font-bold text-on-surface bg-primary/20 w-6 h-6 flex items-center justify-center rounded-md mx-auto border border-primary/40 shadow-[0_0_10px_rgba(186,158,255,0.2)]">7</span>
              <span className="text-[10px] font-bold text-on-surface-variant w-6 h-6 flex items-center justify-center mx-auto opacity-70">8</span>
            </div>

            <div className="space-y-3 pt-3 border-t border-outline-variant/10">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-medium text-on-surface-variant">Consistency</p>
                  <p className="text-[11px] font-bold text-secondary">98%</p>
                </div>
                <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full w-[98%] shadow-[0_0_12px_rgba(52,181,250,0.4)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-medium text-on-surface-variant">Focus Hours</p>
                  <p className="text-[11px] font-bold text-primary">34.5h</p>
                </div>
                <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[75%] shadow-[0_0_12px_rgba(186,158,255,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Visualizations: Charts Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0 h-44 lg:h-48">
        <div className="surface-container p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-base font-headline font-bold">Weekly Progress</h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wide text-on-surface-variant font-bold">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Tasks
              </span>
              <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wide text-on-surface-variant font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Focus
              </span>
            </div>
          </div>
          <div className="relative flex-1 flex items-end justify-between gap-3 mt-4">
            <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm relative group transition-all" style={{ height: "60%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">60</div>
            </div>
            <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm relative group transition-all" style={{ height: "45%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">45</div>
            </div>
            <div className="flex-1 bg-primary/60 hover:bg-primary/80 rounded-t-sm relative group transition-all" style={{ height: "85%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">85</div>
            </div>
            <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm relative group transition-all" style={{ height: "30%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">30</div>
            </div>
            <div className="flex-1 bg-primary/90 rounded-t-sm relative group shadow-[0_0_20px_rgba(186,158,255,0.3)] transition-all" style={{ height: "95%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">95</div>
            </div>
            <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm relative group transition-all" style={{ height: "50%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">50</div>
            </div>
            <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm relative group transition-all" style={{ height: "40%" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">40</div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="surface-container p-4 sm:p-5 rounded-xl flex flex-col justify-between">
          <h4 className="text-base font-headline font-bold mb-2">Task Distribution</h4>
          <div className="flex items-center gap-6 lg:gap-10 flex-1">
            <div className="relative w-28 h-28 lg:w-32 lg:h-32 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="transparent" r="16" stroke="#22262f" strokeWidth="4"></circle>
                <circle cx="18" cy="18" fill="transparent" r="16" stroke="#ba9eff" strokeDasharray="100" strokeDashoffset="60" strokeLinecap="round" strokeWidth="4"></circle>
                <circle cx="18" cy="18" fill="transparent" r="16" stroke="#34b5fa" strokeDasharray="25" strokeDashoffset="100" strokeLinecap="round" strokeWidth="4"></circle>
                <circle cx="18" cy="18" fill="transparent" r="16" stroke="#ffb148" strokeDasharray="15" strokeDashoffset="75" strokeLinecap="round" strokeWidth="4"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total</span>
                <span className="text-xl font-extrabold text-on-surface leading-none mt-1">{stats?.total || 42}</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Strategic</span>
                </div>
                <span className="text-xs font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Operational</span>
                </div>
                <span className="text-xs font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Personal</span>
                </div>
                <span className="text-xs font-bold">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Learning</span>
                </div>
                <span className="text-xs font-bold">20%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
