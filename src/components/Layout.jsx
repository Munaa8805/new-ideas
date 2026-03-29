import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 min-h-[100vh]">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} IdeaHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
