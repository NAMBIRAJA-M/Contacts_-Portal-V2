import { useState, useRef, useEffect } from "react";
import Breadcrumb from "./Sub Components/Breadcrumb";
import SearchBar from "./Sub Components/SearchBar";
import Notifications from "./Sub Components/NotificationBadge";
import ProfileMenu from "./Sub Components/ProfileMenu";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./Sub Components/ThemeToggle";


export default function NavBar({user}:any) {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [notificationsCount, setNotificationsCount] = useState<number>(3);
  const navigate=useNavigate();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function handleLogout() {
    sessionStorage.setItem("isAuthenticated", "false");
      navigate("/");
  }
  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full h-14 bg-[#F4F9F9] mb-2 mt-[-0.5rem] rounded-lg px-3 sticky  z-50 shadow-md">
        <Breadcrumb />

        <div className="flex items-center gap-2 justify-end">
          <SearchBar />
          <div className="w-px h-10 bg-gray-400"></div>
          <ThemeToggle />
          <div className="w-px h-10 bg-gray-400"></div>
          <Notifications
            count={notificationsCount}
            onClear={() => setNotificationsCount(0)}
          />

          <div className="w-px h-10 bg-gray-400"></div>

          <ProfileMenu
            profileImage={user.profile}
            isOpen={isProfileOpen}
            toggleOpen={setIsProfileOpen}
            onLogout={handleLogout}
            goToProfile={() => {}}
            goToSettings={() => {}}
          />
        </div>
      </div>
    </>
  );
}
