import { motion } from 'framer-motion';

/**
 * FogTransition - Page transition wrapper with fog and slide effects
 * Provides smooth transitions between routes
 */
export default function FogTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ 
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
}
