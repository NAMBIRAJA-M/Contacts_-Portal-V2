import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

// CORS to allow your Vite dev server
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Sessions (MemoryStore fine for dev)
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/* ---------- Passport: Google ---------- */
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    callbackURL: "http://localhost:3000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const user = {
        id: profile.id,
        email: profile.emails?.[0]?.value || "",
        name:
          profile.displayName ||
          [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(" "),
        photo: profile.photos?.[0]?.value || "",
        provider: "google",
      };
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

/* ---------- Routes ---------- */
app.get("/", (_req, res) => res.send("hello"));

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "/" }),
  

   /*  const FRONTEND_REDIRECT = "http://localhost:5173/dashboard";

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body><script>
try {
  var data = ${JSON.stringify(JSON.stringify({
    isAuthenticated: true,
    user: {
      id: user.id, name: user.name, email: user.email, photo: user.photo, provider: user.provider
    }
  }))};
  data = JSON.parse(data);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(data.user));
  sessionStorage.setItem("isAuthenticated", "true");
  sessionStorage.setItem("user", JSON.stringify(data.user));
} catch (e) {}
window.location.replace("${FRONTEND_REDIRECT}");
</script></body></html>`);
  } */
);

app.get("/api/me", (req, res) => {
  if (req.isAuthenticated?.() && req.user) return res.json(req.user);
  console.log(user);
  res.status(401).json({ error: "unauthenticated" });
});

app.post("/auth/logout", (req, res) => {
  req.logout?.(() => {});
  req.session?.destroy?.(() => {});
  res.sendStatus(204); // ✅ respond
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
  console.log("Google callback URL:", "http://localhost:3000/auth/google/callback");
});
