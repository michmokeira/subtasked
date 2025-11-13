import { motion, AnimatePresence } from 'framer-motion';

/**
 * BatAnimation - Animated bat flying across the screen
 * Triggered when a new task is created
 */
export default function BatAnimation({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: '-100%', y: 0 }}
          animate={{ x: '100vw', y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 2, 
            ease: 'easeInOut'
          }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            top: '10%',
            left: 0,
            zIndex: 9998,
            pointerEvents: 'none'
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neon-orange"
          >
            <path
              d="M12 2C10.5 2 9.5 3 9 4C8.5 3 7.5 2 6 2C4 2 2 4 2 6C2 8 3 9 4 10L6 12L4 14C3 15 2 16 2 18C2 20 4 22 6 22C7.5 22 8.5 21 9 20C9.5 21 10.5 22 12 22C13.5 22 14.5 21 15 20C15.5 21 16.5 22 18 22C20 22 22 20 22 18C22 16 21 15 20 14L18 12L20 10C21 9 22 8 22 6C22 4 20 2 18 2C16.5 2 15.5 3 15 4C14.5 3 13.5 2 12 2Z"
              fill="currentColor"
              opacity="0.9"
            />
            <circle cx="10" cy="8" r="1" fill="#0a0a0a" />
            <circle cx="14" cy="8" r="1" fill="#0a0a0a" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
