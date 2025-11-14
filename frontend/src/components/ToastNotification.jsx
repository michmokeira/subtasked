// src/components/ToastNotification.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, CheckCircle, XCircle, Info } from 'lucide-react';

export default function ToastNotification({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'spooky':
        return <Ghost className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'spooky':
        return 'bg-gradient-to-r from-deep-purple via-neon-orange to-deep-purple text-white shadow-[0_0_20px_rgba(255,123,0,0.5)]';
      case 'success':
        return 'bg-gradient-to-r from-green-900 to-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]';
      case 'error':
        return 'bg-gradient-to-r from-red-900 to-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      case 'info':
      default:
        return 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-[0_0_15px_rgba(107,114,128,0.4)]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg min-w-[300px] max-w-md ${getStyles()}`}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <XCircle className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
