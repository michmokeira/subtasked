# Implementation Plan

- [x] 1. Set up Halloween theme foundation and dependencies






  - Install Framer Motion for animations
  - Configure Tailwind CSS with Halloween color palette (jet-black, deep-purple, neon-orange, muted-grey)
  - Add Google Fonts import for Creepster and Inter fonts
  - Create global CSS styles with Halloween theme (gradients, scrollbar styling)
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Implement Theme Context and Provider





  - Create ThemeContext with mode state ('casual-dark' | 'full-haunt')
  - Implement localStorage persistence for theme mode
  - Create ThemeProvider component wrapping the application
  - Export useTheme hook for consuming theme state
  - _Requirements: 12.1, 12.4_

- [x] 3. Build API service layer





  - Create API client with fetch wrapper for GET, POST, PATCH, DELETE methods
  - Implement taskService with getAll, getById, create, complete, delete functions
  - Implement subtaskService with create and complete functions
  - Implement goalService with getAll, getById, create, delete functions
  - Implement reviewService with getAll and create functions
  - Implement plannerService with getAll and create functions
  - Add error handling with themed error messages
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 4. Create shared animation components





- [x] 4.1 Build CompletionFlash component


  - Create full-screen flash animation with Framer Motion
  - Implement radial gradient background (orange to purple)
  - Display "You've earned another day... for now." message during flash
  - Add 600ms animation duration with opacity keyframes
  - _Requirements: 2.3, 2.4_

- [x] 4.2 Build BatAnimation component


  - Create bat SVG icon
  - Implement Framer Motion path animation from left to right
  - Add 2-second animation duration with easing
  - Position animation across top of viewport
  - _Requirements: 2.1_

- [x] 4.3 Build GhostDrift component


  - Create ghost drift animation wrapper
  - Implement fade out and upward float effect
  - Add 1.5-second animation duration
  - _Requirements: 2.5_

- [x] 4.4 Build FogTransition component


  - Create page transition wrapper with Framer Motion
  - Implement fade and slide animations
  - Add 300ms transition duration
  - Apply to route changes
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 5. Create loading and empty state components




- [x] 5.1 Build CandleFlameLoader component


  - Create candle SVG with flame
  - Implement CSS keyframe flicker animation
  - Add loading message prop with default "Summoning your tasks..."
  - Style with Halloween theme colors
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 5.2 Build EmptyState component


  - Create component accepting type prop (tasks, goals, planner, reviews)
  - Map themed messages for each type
  - Add optional action button
  - Style with dark cards and spooky icons
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 6. Build ToastNotification system
  - Create ToastNotification component with message, type, and duration props
  - Implement toast container with positioning
  - Add spooky type with ghost icon and gradient background
  - Create showToast utility function
  - Add auto-dismiss after duration
  - Style with eerie effects and animations
  - _Requirements: 14.2, 8.4_

- [ ] 7. Create MoonPhaseIndicator component
  - Build SVG-based moon visualization
  - Implement phase calculation based on completion percentage
  - Create clip-path logic for moon phases (new moon, crescent, half, gibbous, full)
  - Add smooth transition animations between phases
  - Style with glowing effects
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 8. Build SubtaskItem component
  - Create component accepting subtask and onToggle props
  - Implement checkbox with focus level styling (purple glow for deep, orange for shallow)
  - Add focus level indicator badge
  - Implement completion animation
  - Add hover effects
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 9. Build TaskCard component
  - Create component accepting task, onComplete, onDelete, isHaunted props
  - Implement task display with title, description, time estimates
  - Render subtasks using SubtaskItem component
  - Add completion and delete action buttons
  - Implement haunted state styling (60% opacity, floating animation)
  - Add hover effects (scale, shadow)
  - Implement spirit release animation when all subtasks complete
  - _Requirements: 2.2, 3.3, 5.1, 5.2, 5.3, 11.3_

- [ ] 10. Build GoalCard component
  - Create component accepting goal and action handlers
  - Implement candle icon with flicker animation
  - Add goal title, description, and deadline display
  - Implement candle burn-out animation on completion
  - Add hover glow intensity increase
  - Implement candle lighting animation on creation
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 11. Update MainLayout component
  - Wrap layout with ThemeProvider
  - Add ToastContainer to layout
  - Implement FogTransition wrapper for Outlet
  - Ensure responsive behavior for sidebar and bottom nav
  - Apply Halloween theme styling
  - _Requirements: 1.1, 1.2, 1.4_

- [ ] 12. Update Sidebar component
  - Replace icons with Halloween-themed icons (ghost, pumpkin, bat, candle, skull, gear)
  - Implement glow pulse hover effect with Framer Motion
  - Add neon orange glow on hover
  - Set 1.5-second pulse duration
  - Style with dark background and themed colors
  - _Requirements: 11.1, 11.2_

