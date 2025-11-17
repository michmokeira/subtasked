// src/pages/Tasks.jsx
import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import FogTransition from '../components/animations/FogTransition';
import BatAnimation from '../components/animations/BatAnimation';
import CompletionFlash from '../components/animations/CompletionFlash';
import GhostDrift from '../components/animations/GhostDrift';
import CandleFlameLoader from '../components/CandleFlameLoader';
import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import taskService from '../api/taskApi';
import { useToast } from '../contexts/ToastContext';

const HAUNTING_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBatAnimation, setShowBatAnimation] = useState(false);
  const [showCompletionFlash, setShowCompletionFlash] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [hauntedTasks, setHauntedTasks] = useState(new Set());
  const { showToast } = useToast();
  
  const lastActivityRef = useRef(Date.now());
  const hauntingTimerRef = useRef(null);

  // Fetch tasks on mount
  useEffect(() => {
    console.log('Tasks component mounted');
    fetchTasks();
  }, []);

  // Haunting system - check for inactivity
  useEffect(() => {
    const checkHaunting = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivityRef.current;
      
      if (timeSinceActivity >= HAUNTING_TIMEOUT) {
        // Mark incomplete tasks as haunted
        const incompleteTasks = tasks
          .filter(t => !t.is_completed)
          .map(t => t.id);
        
        if (incompleteTasks.length > 0) {
          setHauntedTasks(new Set(incompleteTasks));
        }
      }
    };

    // Check every 30 seconds
    hauntingTimerRef.current = setInterval(checkHaunting, 30000);

    return () => {
      if (hauntingTimerRef.current) {
        clearInterval(hauntingTimerRef.current);
      }
    };
  }, [tasks]);

  // Reset activity timer on user interaction
  const resetActivity = () => {
    lastActivityRef.current = Date.now();
    setHauntedTasks(new Set()); // Clear haunted state on activity
  };

  // Add event listeners for user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, resetActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetActivity);
      });
    };
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data || []);
    } catch (err) {
      showToast({
        message: err.message || 'Failed to summon tasks...',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      resetActivity();
      await taskService.create(taskData);
      
      // Trigger bat animation
      setShowBatAnimation(true);
      
      // Refresh tasks
      await fetchTasks();
      
      setIsModalOpen(false);
      
      showToast({
        message: 'A new task emerges from the shadows...',
        type: 'spooky'
      });
    } catch (err) {
      showToast({
        message: err.message || 'Failed to create task...',
        type: 'error'
      });
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      resetActivity();
      await taskService.complete(taskId);
      
      // Trigger completion flash
      setShowCompletionFlash(true);
      
      // Refresh tasks
      await fetchTasks();
      
      // Remove from haunted if it was haunted
      setHauntedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
      
      showToast({
        message: "You've earned another day... for now.",
        type: 'spooky'
      });
    } catch (err) {
      showToast({
        message: err.message || 'Failed to complete task...',
        type: 'error'
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      resetActivity();
      
      // Set deleting state to trigger ghost drift animation
      setDeletingTaskId(taskId);
      
      // Wait for animation to complete before actually deleting
      setTimeout(async () => {
        try {
          await taskService.delete(taskId);
          
          // Refresh tasks
          await fetchTasks();
          
          // Remove from haunted if it was haunted
          setHauntedTasks(prev => {
            const newSet = new Set(prev);
            newSet.delete(taskId);
            return newSet;
          });
          
          setDeletingTaskId(null);
          
          showToast({
            message: 'Task banished to the void...',
            type: 'info'
          });
        } catch (err) {
          setDeletingTaskId(null);
          showToast({
            message: err.message || 'Failed to delete task...',
            type: 'error'
          });
        }
      }, 1500); // Match GhostDrift animation duration
    } catch (err) {
      showToast({
        message: err.message || 'Failed to delete task...',
        type: 'error'
      });
    }
  };

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

  // Empty state
  if (!loading && tasks.length === 0) {
    return (
      <FogTransition>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-spooky text-neon-orange">Tasks</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-neon-orange text-jet-black rounded-lg hover:shadow-[0_0_20px_rgba(255,123,0,0.5)] hover:scale-105 transition-all font-body font-semibold"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>
          
          <EmptyState 
            type="tasks" 
            onAction={() => setIsModalOpen(true)}
          />
          
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateTask}
          />
        </div>
      </FogTransition>
    );
  }

  return (
    <FogTransition>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-spooky text-neon-orange mb-2">Tasks</h1>
            <p className="text-muted-grey/70 font-body text-sm">
              {tasks.filter(t => !t.is_completed).length} tasks haunting you...
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-orange text-jet-black rounded-lg hover:shadow-[0_0_20px_rgba(255,123,0,0.5)] hover:scale-105 transition-all font-body font-semibold"
          >
            <Plus size={20} />
            New Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map(task => {
            const isDeleting = deletingTaskId === task.id;
            const isHaunted = hauntedTasks.has(task.id);
            
            const taskCard = (
              <TaskCard
                key={task.id}
                task={task}
                isHaunted={isHaunted}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            );

            // Wrap in GhostDrift if deleting
            if (isDeleting) {
              return (
                <GhostDrift key={task.id} onComplete={() => {}}>
                  {taskCard}
                </GhostDrift>
              );
            }

            return taskCard;
          })}
        </div>

        {/* Modals and Animations */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTask}
        />

        <BatAnimation
          show={showBatAnimation}
          onComplete={() => setShowBatAnimation(false)}
        />

        <CompletionFlash
          show={showCompletionFlash}
          onComplete={() => setShowCompletionFlash(false)}
        />
      </div>
    </FogTransition>
  );
}
