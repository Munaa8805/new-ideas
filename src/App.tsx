/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NewIdea from './pages/NewIdea';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Register from './pages/Register';
import Ideas from './pages/Ideas';
import ProjectDetails from './pages/ProjectDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="new-idea" element={<NewIdea />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

