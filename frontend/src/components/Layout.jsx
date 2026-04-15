import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout({ uid, studentName, onLogout, appContext, error }) {
  return (
    <div className="text-on-surface selection:bg-primary/30 bg-background h-screen overflow-hidden">
      <Sidebar uid={uid} studentName={studentName} onLogout={onLogout} />
      <TopBar studentName={studentName} />
      
      <main className="pl-64 pt-20 h-screen overflow-hidden">
        {error && <p className="text-error px-10 py-2">{error}</p>}
        <Outlet context={appContext} />
      </main>
    </div>
  );
}
