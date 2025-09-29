import { useState } from "react";
import Auth from "../Components/Auth";

function HomePage() {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("login");
  const handleClose = () => {
    setModal(false);
  };
  const handleChange=(Mode:string)=>{
    Mode==="login"?setMode("login"):setMode("signup")
  }
  return (
    <>
      <div className="bg-gray-900 h-screen">
        <div className="flex justify-start p-3">
          <div className="flex items-center gap-4">
            <img
              className="w-[55px] h-[55px] rounded-full"
              src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
              alt="logo"
            />
            <p className="text-[1.4rem] text-white">Contactly</p>
          </div>
        </div>
        <div className="relative top-[15%] left-[20%] w-[900px] flex flex-col justify-center items-center">
          <p className="text-white text-[55px] font-bold text-center m-0">
            The Next-Gen Contact Management App
          </p>

          <p className="text-white text-[20px] text-center">
            Revolutionize your communication game with Contactly - the ultimate
            solution for streamlined and organized contact management.
          </p>

          <div className="flex gap-8 mt-6">
            <button
              className="font-['Times_New_Roman'] w-[120px] h-[50px] px-4 py-2 text-[20px] rounded-[15px] cursor-pointer bg-[#0D92F4] text-white border-2 border-black hover:bg-[#006BFF]"
              onClick={() => {
                setModal(true);
                setMode("login");
              }}
            >
              Login
            </button>

            <button
              className="font-['Times_New_Roman'] w-[120px] h-[50px] px-4 py-2 text-[20px] rounded-[15px] cursor-pointer bg-[#213555] text-white hover:bg-[#3E5879]"
              onClick={() => {
                setModal(true);
                setMode("signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {modal && <Auth  mode={mode} onClose={handleClose} onChange={handleChange} />}
    </>
  );
}
export default HomePage;
