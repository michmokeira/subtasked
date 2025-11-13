// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-gray-100 border-r">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <div className="p-4 pb-20"> {/* bottom padding to avoid overlap with BottomNav */}
          <Outlet />
        </div>

        {/* Bottom nav for mobile */}
        {location.pathname !== '/' && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
