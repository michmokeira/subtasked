// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems } from '../utils/navItems';

export default function BottomNav() {
  return (
    <nav className="flex justify-around py-2 border-t border-deep-purple bg-jet-black">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-neon-orange' : 'text-muted-grey'
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
                <Icon className="w-5 h-5" />
              </motion.div>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
