// src/components/TaskCard.jsx
export default function TaskCard({ task }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <span className={`text-xs px-2 py-1 rounded-full ${task.isDeepWork ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
          {task.isDeepWork ? 'Deep Work' : 'Shallow Work'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        ⏳ Est: {task.estimatedTime} min
        {task.actualTime && <> · ✅ Actual: {task.actualTime} min</>}
      </div>
      {task.subtasks.length > 0 && (
        <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
          {task.subtasks.map((sub) => (
            <li key={sub.id} className={sub.completed ? 'line-through' : ''}>
              {sub.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
