import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Trash2, CheckCircle2, Clock } from 'lucide-react';
import SubtaskItem from './SubtaskItem';
import { useTheme } from '../contexts/ThemeContext';

/**
 * TaskCard - Displays individual task with Halloween theming
 * Features:
 * - Haunted state styling (60% opacity, floating animation)
 * - Subtask rendering with focus level indicators
 * - Spirit release animation when all subtasks complete
 * - Hover effects (scale, shadow)
 * - Completion and delete actions
 */
const TaskCard = ({ task, onComplete, onDelete, isHaunted = false }) => {
  const { mode } = useTheme();
  const [showSpiritRelease, setShowSpiritRelease] = useState(false);
  const [allSubtasksComplete, setAllSubtasksComplete] = useState(false);

  const {
    id,
    title,
    description,
    is_completed,
    estimated_minutes,
    actual_minutes,
    subtasks = []
  } = task;

  // Check if all subtasks are complete
  useEffect(() => {
    if (subtasks.length > 0) {
      const allComplete = subtasks.every(st => st.is_completed);
      if (allComplete && !allSubtasksComplete) {
        // Trigger spirit release animation
        setShowSpiritRelease(true);
        setTimeout(() => setShowSpiritRelease(false), 1500);
      }
      setAllSubtasksComplete(allComplete);
    }
  }, [subtasks, allSubtasksComplete]);

  const handleComplete = () => {
    if (onComplete) {
      onComplete(id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSubtaskToggle = (subtaskId) => {
    // This will be handled by parent component
    // For now, just log it
    console.log('Subtask toggle:', subtaskId);
  };

  // Determine if animations should be enabled based on theme mode
  const animationsEnabled = mode === 'full-haunt';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isHaunted ? 0.6 : 1, 
        y: 0,
        ...(isHaunted && animationsEnabled ? {
          y: [0, -10, 0],
          transition: {
            y: {
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut'
            }
          }
        } : {})
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(255, 123, 0, 0.3)'
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative p-6 rounded-lg border-2
        bg-gradient-to-br from-jet-black/80 to-deep-purple/40
        border-deep-purple/50
        transition-all duration-300
        ${is_completed ? 'opacity-70' : ''}
        ${isHaunted ? 'border-purple-500/70' : ''}
      `}
    >
      {/* Haunted Indicator */}
      {isHaunted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 -right-3 bg-purple-900/90 rounded-full p-2 border-2 border-purple-500"
        >
          <Ghost className="w-5 h-5 text-purple-300" />
        </motion.div>
      )}

      {/* Spirit Release Animation */}
      <AnimatePresence>
        {showSpiritRelease && animationsEnabled && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ 
              opacity: 0, 
              y: -100, 
              scale: 1.5,
              rotate: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <Ghost className="w-16 h-16 text-neon-orange" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className={`
            text-xl font-semibold mb-2
            ${is_completed ? 'line-through text-muted-grey/60' : 'text-neon-orange'}
          `}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-grey/80 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            disabled={is_completed}
            className={`
              p-2 rounded-lg transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-neon-orange/50
              ${is_completed 
                ? 'bg-deep-purple/30 text-muted-grey/50 cursor-not-allowed' 
                : 'bg-deep-purple/50 text-neon-orange hover:bg-neon-orange/20 hover:shadow-[0_0_15px_rgba(255,123,0,0.5)]'
              }
            `}
            aria-label="Complete task"
          >
            <CheckCircle2 className="w-5 h-5" />
          </motion.button>

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
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Time Estimates */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-grey/70">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Est: {estimated_minutes || 0} min</span>
        </div>
        {actual_minutes !== null && actual_minutes !== undefined && (
          <div className="flex items-center gap-1">
            <span>Actual: {actual_minutes} min</span>
          </div>
        )}
      </div>

      {/* Subtasks */}
      {subtasks.length > 0 && (
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-deep-purple/30" />
            <span className="text-xs text-muted-grey/60 uppercase tracking-wider">
              Subtasks ({subtasks.filter(st => st.is_completed).length}/{subtasks.length})
            </span>
            <div className="h-px flex-1 bg-deep-purple/30" />
          </div>
          
          <AnimatePresence mode="popLayout">
            {subtasks.map((subtask) => (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onToggle={handleSubtaskToggle}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Completion Status Indicator */}
      {is_completed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-deep-purple/30"
        >
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Task completed</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;
