import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { sidebarItems } from "./Sub Components/SidebarItems";

export default function Sidebar(){
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const navigate=useNavigate();
  const toggleCollapse = () => setCollapsed(!collapsed);
  const handleClick = (index: number) => 
  {
 setActive(index);
 if(index==0){
navigate("/dashboard")
 }
 else if (index==1){
  navigate("/contact")

 }
 else{
navigate("/soon")
 }
  }
   
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/")

  };


    return(
        <>
         <div
      className={`sticky top-0 left-0 z-[1002] h-[690px] bg-#ffffff shadow-[0_4px_10px_rgba(0,0,0,0.25)] text-black-600 rounded-[15px] flex flex-col flex-shrink-0 overflow-hidden mr-3 mt-4 transition-all duration-300 ${
        collapsed ? "w-[78px] max-w-[78px] pt-3" : "w-[280px] max-w-[340px] pt-6 mb-2 ml-2"
      }`}
    >
    
      <button
        className="absolute top-1/2 right-0 w-7 h-16 rounded-full bg-[#6E8CFB] border  flex items-center justify-center text-white shadow-md cursor-pointer -translate-y-1/2 z-[1002]"
        onClick={toggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
      </button>

   
      <div className="flex justify-center items-center gap-4 px-3 mb-6">
        <img
          className="w-[55px] h-[55px] rounded-full object-cover object-center"
          src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
          alt="logo"
        />
        {!collapsed && <p className="text-black-600 text-[1.4rem] font-semibold">Contactly</p>}
      </div>

 
      <ul className="flex flex-col gap-[1.45rem] flex-1 px-4">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center text-black-600 gap-2 p-2  rounded cursor-pointer transition-colors duration-200 font-semibold ${
              active === index ? "bg-[#6E8CFB] text-white" : "text-black-800  hover:bg-[#6E8CFB] hover:text-white"
            } ${collapsed ? "justify-center" : "justify-start"}`}
            onClick={() => handleClick(index)}
          >
            {item.icon}{" "}
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>

      
      <div className="flex justify-center items-center mb-4 mt-auto px-2">
        <p
          className="flex items-center gap-1 cursor-pointer text-black-600 hover:font-semibold hover:text-black-800"
          onClick={handleLogout}
        >
          <LogoutIcon />
          {!collapsed && <span className="pl-1">Logout</span>}
        </p>
      </div>
    </div>
        
        </>
    )
}