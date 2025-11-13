# Design Document

## Overview

Subtasked: Night Shift is a React-based single-page application that provides a Halloween-themed productivity interface. The design leverages Framer Motion for animations, Tailwind CSS for styling, and integrates with the existing FastAPI backend. The architecture follows a component-based approach with clear separation between presentation, state management, and API communication layers.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    App Router                          │  │
│  │              (React Router DOM)                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────────┐ │
│  │                  Page Components                        │ │
│  │  Dashboard │ Tasks │ Goals │ Planner │ Review │ Settings│ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────────┐ │
│  │              Shared Components Layer                    │ │
│  │  TaskCard │ GoalCard │ MoonPhase │ Loader │ EmptyState │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────────┐ │
│  │                  API Service Layer                      │ │
│  │         (Axios/Fetch with Backend Integration)          │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────────┐ │
│  │              Animation & Theme System                   │ │
│  │    Framer Motion │ Tailwind Config │ Theme Context      │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend                            │
│              (Existing Subtasked API)                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 19.1.0
- **Routing**: React Router DOM 7.7.1
- **Styling**: Tailwind CSS 4.1.11
- **Animations**: Framer Motion (to be installed)
- **Icons**: Lucide React 0.536.0
- **HTTP Client**: Fetch API with custom wrapper
- **Build Tool**: Vite 7.0.0
- **State Management**: React Context API + useState/useEffect hooks

## Components and Interfaces

### Theme System

#### ThemeProvider Context

```javascript
interface ThemeContextValue {
  mode: 'casual-dark' | 'full-haunt';
  setMode: (mode: 'casual-dark' | 'full-haunt') => void;
  colors: {
    jetBlack: '#0a0a0a';
    deepPurple: '#1e0e2a';
    neonOrange: '#ff7b00';
    mutedGrey: '#b0a8b9';
  };
}
```

The ThemeProvider wraps the entire application and provides theme state and color constants. Mode preference persists in localStorage.

### Layout Components

#### MainLayout

The main layout component provides consistent structure across all pages:

```javascript
<MainLayout>
  <Sidebar /> // Desktop navigation with glow effects
  <main>
    <Outlet /> // Page content
  </main>
  <BottomNav /> // Mobile navigation
  <ToastContainer /> // For notifications
</MainLayout>
```

Features:
- Responsive sidebar that collapses on mobile
- Bottom navigation for mobile devices
- Fog overlay transitions between routes
- Persistent theme application

#### Sidebar

Navigation component with Halloween-themed icons and hover effects:

- Ghost icon for Tasks
- Pumpkin icon for Goals
- Bat icon for Notifications
- Candle icon for Planner
- Skull icon for Review
- Gear icon for Settings

Hover behavior: Neon orange glow pulse (1.5s duration) using Framer Motion.

### Page Components

#### Dashboard

Primary landing page showing overview and progress.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Subtasked: Night Shift                 │
│  ┌───────────────────────────────────┐  │
│  │     Moon Phase Indicator          │  │
│  │     (Progress Visualization)      │  │
│  └───────────────────────────────────┘  │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ Task Stats  │  │  Goal Stats     │  │
│  └─────────────┘  └─────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Recent Tasks (Top 5)             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Components:**
- MoonPhaseIndicator: SVG-based moon rendering with phase calculation
- StatCard: Displays counts with spooky icons
- TaskPreview: Condensed task cards with quick actions

#### Tasks Page

Full task management interface with create, complete, and delete operations.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Tasks  [+ New Task]                    │
│  ┌───────────────────────────────────┐  │
│  │  TaskCard                         │  │
│  │  - Title                          │  │
│  │  - Subtasks (with focus levels)  │  │
│  │  - Actions                        │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  TaskCard (Haunted)               │  │
│  │  - Ghostly appearance             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Features:**
- Task creation modal with bat animation
- Subtask management with deep/shallow indicators
- Haunting system for inactive tasks
- Completion flash animation
- Ghost drift animation on delete

#### Goals Page

