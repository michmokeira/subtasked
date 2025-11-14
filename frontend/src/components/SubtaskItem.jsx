import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SubtaskItem = ({ subtask, onToggle }) => {
  const { id, title, is_completed, focus_level } = subtask;

  // Determine styling based on focus level
  const focusStyles = {
    deep: {
      checkboxGlow: 'shadow-[0_0_10px_rgba(147,51,234,0.6)]',
      checkboxBorder: 'border-purple-500',
      checkboxHover: 'hover:shadow-[0_0_15px_rgba(147,51,234,0.8)]',
      badgeBg: 'bg-purple-900/50',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/50'
    },
    shallow: {
      checkboxGlow: 'shadow-[0_0_10px_rgba(255,123,0,0.6)]',
      checkboxBorder: 'border-neon-orange',
      checkboxHover: 'hover:shadow-[0_0_15px_rgba(255,123,0,0.8)]',
      badgeBg: 'bg-orange-900/50',
      badgeText: 'text-neon-orange',
      badgeBorder: 'border-neon-orange/50'
    }
  };

  const styles = focusStyles[focus_level] || focusStyles.shallow;

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className={`
        flex items-center gap-3 p-3 rounded-lg
        bg-jet-black/30 border border-deep-purple/30
        transition-all duration-300
        hover:bg-jet-black/50 hover:border-deep-purple/50
        hover:scale-[1.02]
        ${is_completed ? 'opacity-60' : 'opacity-100'}
      `}
    >
      {/* Custom Checkbox */}
      <button
        onClick={handleToggle}
        className={`
          relative flex items-center justify-center
          w-6 h-6 rounded border-2
          transition-all duration-300
          ${is_completed ? 'bg-deep-purple/50' : 'bg-transparent'}
          ${styles.checkboxBorder}
          ${!is_completed && styles.checkboxGlow}
          ${!is_completed && styles.checkboxHover}
          focus:outline-none focus:ring-2 focus:ring-neon-orange/50
        `}
        aria-label={`Toggle subtask: ${title}`}
      >
        {is_completed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20 
            }}
          >
            <Check className="w-4 h-4 text-neon-orange" strokeWidth={3} />
          </motion.div>
        )}
      </button>

      {/* Subtask Title */}
      <span
        className={`
          flex-1 text-sm
          transition-all duration-300
          ${is_completed 
            ? 'line-through text-muted-grey/60' 
            : 'text-muted-grey'
          }
        `}
      >
        {title}
      </span>

      {/* Focus Level Badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`
          px-2 py-1 rounded-full text-xs font-medium
          border transition-all duration-300
          ${styles.badgeBg}
          ${styles.badgeText}
          ${styles.badgeBorder}
        `}
      >
        {focus_level === 'deep' ? '🧠 Deep' : '⚡ Shallow'}
      </motion.span>
    </motion.div>
  );
};

export default SubtaskItem;
