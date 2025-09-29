import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRef, useEffect } from "react";

export default function ProfileMenu({ isOpen,profileImage,toggleOpen, onLogout, goToProfile, goToSettings }: any) {
  const profileRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        toggleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleOpen]);

  return (
    <div className="relative text-slate-900 dark:text-slate-100" ref={profileRef}>
      <button
        onClick={() => toggleOpen((p: boolean) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer hover:border hover:border-slate-300 dark:hover:border-slate-700"
      >
        <Avatar alt="avatar" src={profileImage} sx={{ width: 30, height: 30 }} />
        <span className="text-sm text-slate-900 dark:text-slate-100">You</span>
        <ArrowDropDownIcon className={`transition-transform text-slate-900 dark:text-slate-100 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-2 w-44 bg-white rounded-lg border border-slate-200 shadow-lg p-1 z-50 dark:bg-slate-800 dark:border-slate-700">
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" role="menuitem" onClick={goToProfile}>
            View Profile
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-700 dark:text-gray-200" role="menuitem" onClick={goToSettings}>
            Settings
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-600 dark:hover:bg-gray-700" role="menuitem" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
