import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Loader2 } from "lucide-react";
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

const Home = lazy(() => import("./pages/Home"));
const NewIdea = lazy(() => import("./pages/NewIdea"));
const Projects = lazy(() => import("./pages/Projects"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Ideas = lazy(() => import("./pages/Ideas"));
const EditIdea = lazy(() => import("./pages/EditIdea"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/not-found"));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center gap-3 text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" aria-hidden />
      <span className="font-medium">Loading…</span>
    </div>
  );
}

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
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </StrictMode>,
);
