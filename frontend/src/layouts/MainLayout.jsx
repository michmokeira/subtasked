// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MobileBottomNav from '../components/MobileBottomNav';
import ToastContainer from '../components/ToastContainer';
import FogTransition from '../components/animations/FogTransition';

export default function MainLayout() {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Main layout container */}
      <div 
        className="flex flex-row bg-gradient-to-br from-jet-black to-deep-purple"
        style={{
          minHeight: '100vh',
          height: isDesktop ? '100vh' : 'auto'
        }}
      >
        {/* Sidebar for desktop - fixed, no scroll */}
        {isDesktop && (
          <aside 
            className="w-64 bg-jet-black border-r border-deep-purple/30"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            <Sidebar />
          </aside>
        )}

        {/* Main content area */}
        <div 
          className="flex-1"
          style={{
            marginLeft: isDesktop ? '256px' : '0',
            paddingBottom: isDesktop ? '0' : '80px',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            overflowY: isDesktop ? 'auto' : 'visible',
            height: isDesktop ? '100vh' : 'auto'
          }}
        >
          <div 
            className="p-4 md:p-6 lg:p-8"
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden'
            }}
          >
            <FogTransition key={location.pathname}>
              <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                <Outlet />
              </div>
            </FogTransition>
          </div>
        </div>

        {/* Toast notifications */}
        <ToastContainer />
      </div>
      
      {/* Bottom nav for mobile - rendered via portal to body */}
      {!isDesktop && <MobileBottomNav />}
    </>
  );
}
