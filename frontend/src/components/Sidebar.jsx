// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { navItems } from '../utils/navItems';

export default function Sidebar() {
  return (
    <nav className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Subtasked</h2>
      <ul className="space-y-2">
        {navItems.map(({ label, path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition-all ${
                  isActive ? 'bg-gray-200 font-semibold' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
