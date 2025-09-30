import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <main className=" flex-1 p-5  mb-[2rem]">
       
        <Outlet />
      </main>
    </div>
  );
}
