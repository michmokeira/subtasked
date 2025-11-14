import { useState } from 'react';
import SubtaskItem from '../components/SubtaskItem';

const SubtaskExample = () => {
  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      title: 'Research and analyze requirements',
      is_completed: false,
      focus_level: 'deep'
    },
    {
      id: 2,
      title: 'Review email and respond to messages',
      is_completed: false,
      focus_level: 'shallow'
    },
    {
      id: 3,
      title: 'Write comprehensive documentation',
      is_completed: true,
      focus_level: 'deep'
    },
    {
      id: 4,
      title: 'Update task status in tracker',
      is_completed: false,
      focus_level: 'shallow'
    }
  ]);

  const handleToggle = (id) => {
    setSubtasks(prev =>
      prev.map(subtask =>
        subtask.id === id
          ? { ...subtask, is_completed: !subtask.is_completed }
          : subtask
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jet-black to-deep-purple p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-spooky text-neon-orange mb-2">
          SubtaskItem Component
        </h1>
        <p className="text-muted-grey mb-8">
          Demonstrating focus level styling and completion animations
        </p>

        <div className="space-y-3 bg-deep-purple/20 p-6 rounded-lg border border-deep-purple/50">
          <h2 className="text-xl font-spooky text-neon-orange mb-4">
            Task Subtasks
          </h2>
          
          {subtasks.map(subtask => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-jet-black/50 rounded-lg border border-deep-purple/30">
          <h3 className="text-lg font-spooky text-neon-orange mb-3">
            Features Demonstrated:
          </h3>
          <ul className="space-y-2 text-muted-grey text-sm">
            <li>🟣 <strong className="text-purple-300">Deep Work</strong> - Purple glow for focused tasks</li>
            <li>🟠 <strong className="text-neon-orange">Shallow Work</strong> - Orange glow for quick tasks</li>
            <li>✨ Completion animation with spring effect</li>
            <li>🎯 Focus level indicator badges</li>
            <li>✨ Hover effects with scale and glow</li>
            <li>🌫️ Smooth transitions and animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubtaskExample;
