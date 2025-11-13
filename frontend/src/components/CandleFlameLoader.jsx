import React from 'react';
import './CandleFlameLoader.css';

const CandleFlameLoader = ({ message = "Summoning your tasks..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Candle body */}
        <svg
          width="60"
          height="120"
          viewBox="0 0 60 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="candle-svg"
        >
          {/* Candle stick */}
          <rect
            x="15"
            y="40"
            width="30"
            height="70"
            rx="2"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
          />
          
          {/* Wax drip */}
          <ellipse
            cx="30"
            cy="40"
            rx="16"
            ry="8"
            fill="#A0522D"
          />
          
          {/* Wick */}
          <line
            x1="30"
            y1="35"
            x2="30"
            y2="25"
            stroke="#2C1810"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Flame */}
          <g className="flame">
            <ellipse
              cx="30"
              cy="20"
              rx="8"
              ry="12"
              fill="url(#flameGradient)"
              className="flame-outer"
            />
            <ellipse
              cx="30"
              cy="22"
              rx="4"
              ry="8"
              fill="#FFD700"
              className="flame-inner"
            />
          </g>
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff7b00" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#ff7b00" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow effect */}
        <div className="candle-glow"></div>
      </div>
      
      {/* Loading message */}
      <p className="mt-6 text-muted-grey text-lg font-body animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default CandleFlameLoader;
