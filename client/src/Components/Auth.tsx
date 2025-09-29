import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

interface AuthProps {
  mode: string;
  onClose: () => void;
  onChange: (a: string) => void;
}

export default function Auth({ mode, onClose, onChange }: AuthProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const isLogin = mode === "login";
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    navigate("/dashboard");
    sessionStorage.setItem("isAuthenticated", "true");
  }
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
      <div className="w-[92vw] max-w-[560px] bg-white rounded-xl shadow-[0_10px_30px_rgba(2,6,23,0.25)] border border-slate-200 p-10">
        <button
          aria-label="Close"
          className="rounded-full px-2 py-[0.1rem] text-[30px] text-slate-700 cursor-pointer float-right"
          onClick={onClose}
        >
          ×
        </button>
        <img
          className="relative left-1/2 -translate-x-1/2 flex justify-center items-center w-20 h-20 rounded-full object-cover shadow-[0_0_3px_3px_#7F8CAA] mb-1.5"
          src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
          alt="logo"
        />

        <h2 className="text-center mb-2.5 text-[35px] font-extrabold pb-1 text-[#05221e] font-['Dancing Script',cursive]">
          {isLogin ? "Welcome Back" : "Create an account"}
        </h2>

        <p className="m-0 text-[15px] text-center mb-4 text-[#4e4c4c]">
          Access your contacts portal securely. Manage, organize, and search
          your network in one place.
        </p>

        <div className="grid grid-cols-2 gap-2 bg-gray-100 border border-gray-200 rounded-lg p-1 mb-3 text-center">
          <button
            type="button"
            className={`px-3 py-2 rounded-md cursor-pointer ${
              isLogin
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => onChange("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={`px-3 py-2 rounded-md cursor-pointer ${
              !isLogin
                ? "bg-gray-800 text-white"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => onChange("signup")}
          >
            Sign up
          </button>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="">
              <TextField
                id="name"
                fullWidth
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                required
              />
            </div>
          )}
          <div className="">
            <TextField
              id="email"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
            />
          </div>

          <div className="">
            <TextField
              id="password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={isLogin ? "Your password" : "Create a password"}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-1.5 w-full px-3.5 py-2.5 bg-[#393E46] border border-black text-white font-bold rounded-lg cursor-pointer hover:bg-[#2a2a2a]"
          >
            {isLogin ? "Log in" : "Create account"}
          </button>
          <a
            href="http://localhost:3000/auth/google"
            className="rounded-lg border px-4 py-2"
          >
            Continue with Google
          </a>

          <p className="mt-2.5 text-gray-500 text-center">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => onChange(isLogin ? "signup" : "login")}
              className="bg-transparent border-none text-black underline cursor-pointer"
            >
              {isLogin ? "Create Account" : "Log in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
