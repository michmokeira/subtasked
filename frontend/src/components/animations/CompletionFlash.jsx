import { motion, AnimatePresence } from 'framer-motion';

/**
 * CompletionFlash - Full-screen flash animation for task completion
 * Displays a radial gradient flash with a spooky message
 */
export default function CompletionFlash({ show, onComplete }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 0.6, 
            times: [0, 0.5, 1],
            ease: 'easeInOut'
          }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(circle, #ff7b00, #1e0e2a)',
            pointerEvents: 'none',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-white text-2xl md:text-4xl font-spooky text-center px-4"
          >
            You've earned another day... for now.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
