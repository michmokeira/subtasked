import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Clock, FileText, Sparkles } from 'lucide-react';

/**
 * AddTaskModal - Beautiful modal for creating new tasks
 * Features themed styling and form validation
 */
export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimated_minutes: '',
    goal_id: null
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'The ritual requires a title...';
    }
    if (formData.estimated_minutes && isNaN(formData.estimated_minutes)) {
      newErrors.estimated_minutes = 'Time must be a number...';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      ...formData,
      estimated_minutes: formData.estimated_minutes 
        ? parseInt(formData.estimated_minutes, 10) 
        : null
    };

    onSubmit(submitData);
    
    setFormData({
      title: '',
      description: '',
      estimated_minutes: '',
      goal_id: null
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      estimated_minutes: '',
      goal_id: null
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        {/* Backdrop with blur - click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="absolute inset-0 bg-jet-black/80"
          style={{ 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-gradient-to-br from-deep-purple via-jet-black to-deep-purple rounded-3xl border-2 border-neon-orange/60 shadow-[0_0_80px_rgba(255,123,0,0.5),0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Decorative glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-orange/20 via-deep-purple/20 to-neon-orange/20 rounded-3xl blur-xl opacity-50" />
          
          {/* Content */}
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-8 border-b border-neon-orange/20">
              <div className="flex items-center gap-3">
                <Sparkles className="text-neon-orange w-8 h-8" />
                <h2 className="text-4xl font-spooky text-neon-orange drop-shadow-[0_0_10px_rgba(255,123,0,0.5)]">
                  Summon New Task
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-3 rounded-xl bg-deep-purple/50 hover:bg-deep-purple/80 transition-all duration-200 text-muted-grey hover:text-neon-orange border border-deep-purple/50"
                aria-label="Close modal"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 py-8 space-y-8">
              {/* Title Field */}
              <div className="space-y-3">
                <label 
                  htmlFor="title" 
                  className="flex items-center gap-2 text-base font-body font-bold text-neon-orange"
                >
                  <FileText size={18} />
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg bg-jet-black/80 border-2 border-deep-purple/60 rounded-2xl text-white placeholder:text-muted-grey/50 focus:outline-none focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 transition-all duration-300 font-body shadow-inner"
                  placeholder="What needs to be done?"
                  autoFocus
                />
                {errors.title && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-sm font-body flex items-center gap-2"
                  >
                    ⚠️ {errors.title}
                  </motion.p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-3">
                <label 
                  htmlFor="description" 
                  className="flex items-center gap-2 text-base font-body font-bold text-neon-orange"
                >
                  <FileText size={18} />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-6 py-4 text-lg bg-jet-black/80 border-2 border-deep-purple/60 rounded-2xl text-white placeholder:text-muted-grey/50 focus:outline-none focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 transition-all duration-300 resize-none font-body shadow-inner"
                  placeholder="Add more details about this task..."
                />
              </div>

              {/* Estimated Time Field */}
              <div className="space-y-3">
                <label 
                  htmlFor="estimated_minutes" 
                  className="flex items-center gap-2 text-base font-body font-bold text-neon-orange"
                >
                  <Clock size={18} />
                  Estimated Time (minutes)
                </label>
                <input
                  type="number"
                  id="estimated_minutes"
                  name="estimated_minutes"
                  value={formData.estimated_minutes}
                  onChange={handleChange}
                  min="0"
                  step="5"
                  className="w-full px-6 py-4 text-lg bg-jet-black/80 border-2 border-deep-purple/60 rounded-2xl text-white placeholder:text-muted-grey/50 focus:outline-none focus:border-neon-orange focus:ring-4 focus:ring-neon-orange/20 transition-all duration-300 font-body shadow-inner"
                  placeholder="30"
                />
                {errors.estimated_minutes && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-sm font-body flex items-center gap-2"
                  >
                    ⚠️ {errors.estimated_minutes}
                  </motion.p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 text-lg bg-deep-purple/60 text-muted-grey rounded-2xl hover:bg-deep-purple/80 transition-all duration-200 font-body font-bold border-2 border-deep-purple/80 hover:border-deep-purple"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-neon-orange to-orange-600 text-jet-black rounded-2xl hover:shadow-[0_0_40px_rgba(255,123,0,0.8)] transition-all duration-200 font-body font-black flex items-center justify-center gap-3 border-2 border-neon-orange/50"
                >
                  <Plus size={24} strokeWidth={3} />
                  Create Task
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
