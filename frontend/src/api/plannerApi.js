import apiClient from './apiClient';

/**
 * Planner service for managing planner logs (Night Shift Planner)
 * Implements requirement 15.5
 */
const plannerService = {
  /**
   * Get all planner logs
   * @returns {Promise<Array>} Array of planner log objects
   */
  getAll: async () => {
    return await apiClient.get('/planner-logs/');
  },

  /**
   * Create a new planner log
   * @param {Object} log - Planner log data
   * @param {string} log.date - Planning date (ISO date string)
   * @param {string} log.planned_tasks - Tasks planned for the day
   * @param {string} [log.actual_tasks] - Tasks actually completed
   * @param {string} [log.notes] - Additional notes
   * @returns {Promise<Object>} Created planner log object
   */
  create: async (log) => {
    return await apiClient.post('/planner-logs/', log);
  },
};

export default plannerService;
