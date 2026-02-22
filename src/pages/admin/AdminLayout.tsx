import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Phone,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { clearToken } from "@/core/api/client";
import { verifyAuth } from "@/core/api/auth";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects", end: false },
  { to: "/admin/services", icon: Wrench, label: "Services", end: false },
  { to: "/admin/contact", icon: Phone, label: "Contact Info", end: false },
  { to: "/admin/messages", icon: MessageSquare, label: "Messages", end: false },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyAuth()
      .then(() => setVerified(true))
      .catch(() => {
        clearToken();
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate("/admin/login");
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex">
      <aside className="w-64 bg-foreground text-primary-foreground flex flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-primary-foreground/10">
          <h1 className="font-display text-lg font-bold">GreenScape CMS</h1>
          <p className="text-xs text-primary-foreground/50 font-body mt-1">Content Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
