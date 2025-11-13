// Base API client configuration and fetch wrapper
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Themed error messages for API failures
 */
const ERROR_MESSAGES = {
  NETWORK: 'Lost in the fog... check your connection',
  SERVER: 'The backend spirits are restless... try again later',
  NOT_FOUND: 'This has vanished into the void',
  VALIDATION: 'The ritual requires all fields...',
  DEFAULT: 'Something wicked happened... try again'
};

/**
 * Get themed error message based on error type
 */
function getThemedErrorMessage(error, status) {
  if (!navigator.onLine) {
    return ERROR_MESSAGES.NETWORK;
  }
  
  if (status === 404) {
    return ERROR_MESSAGES.NOT_FOUND;
  }
  
  if (status === 400 || status === 422) {
    return ERROR_MESSAGES.VALIDATION;
  }
  
  if (status >= 500) {
    return ERROR_MESSAGES.SERVER;
  }
  
  return error.message || ERROR_MESSAGES.DEFAULT;
}

/**
 * Base API client with fetch wrapper methods
 */
const apiClient = {
  /**
   * GET request
   */
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        const errorMessage = getThemedErrorMessage(
          new Error(`GET ${endpoint} failed`),
          response.status
        );
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK);
      }
      throw error;
    }
  },

  /**
   * POST request
   */
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorMessage = getThemedErrorMessage(
          new Error(`POST ${endpoint} failed`),
          response.status
        );
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK);
      }
      throw error;
    }
  },

  /**
   * PATCH request
   */
  patch: async (endpoint, data = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorMessage = getThemedErrorMessage(
          new Error(`PATCH ${endpoint} failed`),
          response.status
        );
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK);
      }
      throw error;
    }
  },

  /**
   * DELETE request
   */
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorMessage = getThemedErrorMessage(
          new Error(`DELETE ${endpoint} failed`),
          response.status
        );
        throw new Error(errorMessage);
      }
      
      // Some DELETE endpoints return 204 No Content
      if (response.status === 204) {
        return { success: true };
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK);
      }
      throw error;
    }
  },
};

export default apiClient;
