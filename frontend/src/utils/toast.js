// src/utils/toast.js
// This file provides a convenient way to show toasts
// Components should use the useToast hook from ToastContext instead

/**
 * Show a toast notification
 * @param {Object} options - Toast options
 * @param {string} options.message - The message to display
 * @param {string} [options.type='info'] - Toast type: 'info', 'success', 'error', 'spooky'
 * @param {number} [options.duration=3000] - Duration in milliseconds (0 for no auto-dismiss)
 * @returns {Object} Toast configuration
 */
export function createToastConfig(options) {
  if (typeof options === 'string') {
    return { message: options, type: 'info', duration: 3000 };
  }
  
  const { message, type = 'info', duration = 3000 } = options;
  return { message, type, duration };
}

// Themed error messages for API errors
export const themedErrorMessages = {
  network: 'Lost in the fog... check your connection',
  server: 'The backend spirits are restless... try again later',
  validation: 'The ritual requires all fields...',
  notFound: 'This task has vanished into the void',
  default: 'Something wicked happened... try again'
};

/**
 * Get a themed error message based on error type
 * @param {Error} error - The error object
 * @returns {string} Themed error message
 */
export function getThemedErrorMessage(error) {
  if (!error) return themedErrorMessages.default;
  
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return themedErrorMessages.network;
  }
  
  if (error.message?.includes('500') || error.message?.includes('server')) {
    return themedErrorMessages.server;
  }
  
  if (error.message?.includes('404')) {
    return themedErrorMessages.notFound;
  }
  
  if (error.message?.includes('validation') || error.message?.includes('required')) {
    return themedErrorMessages.validation;
  }
  
  return themedErrorMessages.default;
}
