export default function TopBar({ studentName }) {
  const firstName = studentName ? (studentName.split(" ")[0].charAt(0).toUpperCase() + studentName.split(" ")[0].slice(1).toLowerCase()) : "Ankit";

  return (
    <header className="fixed top-0 right-0 left-64 h-20 z-40 bg-[#0b0e14]/60 backdrop-blur-xl flex justify-between items-center px-10">
      <div className="flex items-center gap-4">
        <div className="bg-surface-container rounded-xl px-4 py-2 flex items-center gap-3 w-80 outline outline-1 outline-outline-variant/15 focus-within:outline-primary/40 transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="search">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full outline-none" placeholder="Search tasks or files..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(186,158,255,0.6)]"></span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">
          <span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
        </button>
        <div className="flex items-center gap-3 ml-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface">{firstName}</p>
            <p className="text-[10px] text-on-surface-variant">Pro Plan</p>
          </div>
          <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" data-alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtnIs4upBUCm99rsFCaNwmHiT_aAuyTLIJWQ0Y5362kXDx2l45NxJk_Gu7Khyrf1NT25L4HwB4ofLln9EBZOdZTBxMqBlP1MIlAAa1uIwndzdUotLD_GqRO-WkkroztbQYCVncuDj0zx85jjNiQPZGzvlRTPujuSvJ3h2sm_SaZ5CDoe1Aw_yQyxCzMtGt7gau_C1eSKqBqvqdxWSOp29mkVEtx41WoJ01zg0sMg4jRXpawDTR9kDQAQR1-iBmhD8DGCAxQCMTlK2k" />
        </div>
      </div>
    </header>
  );
}