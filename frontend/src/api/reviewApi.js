import apiClient from './apiClient';

/**
 * Review service for managing review entries (Exorcism Log)
 * Implements requirement 15.5
 */
const reviewService = {
  /**
   * Get all review entries
   * @returns {Promise<Array>} Array of review entry objects
   */
  getAll: async () => {
    return await apiClient.get('/reviews/');
  },

  /**
   * Create a new review entry
   * @param {Object} entry - Review entry data
   * @param {string} entry.date - Review date (ISO date string)
   * @param {string} entry.highlights - Demons Banished (what went well)
   * @param {string} entry.lessons_learned - Lessons from the Shadows
   * @param {string} entry.improvements - Midnight Improvements
   * @returns {Promise<Object>} Created review entry object
   */
  create: async (entry) => {
    return await apiClient.post('/reviews/', entry);
  },
};

export default reviewService;
