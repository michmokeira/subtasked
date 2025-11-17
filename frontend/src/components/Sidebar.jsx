// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems } from '../utils/navItems';

export default function Sidebar() {
  return (
    <nav className="flex flex-col h-screen p-4">
      <h2 className="text-2xl font-creepster mb-8 text-neon-orange text-center">
        Subtasked: Night Shift
      </h2>
      <ul className="flex flex-col justify-between flex-1" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {navItems.map(({ label, path, icon: Icon }) => (
          <li key={path} style={{ listStyle: 'none' }}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-4 py-3 rounded-md transition-all ${
                  isActive 
                    ? 'bg-deep-purple text-neon-orange font-semibold' 
                    : 'text-muted-grey hover:text-neon-orange'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{
                      filter: [
                        'drop-shadow(0 0 5px #ff7b00)',
                        'drop-shadow(0 0 20px #ff7b00)',
                        'drop-shadow(0 0 5px #ff7b00)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                  </motion.div>
                  <span className="text-xs">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
