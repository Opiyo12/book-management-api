import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiMenu,
  HiChevronDown,
  HiChevronRight,
  HiUsers,
  HiHome,
  HiCog,
  HiShieldCheck,
  HiClipboardList
} from "react-icons/hi";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <div
      className={`h-screen shrink-0 overflow-y-auto bg-white text-gray-800 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-4">
        {sidebarOpen && <h1 className="text-xl font-bold">Super Admin</h1>}

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <HiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-3">

        {/* Overview */}
        <NavLink
          to="/super-admin"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-100"
        >
          <HiHome className="w-5 h-5" />
          {sidebarOpen && <span>Overview</span>}
        </NavLink>

        {/* Users Dropdown */}
        <button
          onClick={() => setUsersOpen(!usersOpen)}
          className="flex items-center justify-between w-full p-2 rounded hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <HiUsers className="w-5 h-5" />
            {sidebarOpen && <span>Users</span>}
          </div>

          {sidebarOpen &&
            (usersOpen ? (
              <HiChevronDown className="w-4 h-4" />
            ) : (
              <HiChevronRight className="w-4 h-4" />
            ))}
        </button>

        {/* Users Submenu */}
        {usersOpen && sidebarOpen && (
          <div className="ml-8 flex flex-col gap-1">
            <NavLink
              to="/super-admin/users"
              className="p-2 rounded hover:bg-blue-100"
            >
              All Users
            </NavLink>

            <NavLink
              to="/super-admin/users/add"
              className="p-2 rounded hover:bg-blue-100"
            >
              Add User
            </NavLink>

            <NavLink
              to="/super-admin/users/roles"
              className="p-2 rounded hover:bg-blue-100"
            >
              User Roles
            </NavLink>
          </div>
        )}

        {/* Roles */}
        <NavLink
          to="/super-admin/roles"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-100"
        >
          <HiShieldCheck className="w-5 h-5" />
          {sidebarOpen && <span>Roles</span>}
        </NavLink>

        {/* Logs */}
        <NavLink
          to="/super-admin/logs"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-100"
        >
          <HiClipboardList className="w-5 h-5" />
          {sidebarOpen && <span>System Logs</span>}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/super-admin/settings"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-100"
        >
          <HiCog className="w-5 h-5" />
          {sidebarOpen && <span>Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;