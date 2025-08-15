'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FiBriefcase, FiDatabase, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FiBriefcase />,
      route: '/employer/dashboard',
    },
    {
      title: 'Database',
      icon: <FiDatabase />,
      route: '/employer/candidate-database',
    },
    {
      title: 'Job Post',
      icon: <FiBriefcase />,
      route: '/employer/post-job',
    },
    
    {
      title: 'My Jobs',
      icon: <FiBriefcase />,
      route: '/employer/my-jobs',
    },
  ];

  const toggleSidebar = () => {
    console.log('Toggling sidebar:', !isSidebarOpen); // Debug log
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-white shadow-lg ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 h-[80vh] mt-[120px] fixed top-0 left-0 z-50`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className={`text-xl font-bold text-gray-800 ${isSidebarOpen ? 'block' : 'hidden'}`}>
          Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => router.push(item.route)}
            className={`w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 ${
              pathname === item.route ? 'bg-gray-100 text-gray-900 font-semibold' : ''
            } mb-2`}
          >
            <span className="mr-3">{item.icon}</span>
            {isSidebarOpen && <span>{item.title}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;