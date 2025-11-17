// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import FogTransition from '../components/animations/FogTransition';
import MoonPhaseIndicator from '../components/MoonPhaseIndicator';
import CandleFlameLoader from '../components/CandleFlameLoader';
import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import taskService from '../api/taskApi';
import goalService from '../api/goalApi';
import { useToast } from '../contexts/ToastContext';

/**
 * StatCard Component - Displays count statistics with spooky icons
 */
function StatCard({ icon: Icon, label, count, color = 'neon-orange' }) {
  return (
    <div className="bg-gradient-to-br from-deep-purple/30 to-jet-black/50 rounded-lg p-6 border border-deep-purple/50 shadow-lg hover:shadow-[0_0_20px_rgba(255,123,0,0.3)] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${color}/10 border border-${color}/30`}>
          <Icon className={`text-${color}`} size={24} />
        </div>
        <div>
          <p className="text-muted-grey/70 text-sm font-body">{label}</p>
          <p className={`text-3xl font-bold text-${color}`}>{count}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Fetch tasks and goals on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both tasks and goals in parallel
        const [tasksData, goalsData] = await Promise.all([
          taskService.getAll(),
          goalService.getAll()
        ]);
        
        setTasks(tasksData || []);
        setGoals(goalsData || []);
      } catch (err) {
        setError(err.message);
        showToast({
          message: err.message || 'Failed to summon your data...',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  // Calculate completion percentage for moon phase
  const completionPercentage = tasks.length > 0
    ? Math.round((tasks.filter(t => t.is_completed).length / tasks.length) * 100)
    : 0;

  // Get recent tasks (top 5, incomplete first)
  const recentTasks = tasks
    .sort((a, b) => {
      // Sort incomplete tasks first, then by creation date
      if (a.is_completed === b.is_completed) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return a.is_completed ? 1 : -1;
    })
    .slice(0, 5);

  // Count statistics
  const taskCount = tasks.length;
  const goalCount = goals.length;
  const incompleteTasks = tasks.filter(t => !t.is_completed).length;

  // Loading state
  if (loading) {
    return (
      <FogTransition>
        <div className="p-6">
          <CandleFlameLoader message="Summoning your tasks..." />
        </div>
      </FogTransition>
    );
  }

  // Empty state - no tasks and no goals
  if (!loading && tasks.length === 0 && goals.length === 0) {
    return (
      <FogTransition>
        <div className="p-6">
          <h1 className="text-4xl font-spooky text-neon-orange mb-8">
            Subtasked: Night Shift
          </h1>
          <EmptyState 
            type="tasks" 
            onAction={() => window.location.href = '/tasks'}
          />
        </div>
      </FogTransition>
    );
  }

  return (
    <FogTransition>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-spooky text-neon-orange mb-2">
            Subtasked: Night Shift
          </h1>
          <p className="text-muted-grey/70 font-body">
            The darkness awaits your productivity...
          </p>
        </div>

        {/* Moon Phase Indicator */}
        <div className="flex justify-center py-8">
          <MoonPhaseIndicator completionPercentage={completionPercentage} />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={CheckCircle2}
            label="Total Tasks"
            count={taskCount}
            color="neon-orange"
          />
          <StatCard
            icon={Target}
            label="Active Goals"
            count={goalCount}
            color="deep-purple"
          />
        </div>

        {/* Recent Tasks Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-spooky text-neon-orange">
              Recent Tasks
            </h2>
            {incompleteTasks > 0 && (
              <span className="text-muted-grey/70 text-sm font-body">
                {incompleteTasks} haunting you...
              </span>
            )}
          </div>

          {recentTasks.length > 0 ? (
            <div className="space-y-4">
              {recentTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onComplete={async (id) => {
                    try {
                      await taskService.complete(id);
                      // Refresh tasks
                      const updatedTasks = await taskService.getAll();
                      setTasks(updatedTasks);
                      showToast({
                        message: "You've earned another day... for now.",
                        type: 'spooky'
                      });
                    } catch (err) {
                      showToast({
                        message: err.message,
                        type: 'error'
                      });
                    }
                  }}
                  onDelete={async (id) => {
                    try {
                      await taskService.delete(id);
                      // Refresh tasks
                      const updatedTasks = await taskService.getAll();
                      setTasks(updatedTasks);
                      showToast({
                        message: 'Task banished to the void...',
                        type: 'info'
                      });
                    } catch (err) {
                      showToast({
                        message: err.message,
                        type: 'error'
                      });
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-deep-purple/20 to-jet-black/30 rounded-lg p-8 border border-deep-purple/30 text-center">
              <p className="text-muted-grey/70 font-body">
                No tasks to haunt you yet... Create one to begin the night shift.
              </p>
            </div>
          )}
        </section>

        {/* Error display if needed */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 font-body text-sm">{error}</p>
          </div>
        )}
      </div>
    </FogTransition>
  );
}
