import { motion } from 'framer-motion';

/**
 * GhostDrift - Animation wrapper for task deletion
 * Creates a ghost drifting away and fading out effect
 */
export default function GhostDrift({ children, onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -100 }}
      transition={{ 
        duration: 1.5, 
        ease: 'easeOut'
      }}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  );
}
