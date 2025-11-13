// src/components/GoalCard.jsx

export default function GoalCard({ goal }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">
      <h2 className="text-lg font-semibold">{goal.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        🎯 Target: {goal.targetDate}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${goal.progress}%` }}
        />
      </div>
      <div className="text-xs text-right text-gray-500 mt-1">
        {goal.progress}% complete
      </div>
    </div>
  );
}