Goal tracking with candle metaphor.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Goals  [+ New Goal]                    │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ GoalCard    │  │  GoalCard       │  │
│  │ 🕯️ Title    │  │  🕯️ Title       │  │
│  │ Description │  │  Description    │  │
│  │ Deadline    │  │  Deadline       │  │
│  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘
```

**Features:**
- Flickering candle animation using CSS keyframes
- Candle burn-out animation on completion
- Glow intensity increase on hover
- Candle lighting animation on creation

#### Planner Page

Daily/weekly planning with progressive darkening.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Night Shift Planner                    │
│  [Date Selector]                        │
│  ┌───────────────────────────────────┐  │
│  │  Planned Tasks                    │  │
│  │  - Task 1                         │  │
│  │  - Task 2                         │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Notes                            │  │
│  │  [Text Area]                      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Features:**
- Background darkening timer (10% every 10 minutes)
- Planner log creation and viewing
- Task linking from planner to tasks page

#### Review Page (Exorcism Log)

Daily reflection interface with journal aesthetic.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Exorcism Log                           │
│  [+ New Entry]                          │
│  ┌───────────────────────────────────┐  │
│  │  Demons Banished                  │  │
│  │  [Text Area]                      │  │
│  ├───────────────────────────────────┤  │
│  │  Lessons from the Shadows         │  │
│  │  [Text Area]                      │  │
│  ├───────────────────────────────────┤  │
│  │  Midnight Improvements            │  │
│  │  [Text Area]                      │  │
│  └───────────────────────────────────┘  │
│  [Submit Exorcism]                      │
└─────────────────────────────────────────┘
```

**Features:**
- Themed field labels
- Journal-style card rendering for past entries
- Confirmation message on submission

#### Settings Page

Configuration interface for theme mode and preferences.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Settings                               │
│  ┌───────────────────────────────────┐  │
│  │  Appearance                       │  │
│  │  ○ Casual Dark                    │  │
│  │  ● Full Haunt Mode                │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Notifications                    │  │
│  │  [Toggle switches]                │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Shared Components

#### TaskCard

Displays individual task with subtasks and actions.

**Props:**
```javascript
interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    estimated_minutes: number;
    actual_minutes: number;
    subtasks: Subtask[];
  };
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  isHaunted: boolean;
}
```

**Visual States:**
- Normal: Full opacity, standard styling
- Haunted: 60% opacity, floating animation
- Completed: Strike-through, muted colors
- Hover: Scale 1.02, increased shadow

#### SubtaskItem

Renders individual subtask with focus level indicator.

**Props:**
```javascript
interface SubtaskItemProps {
  subtask: {
    id: number;
    title: string;
    is_completed: boolean;
    focus_level: 'deep' | 'shallow';
  };
  onToggle: (id: number) => void;
}
```

**Visual Indicators:**
- Deep work: Purple glowing checkbox
- Shallow work: Orange checkbox
- Completed: Checkmark with fade animation

#### MoonPhaseIndicator

SVG-based moon visualization showing task completion progress.

**Props:**
```javascript
interface MoonPhaseIndicatorProps {
  completionPercentage: number; // 0-100
}
```

**Moon Phases:**
- 0-12%: New Moon (dark circle)
- 13-37%: Waxing Crescent
- 38-62%: Half Moon
- 63-87%: Waxing Gibbous
- 88-100%: Full Moon (bright circle)

Implementation uses SVG clip-path for smooth phase transitions.

#### CandleFlameLoader

Loading animation component with flickering candle.

**Props:**
```javascript
interface CandleFlameLoaderProps {
  message?: string; // Default: "Summoning your tasks..."
}
```

Animation: CSS keyframes with opacity and transform variations to simulate flame flicker.

#### EmptyState

Displays themed messages when no data exists.

**Props:**
```javascript
interface EmptyStateProps {
  type: 'tasks' | 'goals' | 'planner' | 'reviews';
  onAction?: () => void;
}
```

Messages mapped by type as per Requirement 9.

#### ToastNotification

Displays temporary notifications with eerie styling.

**Props:**
```javascript
interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'spooky';
  duration?: number; // Default: 3000ms
}
```

Spooky type includes ghost icon and purple/orange gradient background.

### Animation Components

#### CompletionFlash

Full-screen flash animation triggered on task completion.

