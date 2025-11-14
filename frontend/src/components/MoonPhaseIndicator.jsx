import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * MoonPhaseIndicator Component
 * 
 * Displays a moon visualization that changes phase based on task completion percentage.
 * Moon phases: New Moon (0-12%), Waxing Crescent (13-37%), Half Moon (38-62%), 
 * Waxing Gibbous (63-87%), Full Moon (88-100%)
 * 
 * @param {number} completionPercentage - Task completion percentage (0-100)
 */
const MoonPhaseIndicator = ({ completionPercentage = 0 }) => {
  const [phase, setPhase] = useState('new');
  const [clipPathValue, setClipPathValue] = useState(0);

  useEffect(() => {
    // Calculate moon phase based on completion percentage
    let newPhase;
    let clipValue;

    if (completionPercentage >= 0 && completionPercentage <= 12) {
      newPhase = 'new';
      clipValue = 0;
    } else if (completionPercentage >= 13 && completionPercentage <= 37) {
      newPhase = 'waxing-crescent';
      // Map 13-37% to 0-50% clip
      clipValue = ((completionPercentage - 13) / 24) * 50;
    } else if (completionPercentage >= 38 && completionPercentage <= 62) {
      newPhase = 'half';
      clipValue = 50;
    } else if (completionPercentage >= 63 && completionPercentage <= 87) {
      newPhase = 'waxing-gibbous';
      // Map 63-87% to 50-100% clip
      clipValue = 50 + ((completionPercentage - 63) / 24) * 50;
    } else {
      newPhase = 'full';
      clipValue = 100;
    }

    setPhase(newPhase);
    setClipPathValue(clipValue);
  }, [completionPercentage]);

  // Calculate the glow intensity based on completion
  const glowIntensity = completionPercentage / 100;
  const glowColor = `rgba(255, 123, 0, ${0.3 + glowIntensity * 0.7})`;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="drop-shadow-2xl"
        >
          <defs>
            {/* Gradient for the moon glow */}
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7b00" stopOpacity={glowIntensity} />
              <stop offset="100%" stopColor="#ff7b00" stopOpacity="0" />
            </radialGradient>

            {/* Gradient for the lit portion of the moon */}
            <radialGradient id="moonLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5e6" />
              <stop offset="70%" stopColor="#ffd699" />
              <stop offset="100%" stopColor="#ffb347" />
            </radialGradient>

            {/* Clip path for moon phases */}
            <clipPath id="moonPhaseClip">
              <motion.rect
                x="0"
                y="0"
                width="200"
                height="200"
                initial={{ x: 0 }}
                animate={{ 
                  x: clipPathValue === 0 ? 200 : (200 - (clipPathValue / 100) * 200)
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </clipPath>
          </defs>

          {/* Outer glow effect */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="url(#moonGlow)"
            animate={{
              r: [70, 75, 70],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Dark moon base (always visible) */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="#1a1a2e"
            stroke="#2d2d44"
            strokeWidth="2"
          />

          {/* Lit portion of the moon (clipped based on phase) */}
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="url(#moonLight)"
            clipPath="url(#moonPhaseClip)"
            style={{
              filter: `drop-shadow(0 0 ${10 + glowIntensity * 20}px ${glowColor})`
            }}
            animate={{
              filter: `drop-shadow(0 0 ${10 + glowIntensity * 20}px ${glowColor})`
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Moon surface details (craters) */}
          <g opacity="0.3">
            <circle cx="85" cy="85" r="8" fill="#0a0a0a" />
            <circle cx="115" cy="95" r="6" fill="#0a0a0a" />
            <circle cx="95" cy="115" r="5" fill="#0a0a0a" />
            <circle cx="110" cy="110" r="4" fill="#0a0a0a" />
          </g>
        </svg>

        {/* Phase label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-grey text-sm font-medium capitalize">
            {phase.replace('-', ' ')} Moon
          </p>
        </motion.div>
      </motion.div>

      {/* Completion percentage display */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-neon-orange text-2xl font-bold">
          {Math.round(completionPercentage)}%
        </p>
        <p className="text-muted-grey text-xs mt-1">
          Tasks Complete
        </p>
      </motion.div>
    </div>
  );
};

export default MoonPhaseIndicator;
