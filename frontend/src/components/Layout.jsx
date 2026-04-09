import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout({ uid, onLogout, appContext, error }) {
  return (
    <Box className="workspace-layout">
      <Sidebar uid={uid} onLogout={onLogout} />

      <Box className="workspace-content">
        {error && <p className="error-text route-error">{error}</p>}
        <Outlet context={appContext} />
      </Box>
    </Box>
  );
}
