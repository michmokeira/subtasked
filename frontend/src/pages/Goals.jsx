// src/pages/Goals.jsx

import { mockGoals } from '../utils/mockGoals';
import GoalCard from '../components/GoalCard';

export default function Goals() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
      {mockGoals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