**Implementation:**
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 0.3, 0] }}
  transition={{ duration: 0.6, times: [0, 0.5, 1] }}
  style={{
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(circle, #ff7b00, #1e0e2a)',
    pointerEvents: 'none',
    zIndex: 9999
  }}
/>
```

Displays message "You've earned another day... for now." in center during flash.

#### BatAnimation

Animated bat flying across screen on task creation.

**Implementation:**
Uses Framer Motion with path animation. Bat SVG moves from left to right across top of viewport over 2 seconds with easing.

#### GhostDrift

Animation for task deletion.

**Implementation:**
```javascript
<motion.div
  initial={{ opacity: 1, y: 0 }}
  animate={{ opacity: 0, y: -100 }}
  transition={{ duration: 1.5, ease: 'easeOut' }}
>
  {/* Task content */}
</motion.div>
```

#### FogTransition

Page transition effect using Framer Motion.

**Implementation:**
```javascript
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 20 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>
```

## Data Models

### Frontend Data Types

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  estimated_minutes: number;
  actual_minutes: number;
  created_at: string;
  goal_id: number | null;
  subtasks: Subtask[];
}

interface Subtask {
  id: number;
  task_id: number;
  title: string;
  is_completed: boolean;
  focus_level: 'deep' | 'shallow';
}

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
}

interface ReviewEntry {
  id: number;
  date: string;
  highlights: string;
  lessons_learned: string;
  improvements: string;
}

interface PlannerLog {
  id: number;
  date: string;
  planned_tasks: string;
  actual_tasks: string;
  notes: string;
}

interface ThemeMode {
  mode: 'casual-dark' | 'full-haunt';
}
```

## API Service Layer

### API Client Configuration

```javascript
const API_BASE_URL = 'http://localhost:8000';

const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  patch: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
};
```

### API Service Functions

```javascript
// Task operations
export const taskService = {
  getAll: () => apiClient.get('/tasks'),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (task) => apiClient.post('/tasks', task),
  complete: (id) => apiClient.patch(`/tasks/${id}/complete`, {}),
  delete: (id) => apiClient.delete(`/tasks/${id}`)
};

// Subtask operations
export const subtaskService = {
  create: (taskId, subtask) => apiClient.post(`/tasks/${taskId}/subtasks`, subtask),
  complete: (id) => apiClient.patch(`/subtasks/${id}/complete`, {})
};

// Goal operations
export const goalService = {
  getAll: () => apiClient.get('/goals/'),
  getById: (id) => apiClient.get(`/goals/${id}`),
  create: (goal) => apiClient.post('/goals/', goal),
  delete: (id) => apiClient.delete(`/goals/${id}`)
};

// Review operations
export const reviewService = {
  getAll: () => apiClient.get('/reviews/'),
  create: (entry) => apiClient.post('/reviews/', entry)
};

// Planner operations
export const plannerService = {
  getAll: () => apiClient.get('/planner-logs/'),
  create: (log) => apiClient.post('/planner-logs/', log)
};
```

## Error Handling

### Error Display Strategy

All API errors are caught and displayed using themed toast notifications:

```javascript
try {
  await taskService.create(newTask);
} catch (error) {
  showToast({
    message: 'The spirits rejected your task... try again',
    type: 'error'
  });
}
```

### Error Messages

- Network failure: "Lost in the fog... check your connection"
- Server error: "The backend spirits are restless... try again later"
- Validation error: "The ritual requires all fields..."
- Not found: "This task has vanished into the void"

## Testing Strategy

### Component Testing

Focus on core functional components:

1. **TaskCard**: Verify rendering, completion, deletion
2. **MoonPhaseIndicator**: Test phase calculation accuracy
3. **API Service**: Mock fetch calls and verify request formatting
4. **ThemeProvider**: Test mode switching and persistence

### Integration Testing

Test key user flows:

1. Create task → Add subtasks → Complete subtasks → Complete task
2. Create goal → Link task to goal → Complete task
3. Create planner entry → View planner log
4. Toggle theme mode → Verify animation changes

### Manual Testing Checklist

- [ ] All animations render smoothly at 60fps
- [ ] Haunting system activates after 5 minutes
- [ ] Moon phase updates correctly
- [ ] Completion flash displays properly
- [ ] API calls succeed with backend running
- [ ] Theme persists across page refreshes
- [ ] Mobile responsive layout works correctly
- [ ] Empty states display appropriate messages

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'jet-black': '#0a0a0a',
        'deep-purple': '#1e0e2a',
        'neon-orange': '#ff7b00',
        'muted-grey': '#b0a8b9'
      },
      fontFamily: {
        'spooky': ['Creepster', 'cursive'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'flicker': 'flicker 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite'
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #ff7b00' },
          '50%': { boxShadow: '0 0 20px #ff7b00' }
        }
      }
    }
  },
  plugins: []
};
```

### Global Styles

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@400;500;600;700&display=swap');

body {
  background: linear-gradient(135deg, #0a0a0a 0%, #1e0e2a 100%);
  color: #b0a8b9;
  font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
  font-family: 'Creepster', cursive;
  color: #ff7b00;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #1e0e2a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff7b00;
}
```

