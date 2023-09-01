import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/ViewHeight";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AboutMe from "./pages/AboutMe/AboutMe";

const router = createBrowserRouter([
  {
    path: "/index.html",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <AboutMe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
  </React.StrictMode>
);