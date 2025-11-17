// src/components/MobileBottomNav.jsx
import { createPortal } from 'react-dom';
import BottomNav from './BottomNav';

export default function MobileBottomNav() {
  const portalDiv = (
    <div 
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        borderTop: '1px solid rgba(30, 14, 42, 0.5)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <BottomNav />
    </div>
  );
  
  return createPortal(portalDiv, document.body);
}