## Kiro Integration

### Agent Hook Implementation

Create `.kiro/hooks/task-completion-quotes.js`:

```javascript
// Triggered when task is completed
const spookyQuotes = [
  "You've slain another ghost of procrastination.",
  "The spirits are pleased with your progress.",
  "Another demon banished to the void.",
  "You've earned one more day... for now.",
  "The night shift rewards the diligent.",
  "Your focus has exorcised another task.",
  "The haunting grows weaker with each completion."
];

export function getRandomQuote() {
  return spookyQuotes[Math.floor(Math.random() * spookyQuotes.length)];
}
```

Hook configuration in `.kiro/hooks/config.json`:

```json
{
  "hooks": [
    {
      "name": "Task Completion Motivator",
      "trigger": "manual",
      "description": "Generates spooky motivational quotes for task completion",
      "script": "task-completion-quotes.js"
    }
  ]
}
```

### Steering Document

Create `.kiro/steering/halloween-theme-guide.md`:

```markdown
# Halloween Theme Steering Guide

## Tone and Voice
- Dark and mysterious, yet motivating
- Professional productivity with spooky flair
- Avoid overly gimmicky or childish Halloween references
- Balance eerie aesthetics with functional clarity

## Visual Consistency
- Always use defined color palette
- Maintain smooth 60fps animations
- Ensure text remains readable against dark backgrounds
- Use subtle effects that enhance rather than distract

## Copy Guidelines
- Task completion: Empowering with dark humor
- Error messages: Themed but clear about the issue
- Empty states: Inviting action with spooky charm
- Notifications: Brief, themed, informative
```

## Performance Considerations

### Optimization Strategies

1. **Animation Performance**
   - Use CSS transforms and opacity for animations (GPU-accelerated)
   - Implement `will-change` property for frequently animated elements
   - Debounce haunting system checks to every 30 seconds

2. **API Optimization**
   - Implement request caching for frequently accessed data
   - Use optimistic UI updates for better perceived performance
   - Batch multiple API calls when possible

3. **Bundle Size**
   - Code-split routes using React.lazy()
   - Tree-shake unused Lucide icons
   - Minimize Framer Motion imports to only used components

4. **Rendering Optimization**
   - Memoize expensive calculations (moon phase, completion percentage)
   - Use React.memo for pure components
   - Implement virtual scrolling for large task lists

## Deployment Considerations

### Environment Configuration

```javascript
// config.js
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS !== 'false',
  defaultThemeMode: import.meta.env.VITE_DEFAULT_THEME || 'full-haunt'
};
```

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Browser Support

Target modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Considerations

While maintaining the Halloween theme:

1. **Color Contrast**: Ensure text meets WCAG AA standards (4.5:1 ratio)
2. **Keyboard Navigation**: All interactive elements accessible via keyboard
3. **Screen Readers**: Provide aria-labels for icon-only buttons
4. **Motion Preferences**: Respect `prefers-reduced-motion` media query
5. **Focus Indicators**: Visible focus states with orange glow

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Future Enhancements

Potential features beyond MVP:

1. **Sound Effects**: Optional UI sounds (ticking, wind, heartbeat)
2. **Advanced Haunting**: Progressive haunting intensity based on task age
3. **Achievement System**: "Exorcist badges" for completing streaks
4. **Time Tracking Visualization**: Haunting meter showing estimation accuracy
5. **Collaborative Features**: Share goals with other "night workers"
6. **Mobile App**: React Native version with same theme
7. **Custom Themes**: User-created color schemes within Halloween aesthetic
