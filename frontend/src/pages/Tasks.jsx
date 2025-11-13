// src/pages/Tasks.jsx
import { mockTasks } from '../utils/mockTasks';
import TaskCard from '../components/TaskCard';

export default function Tasks() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {mockTasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        mockTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}
