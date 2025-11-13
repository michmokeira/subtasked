import React from 'react';
import { Ghost, Flame, Calendar, BookOpen } from 'lucide-react';

const EmptyState = ({ type, onAction }) => {
  // Map themed messages and icons for each type
  const stateConfig = {
    tasks: {
      icon: Ghost,
      message: "The graveyard is empty... for now 💀",
      subMessage: "Create your first task to begin the night shift",
      actionLabel: "Create Task"
    },
    goals: {
      icon: Flame,
      message: "No candles lit yet... start a new goal",
      subMessage: "Light a candle to illuminate your path forward",
      actionLabel: "Create Goal"
    },
    planner: {
      icon: Calendar,
      message: "The night shift awaits your plans...",
      subMessage: "Plan your tasks for the upcoming darkness",
      actionLabel: "Create Plan"
    },
    reviews: {
      icon: BookOpen,
      message: "No exorcisms logged yet",
      subMessage: "Record your victories over procrastination",
      actionLabel: "Create Entry"
    }
  };

  const config = stateConfig[type] || stateConfig.tasks;
  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-deep-purple/30 to-jet-black/50 rounded-lg p-12 max-w-md w-full border border-deep-purple/50 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <IconComponent 
              size={64} 
              className="text-neon-orange opacity-60"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 blur-xl bg-neon-orange/20 rounded-full"></div>
          </div>
        </div>

        {/* Main message */}
        <h3 className="text-2xl font-spooky text-center text-muted-grey mb-3">
          {config.message}
        </h3>

        {/* Sub message */}
        <p className="text-center text-muted-grey/70 text-sm mb-8 font-body">
          {config.subMessage}
        </p>

        {/* Optional action button */}
        {onAction && (
          <button
            onClick={onAction}
            className="w-full bg-deep-purple hover:bg-deep-purple/80 text-neon-orange font-body font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,123,0,0.5)] hover:scale-105 border border-neon-orange/30"
          >
            {config.actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
