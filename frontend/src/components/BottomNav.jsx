// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { navItems } from '../utils/navItems';

export default function BottomNav() {
  return (
    <nav className="flex justify-around py-2 border-t">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
