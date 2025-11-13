// src/utils/mockTasks.js
export const mockTasks = [
  {
    id: '1',
    title: 'Read Chapter 3 of Deep Work',
    description: 'Focus on understanding key principles',
    estimatedTime: 60,
    actualTime: null,
    isDeepWork: true,
    completed: false,
    subtasks: [
      { id: '1-1', title: 'Highlight key ideas', completed: false },
      { id: '1-2', title: 'Summarize notes', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Reply to emails',
    description: 'Inbox clean-up',
    estimatedTime: 30,
    actualTime: null,
    isDeepWork: false,
    completed: false,
    subtasks: [],
  },
];
