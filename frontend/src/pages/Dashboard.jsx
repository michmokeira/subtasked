// src/pages/Dashboard.jsx

import { mockTasks } from '../utils/mockTasks';
import { mockGoals } from '../utils/mockGoals';
import TaskCard from '../components/TaskCard';
import GoalCard from '../components/GoalCard';

export default function Dashboard() {
  // Filter for today's tasks (or just show the first 2 for now)
  const todaysTasks = mockTasks.slice(0, 2);
  const goalSummaries = mockGoals.slice(0, 2);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's how you're doing today.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">🗒️ Today’s Tasks</h2>
        {todaysTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 Goal Progress</h2>
        {goalSummaries.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </section>

      <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-sm">
        <p className="text-sm text-blue-800 italic">
          "Small steps every day lead to big changes. Keep going."
        </p>
      </section>
    </div>
  );
}
