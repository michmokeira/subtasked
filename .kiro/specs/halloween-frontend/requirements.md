# Requirements Document

## Introduction

Subtasked: Night Shift is a Halloween-themed productivity application designed for "night workers" and "haunted procrastinators." The application transforms the existing Subtasked backend into an immersive, dark, and moody experience where unfinished tasks haunt users until completion. The frontend integrates with the existing FastAPI backend to provide task management, goal tracking, daily planning, and review features with a spooky aesthetic that maintains professional functionality.

## Glossary

- **Night Shift UI**: The Halloween-themed user interface system
- **Haunting System**: Visual feedback mechanism for incomplete or overdue tasks
- **Moon Phase Indicator**: Progress visualization component showing task completion status
- **Ghost Animation**: Visual effect applied to incomplete tasks
- **Completion Flash**: Screen animation triggered when tasks are marked complete
- **Deep Work Subtask**: A subtask marked with focus_level "deep" requiring concentrated effort
- **Shallow Work Subtask**: A subtask marked with focus_level "shallow" requiring minimal focus
- **Exorcism Log**: The themed daily review entry interface
- **Candle Flame Loader**: Loading state animation using flickering candle visual
- **Full Haunt Mode**: Enhanced animation and effect setting
- **Casual Dark Mode**: Minimal animation setting with dark theme
- **Backend API**: The existing FastAPI service providing data operations
- **Kiro Agent Hook**: Automated agent execution triggered by user actions

## Requirements

### Requirement 1

**User Story:** As a night worker, I want to see a dark, Halloween-themed interface immediately upon loading the application, so that I feel immersed in the Night Shift experience.

#### Acceptance Criteria

