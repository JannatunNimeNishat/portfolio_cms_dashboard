import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Hero from "../pages/Hero/Hero";
import About from "../pages/about/About";
import Skill from "../pages/Skill/Skill";
import Projects from "../pages/Projects/Projects";
import Education from "../pages/Education/Education";
import Experience from "../pages/Experience/Experience";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "hero", element: <Hero /> },
      { path: "about", element: <About /> },
      { path: "experience", element: <Experience /> },
      { path: "skill", element: <Skill /> },
      { path: "projects", element: <Projects /> },
      { path: "education", element: <Education /> },
    ],
  },
]);

export default router;
