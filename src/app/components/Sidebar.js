'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  FiBriefcase,
  FiDatabase,
  FiMenu,
  FiX,
  FiHome,
  FiClipboard,
  FiLayers,
  FiLogOut,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FiHome />,
      route: '/employer/dashboard',
    },
    {
      title: 'Candidate Database',
      icon: <FiDatabase />,
      route: '/employer/candidate-database',
    },
    {
      title: 'Post Job',
      icon: <FiClipboard />,
      route: '/employer/post-job',
    },
    {
      title: 'My Jobs',
      icon: <FiLayers />,
      route: '/employer/my-jobs',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div
      initial={{ width: isSidebarOpen ? 260 : 80 }}
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ duration: 0.3 }}
      className={`h-[100vh] fixed left-0 top-0 z-50 bg-gradient-to-b from-gray-50 to-gray-100 shadow-xl border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {isSidebarOpen && (
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Employer</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <button
              key={item.title}
              onClick={() => router.push(item.route)}
              className={`relative flex items-center w-full px-5 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span
                className={`text-lg ${
                  isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-800'
                }`}
              >
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="ml-4 text-sm">{item.title}</span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 h-full w-[4px] bg-blue-600 rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="absolute bottom-6 w-full px-5">
        <button
          className="flex items-center w-full px-3 py-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
        >
          <FiLogOut className="text-lg" />
          {isSidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
