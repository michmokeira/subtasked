import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * GoalCard - Displays individual goal with Halloween candle theming
 * Features:
 * - Candle icon with flicker animation
 * - Candle burn-out animation on completion
 * - Hover glow intensity increase
 * - Candle lighting animation on creation
 * - Goal title, description, and deadline display
 */
const GoalCard = ({ goal, onComplete, onDelete, isNew = false }) => {
  const { mode } = useTheme();
  const [showBurnOut, setShowBurnOut] = useState(false);
  const [isLighting, setIsLighting] = useState(isNew);

  const {
    id,
    title,
    description,
    deadline,
    is_completed = false
  } = goal;

  // Handle lighting animation on creation
  useEffect(() => {
    if (isNew) {
      setIsLighting(true);
      const timer = setTimeout(() => setIsLighting(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const handleComplete = () => {
    if (onComplete && !is_completed) {
      // Trigger burn-out animation
      setShowBurnOut(true);
      setTimeout(() => {
        onComplete(id);
      }, 1000);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  // Format deadline for display
  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Determine if animations should be enabled based on theme mode
  const animationsEnabled = mode === 'full-haunt';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: showBurnOut ? 0 : 1, 
        scale: showBurnOut ? 0.8 : 1 
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 15px 40px rgba(255, 123, 0, 0.4)'
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative p-6 rounded-lg border-2
        bg-gradient-to-br from-jet-black/80 to-deep-purple/40
        border-deep-purple/50
        transition-all duration-300
        ${is_completed ? 'opacity-60' : ''}
      `}
    >
      {/* Candle Icon with Flicker Animation */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="relative">
          {/* Candle Body */}
          <motion.div
            animate={
              isLighting
                ? {
                    opacity: [0, 1],
                    scale: [0.8, 1.1, 1]
                  }
                : {}
            }
            transition={{ duration: 1.5 }}
            className="relative"
          >
            {/* Candle Flame */}
            <AnimatePresence>
              {!is_completed && !showBurnOut && (
                <motion.div
                  initial={isLighting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  animate={
                    isLighting
                      ? {
                          opacity: [0, 0, 1],
                          scale: [0, 0, 1, 1.2, 1],
                          y: [0, -5, 0]
                        }
                      : animationsEnabled
                      ? {
                          opacity: [1, 0.8, 1, 0.9, 1],
                          scale: [1, 1.1, 0.95, 1.05, 1],
                          y: [0, -2, 0, -1, 0]
                        }
                      : { opacity: 1, scale: 1 }
                  }
                  exit={{
                    opacity: 0,
                    scale: 0,
                    y: -20,
                    transition: { duration: 1 }
                  }}
                  transition={
                    isLighting
                      ? { duration: 1.5, times: [0, 0.3, 0.6, 0.8, 1] }
                      : {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }
                  }
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                >
                  {/* Flame glow */}
                  <div className="absolute inset-0 blur-md bg-neon-orange/60 rounded-full w-6 h-8" />
                  {/* Flame shape */}
                  <svg
                    width="24"
                    height="32"
                    viewBox="0 0 24 32"
                    className="relative z-10"
                  >
                    <path
                      d="M12 0 C12 0, 4 8, 4 16 C4 22, 7.5 28, 12 28 C16.5 28, 20 22, 20 16 C20 8, 12 0, 12 0 Z"
                      fill="url(#flameGradient)"
                    />
                    <defs>
                      <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffeb3b" />
                        <stop offset="50%" stopColor="#ff7b00" />
                        <stop offset="100%" stopColor="#ff5722" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle SVG */}
            <svg
              width="48"
              height="64"
              viewBox="0 0 48 64"
              className={`${is_completed || showBurnOut ? 'opacity-40' : ''}`}
            >
              {/* Candle body */}
              <rect
                x="14"
                y="16"
                width="20"
                height="48"
                rx="2"
                fill="url(#candleGradient)"
              />
              {/* Wick */}
              <line
                x1="24"
                y1="16"
                x2="24"
                y2="10"
                stroke="#2c1810"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Wax drips */}
              <path
                d="M 18 20 Q 16 24, 18 28"
                fill="none"
                stroke="rgba(139, 69, 19, 0.3)"
                strokeWidth="1.5"
              />
              <path
                d="M 30 24 Q 32 28, 30 32"
                fill="none"
                stroke="rgba(139, 69, 19, 0.3)"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b4513" />
                  <stop offset="100%" stopColor="#5c2e0a" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="
              p-2 rounded-lg transition-all duration-300
              bg-deep-purple/50 text-red-400
              hover:bg-red-900/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]
              focus:outline-none focus:ring-2 focus:ring-red-500/50
            "
            aria-label="Delete goal"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Goal Content */}
      <div className="space-y-3">
        <h3 className={`
          text-xl font-semibold
          ${is_completed ? 'line-through text-muted-grey/60' : 'text-neon-orange'}
        `}>
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-grey/80 leading-relaxed">
            {description}
          </p>
        )}

        {deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-grey/70">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {formatDeadline(deadline)}</span>
          </div>
        )}
      </div>

      {/* Complete Button */}
      {!is_completed && (
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 0 20px rgba(255, 123, 0, 0.6)'
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          className="
            mt-4 w-full py-2 px-4 rounded-lg
            bg-gradient-to-r from-neon-orange/20 to-deep-purple/40
            border border-neon-orange/50
            text-neon-orange font-medium
            hover:from-neon-orange/30 hover:to-deep-purple/50
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-neon-orange/50
          "
        >
          Extinguish Candle
        </motion.button>
      )}

      {/* Completion Status */}
      {is_completed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-deep-purple/30"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-grey/60">
            <span>🕯️ Candle extinguished</span>
          </div>
        </motion.div>
      )}

      {/* Burn-out overlay effect */}
      <AnimatePresence>
        {showBurnOut && animationsEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-jet-black via-deep-purple/50 to-transparent rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GoalCard;
