import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NewIdea from "./pages/NewIdea";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ideas from "./pages/Ideas";
import EditIdea from "./pages/EditIdea";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/not-found";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="ideas" element={<Ideas />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<ProjectDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="ideas/:ideaId/edit" element={<EditIdea />} />
        <Route path="new-idea" element={<NewIdea />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