1. WHEN the application loads, THE Night Shift UI SHALL display a jet black (#0a0a0a) background with deep purple (#1e0e2a) gradients
2. WHEN the application loads, THE Night Shift UI SHALL apply neon orange (#ff7b00) accent colors to interactive elements
3. WHEN the application loads, THE Night Shift UI SHALL render headings using a spooky serif font and body text using Inter font
4. WHEN the application loads, THE Night Shift UI SHALL display the title "Subtasked: Night Shift" with Halloween-themed styling

### Requirement 2

**User Story:** As a user, I want to create, view, and complete tasks with Halloween-themed visuals, so that task management feels engaging and thematic.

#### Acceptance Criteria

1. WHEN I create a new task, THE Night Shift UI SHALL display a bat animation flying across the top bar
2. WHEN I view the tasks page, THE Night Shift UI SHALL render each task with ghost icons and dark card styling
3. WHEN I mark a task as complete, THE Night Shift UI SHALL trigger a Completion Flash with orange and purple colors
4. WHEN I mark a task as complete, THE Night Shift UI SHALL display the message "You've earned another day... for now."
5. WHEN I delete a task, THE Night Shift UI SHALL animate a ghost drifting away and fading out

### Requirement 3

**User Story:** As a user, I want to see visual distinctions between deep work and shallow work subtasks, so that I can prioritize my focus appropriately.

#### Acceptance Criteria

1. WHEN a subtask has focus_level "deep", THE Night Shift UI SHALL render the checkbox with a glowing purple effect
2. WHEN a subtask has focus_level "shallow", THE Night Shift UI SHALL render the checkbox with an orange effect
3. WHEN all subtasks are completed, THE Night Shift UI SHALL animate the parent task releasing its spirit with a fade and float effect
4. WHEN I view subtasks, THE Night Shift UI SHALL display focus level indicators next to each subtask title

### Requirement 4

**User Story:** As a user, I want to see a moon phase indicator on the dashboard showing my daily progress, so that I can visualize my task completion status.

#### Acceptance Criteria

1. WHEN I view the dashboard, THE Night Shift UI SHALL display a Moon Phase Indicator component
2. WHEN I have zero incomplete tasks, THE Moon Phase Indicator SHALL render a full moon visual
3. WHEN I have incomplete tasks, THE Moon Phase Indicator SHALL render a moon phase proportional to completion percentage
4. WHEN the moon phase changes, THE Moon Phase Indicator SHALL animate the transition smoothly

### Requirement 5

**User Story:** As a user, I want incomplete tasks to appear ghostly and haunting after inactivity, so that I am reminded to complete them.

#### Acceptance Criteria

1. WHEN a task remains incomplete for more than 5 minutes, THE Haunting System SHALL reduce the task opacity to 60%
2. WHEN a task remains incomplete for more than 5 minutes, THE Haunting System SHALL apply a subtle floating Ghost Animation
3. WHEN I interact with a haunted task, THE Haunting System SHALL restore full opacity
4. WHILE viewing the tasks page, THE Haunting System SHALL continuously monitor task inactivity

### Requirement 6

**User Story:** As a user, I want to see goals represented as flickering candles, so that goal tracking feels thematic and visually engaging.

#### Acceptance Criteria

1. WHEN I view the goals page, THE Night Shift UI SHALL render each goal as a candle icon with flickering animation
2. WHEN a goal is marked complete, THE Night Shift UI SHALL animate the candle burning out with a fade effect
3. WHEN I hover over a goal card, THE Night Shift UI SHALL increase the candle glow intensity
4. WHEN I create a new goal, THE Night Shift UI SHALL animate a candle lighting up

### Requirement 7

**User Story:** As a user, I want the planner page background to darken gradually as I work, so that the night shift deepening effect enhances focus.

#### Acceptance Criteria

1. WHEN I open the planner page, THE Night Shift UI SHALL initialize the background at base darkness level
2. WHILE the planner page is active for more than 10 minutes, THE Night Shift UI SHALL gradually darken the background by 10% every 10 minutes
3. WHEN the background reaches maximum darkness, THE Night Shift UI SHALL stop darkening
4. WHEN I navigate away from the planner page, THE Night Shift UI SHALL reset the darkness level

### Requirement 8

**User Story:** As a user, I want to see loading states with candle flame animations, so that waiting feels thematic rather than generic.

#### Acceptance Criteria

1. WHEN data is loading from the Backend API, THE Night Shift UI SHALL display a Candle Flame Loader animation
2. WHEN data is loading, THE Night Shift UI SHALL display thematic loading text such as "Summoning your tasks..."
3. WHEN loading completes, THE Candle Flame Loader SHALL fade out smoothly
4. WHEN an error occurs during loading, THE Night Shift UI SHALL display a themed error message

### Requirement 9

**User Story:** As a user, I want to see spooky empty state messages when no data exists, so that the theme remains consistent throughout the application.

#### Acceptance Criteria

1. WHEN no tasks exist, THE Night Shift UI SHALL display "The graveyard is empty... for now 💀"
2. WHEN no goals exist, THE Night Shift UI SHALL display "No candles lit yet... start a new goal"
3. WHEN no planner entries exist, THE Night Shift UI SHALL display "The night shift awaits your plans..."
4. WHEN no review entries exist, THE Night Shift UI SHALL display "No exorcisms logged yet"

### Requirement 10

**User Story:** As a user, I want smooth page transitions with fog and shadow effects, so that navigation feels immersive.

#### Acceptance Criteria

1. WHEN I navigate between pages, THE Night Shift UI SHALL animate the transition with a fog effect using Framer Motion
2. WHEN I navigate between pages, THE Night Shift UI SHALL slide content from the shadows with easing
3. WHEN a page loads, THE Night Shift UI SHALL fade in content over 300 milliseconds
4. WHEN I navigate, THE Night Shift UI SHALL maintain consistent animation timing across all routes

### Requirement 11

**User Story:** As a user, I want interactive elements to glow and pulse on hover, so that the interface feels responsive and eerie.

#### Acceptance Criteria

1. WHEN I hover over a button, THE Night Shift UI SHALL apply a neon orange glow effect
2. WHEN I hover over a sidebar item, THE Night Shift UI SHALL pulse the glow with 1.5 second duration
3. WHEN I hover over a task card, THE Night Shift UI SHALL increase the card shadow and apply subtle scale transform
4. WHEN I move the cursor away, THE Night Shift UI SHALL reverse the hover effect smoothly

### Requirement 12

**User Story:** As a user, I want to toggle between Casual Dark and Full Haunt Mode, so that I can control the intensity of animations and effects.

#### Acceptance Criteria

1. WHEN I access settings, THE Night Shift UI SHALL display a toggle for Casual Dark Mode and Full Haunt Mode
2. WHEN I enable Full Haunt Mode, THE Night Shift UI SHALL activate all Ghost Animations and Haunting System features
3. WHEN I enable Casual Dark Mode, THE Night Shift UI SHALL disable Ghost Animations and reduce animation frequency
4. WHEN I change the mode, THE Night Shift UI SHALL persist the setting in local storage

### Requirement 13

**User Story:** As a user, I want the review page to be themed as an "Exorcism Log," so that daily reflections feel integrated with the Halloween theme.

#### Acceptance Criteria

1. WHEN I view the review page, THE Night Shift UI SHALL display the heading "Exorcism Log"
2. WHEN I create a review entry, THE Night Shift UI SHALL label fields as "Demons Banished," "Lessons from the Shadows," and "Midnight Improvements"
3. WHEN I submit a review, THE Night Shift UI SHALL display a confirmation message "Your exorcism has been recorded"
4. WHEN I view past reviews, THE Night Shift UI SHALL render entries with journal-style dark cards

### Requirement 14

**User Story:** As a user, I want a Kiro agent hook to provide spooky motivational quotes, so that I receive themed encouragement during task completion.

#### Acceptance Criteria

1. WHEN I complete a task, THE Kiro Agent Hook SHALL generate a spooky motivational phrase
2. WHEN the phrase is generated, THE Night Shift UI SHALL display it in a toast notification with eerie styling
3. WHEN I complete multiple tasks, THE Kiro Agent Hook SHALL provide varied phrases without repetition
4. WHEN the hook executes, THE Kiro Agent Hook SHALL log the event for demonstration purposes

### Requirement 15

**User Story:** As a user, I want all API interactions to connect to the existing FastAPI backend, so that data persists correctly across sessions.

#### Acceptance Criteria

1. WHEN I create a task, THE Night Shift UI SHALL send a POST request to the Backend API at /tasks endpoint
2. WHEN I fetch tasks, THE Night Shift UI SHALL send a GET request to the Backend API at /tasks endpoint
3. WHEN I complete a task, THE Night Shift UI SHALL send a PATCH request to the Backend API at /tasks/{task_id}/complete endpoint
4. WHEN I create a subtask, THE Night Shift UI SHALL send a POST request to the Backend API at /tasks/{task_id}/subtasks endpoint
5. WHEN API requests fail, THE Night Shift UI SHALL display themed error messages and retry options
