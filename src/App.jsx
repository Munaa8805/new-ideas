import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="ideas/:ideaId/edit"
            element={
              <ProtectedRoute>
                <EditIdea />
              </ProtectedRoute>
            }
          />
          <Route path="ideas" element={<Ideas />} />
          <Route
            path="new-idea"
            element={
              <ProtectedRoute>
                <NewIdea />
              </ProtectedRoute>
            }
          />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
