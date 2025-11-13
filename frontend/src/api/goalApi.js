import apiClient from './apiClient';

/**
 * Goal service for managing goals
 * Implements requirement 15.5
 */
const goalService = {
  /**
   * Get all goals
   * @returns {Promise<Array>} Array of goal objects
   */
  getAll: async () => {
    return await apiClient.get('/goals/');
  },

  /**
   * Get goal by ID
   * @param {number} id - Goal ID
   * @returns {Promise<Object>} Goal object
   */
  getById: async (id) => {
    return await apiClient.get(`/goals/${id}`);
  },

  /**
   * Create a new goal
   * @param {Object} goal - Goal data
   * @param {string} goal.title - Goal title
   * @param {string} goal.description - Goal description
   * @param {string} [goal.deadline] - Optional deadline (ISO date string)
   * @returns {Promise<Object>} Created goal object
   */
  create: async (goal) => {
    return await apiClient.post('/goals/', goal);
  },

  /**
   * Delete a goal
   * @param {number} id - Goal ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    return await apiClient.delete(`/goals/${id}`);
  },
};

export default goalService;
