import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { getUser, clearUser } from "../../../../utils/auth";

function Header() {
  const navigate = useNavigate();
  const user = getUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 flex justify-between items-center h-16 sticky top-0 z-30 shadow-sm">

      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
          <HiMenu className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-[15px] font-semibold text-gray-800 tracking-tight">
          Super Admin Dashboard
        </h1>
      </div>
     
      {/* Right: Profile trigger */}
      <div className="relative" ref={dropdownRef}>

        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className={`flex items-center gap-2.5 px-3 h-10 rounded-xl border transition-all duration-150 ${
            profileOpen
              ? "bg-indigo-50 border-indigo-200"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
          }`}
        >
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
            {initials}
          </div>

          {/* Name + Role */}
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-gray-400 capitalize">
              {user?.role || "Admin"}
            </span>
          </div>

          {/* Chevron */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              profileOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/80 z-50 overflow-hidden transition-all duration-200 origin-top-right ${
            profileOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
        >
          {/* Profile info */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                {user?.email || ""}
              </p>
              <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 uppercase tracking-wide">
                {user?.role || "Admin"}
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {[
              {
                label: "My Profile",
                sub: "View & edit your details",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20v-1a6 6 0 0112 0v1" />
                  </svg>
                ),
              },
              {
                label: "Settings",
                sub: "Account preferences",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ),
              },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group text-left"
              >
                <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[12px] font-medium text-gray-700">{item.label}</p>
                  <p className="text-[10px] text-gray-400">{item.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="px-2 pb-2 pt-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors group text-left"
            >
              <span className="text-gray-400 group-hover:text-red-500 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              <span className="text-[12px] font-medium text-gray-600 group-hover:text-red-500 transition-colors">
                Sign out
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;