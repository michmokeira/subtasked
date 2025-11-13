import apiClient from './apiClient';

/**
 * Task service for managing tasks
 * Implements requirements 15.1, 15.2, 15.3
 */
const taskService = {
  /**
   * Get all tasks
   * @returns {Promise<Array>} Array of task objects
   */
  getAll: async () => {
    return await apiClient.get('/tasks');
  },

  /**
   * Get task by ID
   * @param {number} id - Task ID
   * @returns {Promise<Object>} Task object with subtasks
   */
  getById: async (id) => {
    return await apiClient.get(`/tasks/${id}`);
  },

  /**
   * Create a new task
   * @param {Object} task - Task data
   * @param {string} task.title - Task title
   * @param {string} task.description - Task description
   * @param {number} task.estimated_minutes - Estimated time in minutes
   * @param {number} [task.goal_id] - Optional goal ID to link
   * @returns {Promise<Object>} Created task object
   */
  create: async (task) => {
    return await apiClient.post('/tasks', task);
  },

  /**
   * Mark task as complete
   * @param {number} id - Task ID
   * @returns {Promise<Object>} Updated task object
   */
  complete: async (id) => {
    return await apiClient.patch(`/tasks/${id}/complete`, {});
  },

  /**
   * Delete a task
   * @param {number} id - Task ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    return await apiClient.delete(`/tasks/${id}`);
  },
};

export default taskService;
