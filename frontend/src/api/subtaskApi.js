import apiClient from './apiClient';

/**
 * Subtask service for managing subtasks
 * Implements requirement 15.4
 */
const subtaskService = {
  /**
   * Create a new subtask for a task
   * @param {number} taskId - Parent task ID
   * @param {Object} subtask - Subtask data
   * @param {string} subtask.title - Subtask title
   * @param {string} subtask.focus_level - Focus level: 'deep' or 'shallow'
   * @returns {Promise<Object>} Created subtask object
   */
  create: async (taskId, subtask) => {
    return await apiClient.post(`/tasks/${taskId}/subtasks`, subtask);
  },

  /**
   * Mark subtask as complete
   * @param {number} id - Subtask ID
   * @returns {Promise<Object>} Updated subtask object
   */
  complete: async (id) => {
    return await apiClient.patch(`/subtasks/${id}/complete`, {});
  },
};

export default subtaskService;
