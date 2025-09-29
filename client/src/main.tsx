import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Contacts from "./Pages/Contact";
import ComingSoon from "./Pages/ComingSoon";
import ProtectedRoute from "./Components/ProtectedRoute";

const RootComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          ),
        },
        {
          path: "soon",
          element: (
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
