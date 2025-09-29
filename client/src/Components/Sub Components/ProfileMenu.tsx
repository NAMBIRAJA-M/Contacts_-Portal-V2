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
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => toggleOpen((p: boolean) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer profile-button"
      >
        <Avatar alt="avatar" src={profileImage} sx={{ width: 30, height: 30 }} />
        <span className="text-sm profile-button-text">You</span>
        <ArrowDropDownIcon className={`transition-transform profile-button-icon ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 mt-2 w-44 profile-menu rounded-lg border shadow-lg p-1 z-50">
          <button className="w-full text-left px-3 py-2 rounded-md profile-menu-item" role="menuitem" onClick={goToProfile}>
            View Profile
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md profile-menu-item" role="menuitem" onClick={goToSettings}>
            Settings
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md profile-menu-item text-red-600" role="menuitem" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
