import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, LayoutDashboard, Home, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/ideas", icon: Lightbulb, label: "Ideas" },
    { to: "/projects", icon: LayoutDashboard, label: "Projects" },
    { to: "/new-idea", icon: Lightbulb, label: "New Idea" },
  ];

  return (
    <>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              {/* Hamburger Button */}
              <button 
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900">IdeaHub</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span className="hidden xs:inline">Register</span>
                <span className="xs:hidden">Join</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-gray-900">IdeaHub</span>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 p-4 rounded-2xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    onClick={toggleSidebar}
                    className="flex items-center gap-3 p-4 rounded-2xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Link>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                <Link
                  to="/register"
                  onClick={toggleSidebar}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                >
                  <UserPlus className="w-5 h-5" />
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

