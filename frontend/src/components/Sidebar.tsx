import React from "react";
import { Theme } from "../types";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  theme,
  onThemeToggle,
}) => {
  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__header">
        <button
          className="sidebar__hamburger"
          onClick={onToggle}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        {!collapsed && <span className="sidebar__brand">Sales Dashboard</span>}
      </div>

      {/* Nav items */}
      <nav className="sidebar__nav">
        <div className="sidebar__nav-item sidebar__nav-item--active">
          <span className="sidebar__nav-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </span>
          {!collapsed && <span>Sales Overview</span>}
        </div>
        <div className="sidebar__nav-item">
          <span className="sidebar__nav-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </span>
          {!collapsed && <span>Stores</span>}
        </div>
        <div className="sidebar__nav-item">
          <span className="sidebar__nav-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </span>
          {!collapsed && <span>Notifications</span>}
        </div>
        <div className="sidebar__nav-item">
          <span className="sidebar__nav-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
            </svg>
          </span>
          {!collapsed && <span>Settings</span>}
        </div>
        <button className="sidebar__theme-toggle" onClick={onThemeToggle}>
          <span className="sidebar__nav-icon">
            {theme === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </span>
          {!collapsed && (
            <span>{theme === "dark" ? "Dark Theme" : "Light Theme"}</span>
          )}
        </button>
      </nav>

      <div className="sidebar__footer"></div>
    </aside>
  );
};

export default Sidebar;
