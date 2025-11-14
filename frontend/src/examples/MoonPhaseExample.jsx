import { useState } from 'react';
import { MoonPhaseIndicator } from '../components';

/**
 * Example page to demonstrate MoonPhaseIndicator component
 * Shows different moon phases based on completion percentage
 */
const MoonPhaseExample = () => {
  const [completionPercentage, setCompletionPercentage] = useState(50);

  const presetPhases = [
    { label: 'New Moon', value: 0 },
    { label: 'Waxing Crescent', value: 25 },
    { label: 'Half Moon', value: 50 },
    { label: 'Waxing Gibbous', value: 75 },
    { label: 'Full Moon', value: 100 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-jet-black to-deep-purple p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-spooky text-neon-orange mb-8 text-center">
          Moon Phase Indicator Demo
        </h1>

        <div className="bg-jet-black/50 rounded-lg p-8 mb-8">
          <MoonPhaseIndicator completionPercentage={completionPercentage} />
        </div>

        <div className="bg-jet-black/50 rounded-lg p-6">
          <h2 className="text-xl font-spooky text-neon-orange mb-4">
            Controls
          </h2>

          {/* Slider */}
          <div className="mb-6">
            <label className="block text-muted-grey mb-2">
              Completion Percentage: {completionPercentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={completionPercentage}
              onChange={(e) => setCompletionPercentage(Number(e.target.value))}
              className="w-full h-2 bg-deep-purple rounded-lg appearance-none cursor-pointer accent-neon-orange"
            />
          </div>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2">
            {presetPhases.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setCompletionPercentage(preset.value)}
                className="px-4 py-2 bg-deep-purple text-muted-grey rounded-lg hover:bg-neon-orange hover:text-jet-black transition-all duration-300"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonPhaseExample;
