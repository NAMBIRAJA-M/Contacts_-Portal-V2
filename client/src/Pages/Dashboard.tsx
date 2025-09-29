import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import WelcomeCard from "../Components/Sub Components/WelcomeCard";
import Overview from "../Components/Overview";
import Chart from "../Components/Sub Components/Charts";

type UserState = {
  id: string;
  name: string;
  email: string;
  profile: string;
};

async function fetchUser(): Promise<UserState | null> {
  const res = await fetch("http://localhost:3000/api/me", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as any;
  return {
    id: data.id ?? "",
    name: data.name ?? "",
    email: data.email ?? "",
    profile: data.photo ?? "",
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<UserState>({
    id: "",
    name: "",
    email: "",
    profile: "",
  });
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await fetchUser();
      if (!mounted) return;
      if (!u) {
        nav("/", { replace: true });
        return;
      }
      setUser(u);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [nav]);

  if (loading) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  return (
    <>
      <div className="mt-[1.5rem]">
        <NavBar user={user} />
        <div className="h-[690px]">
          <WelcomeCard user={user} />
          <Overview />
          <Chart />
        </div>
      </div>
    </>
  );
}
