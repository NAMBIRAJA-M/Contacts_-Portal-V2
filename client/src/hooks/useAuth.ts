import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  provider?: string;
} | null;

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/me", {
      credentials: "include", 
    })
      .then(async (res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { loading, user };
}
