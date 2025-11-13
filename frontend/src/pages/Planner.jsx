// src/pages/Planner.jsx
import { mockPlannerTasks } from "../utils/mockPlannerTasks";

export default function Planner() {
  const plannedTasks = mockPlannerTasks.filter((task) => task.planned);
  const unplannedTasks = mockPlannerTasks.filter((task) => !task.planned);

  const totalTime = plannedTasks.reduce((sum, task) => sum + task.estimatedTime, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Planner</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Today's Plan</h2>
        {plannedTasks.length === 0 ? (
          <p className="text-gray-500">No tasks planned yet.</p>
        ) : (
          <ul className="space-y-2">
            {plannedTasks.map((task) => (
              <li
                key={task.id}
                className="border rounded-lg p-3 bg-white shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    ⏳ {task.estimatedTime} min · {task.isDeepWork ? "Deep Work" : "Shallow Work"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-gray-600">🕒 Total estimated time: {totalTime} min</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Available Tasks</h2>
        {unplannedTasks.length === 0 ? (
          <p className="text-gray-500">All tasks are planned.</p>
        ) : (
          <ul className="space-y-2">
            {unplannedTasks.map((task) => (
              <li
                key={task.id}
                className="border rounded-lg p-3 bg-gray-50 shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    ⏳ {task.estimatedTime} min · {task.isDeepWork ? "Deep Work" : "Shallow Work"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