- [ ] 13. Implement Dashboard page
  - Add "Subtasked: Night Shift" title with spooky font
  - Integrate MoonPhaseIndicator component
  - Create StatCard components for task and goal counts
  - Fetch and display recent tasks (top 5)
  - Add loading state with CandleFlameLoader
  - Implement empty state handling
  - Apply FogTransition wrapper
  - _Requirements: 1.4, 4.1, 4.2, 4.3, 4.4_

- [ ] 14. Implement Tasks page
  - Create task list layout with "Tasks" heading
  - Add "New Task" button with modal
  - Fetch tasks from API on mount
  - Render TaskCard components for each task
  - Implement task creation with BatAnimation trigger
  - Implement task completion with CompletionFlash and toast
  - Implement task deletion with GhostDrift animation
  - Add haunting system timer (5-minute inactivity check)
  - Implement haunting state management
  - Add loading and empty states
  - Apply FogTransition wrapper
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.1, 5.2, 5.3, 5.4, 15.1, 15.2, 15.3_

- [ ] 15. Implement Goals page
  - Create goals grid layout with "Goals" heading
  - Add "New Goal" button with modal
  - Fetch goals from API on mount
  - Render GoalCard components for each goal
  - Implement goal creation with candle lighting animation
  - Implement goal deletion
  - Add loading and empty states
  - Apply FogTransition wrapper
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 9.2, 15.5_

- [ ] 16. Implement Planner page
  - Create planner layout with "Night Shift Planner" heading
  - Add date selector component
  - Implement planned tasks text area
  - Implement notes text area
  - Add save button for planner log creation
  - Fetch planner logs from API
  - Display past planner entries
  - Implement background darkening timer (10% every 10 minutes)
  - Reset darkness on page unmount
  - Add loading and empty states
  - Apply FogTransition wrapper
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 9.3, 15.5_

- [ ] 17. Implement Review page (Exorcism Log)
  - Create review layout with "Exorcism Log" heading
  - Add "New Entry" button
  - Create form with themed field labels ("Demons Banished", "Lessons from the Shadows", "Midnight Improvements")
  - Implement review entry submission
  - Display confirmation message "Your exorcism has been recorded"
  - Fetch and display past review entries with journal-style cards
  - Add loading and empty states
  - Apply FogTransition wrapper
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 9.4, 15.5_

- [ ] 18. Implement Settings page
  - Create settings layout with "Settings" heading
  - Add Appearance section with theme mode toggle
  - Implement radio buttons for Casual Dark and Full Haunt Mode
  - Connect toggle to ThemeContext setMode function
  - Add visual feedback for selected mode
  - Apply FogTransition wrapper
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 19. Implement Kiro agent hook integration
  - Create .kiro/hooks/task-completion-quotes.js file
  - Implement getRandomQuote function with spooky quotes array
  - Create .kiro/hooks/config.json with hook configuration
  - Integrate hook call in task completion handler
  - Display quote in toast notification with spooky styling
  - Ensure varied phrases without repetition
  - Add logging for demonstration
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 20. Create Kiro steering document
  - Create .kiro/steering/halloween-theme-guide.md file
  - Document tone and voice guidelines
  - Document visual consistency rules
  - Document copy guidelines for different UI elements
  - Include color palette reference
  - Add animation performance notes
  - _Requirements: 14.4_

- [ ] 21. Implement hover effects across all interactive elements
  - Add glow effect to all buttons
  - Implement smooth transition reversals
  - Ensure consistent timing across components
  - Test hover states on all interactive elements
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 22. Add responsive design and mobile optimization
  - Test all pages on mobile viewport
  - Ensure BottomNav displays correctly on mobile
  - Verify sidebar collapses appropriately
  - Test touch interactions for all components
  - Optimize animations for mobile performance
  - _Requirements: 1.1, 1.2_

- [ ] 23. Implement accessibility features
  - Add aria-labels to icon-only buttons
  - Ensure keyboard navigation works for all interactive elements
  - Add focus indicators with orange glow
  - Implement prefers-reduced-motion media query
  - Test color contrast ratios for WCAG AA compliance
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 24. Final integration testing and polish
  - Test complete user flow: create task → add subtasks → complete → delete
  - Test goal creation and linking to tasks
  - Test planner log creation and viewing
  - Test review entry creation
  - Verify theme mode toggle persists across refreshes
  - Test all API integrations with backend running
  - Verify all animations run smoothly at 60fps
  - Test haunting system activation after 5 minutes
  - Verify moon phase calculation accuracy
  - Test error handling with themed messages
  - _Requirements: All_
