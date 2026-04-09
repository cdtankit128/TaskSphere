import { useOutletContext } from "react-router-dom";

export default function Settings() {
  const { uid, handleLogout } = useOutletContext();

  return (
    <section className="page-grid">
      <div className="surface-card page-title">
        <p className="tag">Profile</p>
        <h1>Settings</h1>
        <p>Manage session identity and account context.</p>
      </div>

      <section className="surface-card settings-card">
        <h3>Current UID</h3>
        <p className="settings-uid">{uid}</p>
        <div className="settings-actions">
          <button type="button" className="ghost" onClick={handleLogout}>
            Switch UID
          </button>
          <button type="button" className="remove" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </section>
  );
}
