import { Ghost, ListTodo, Skull, Flame, Calendar, Settings } from 'lucide-react';

export const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Ghost,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: ListTodo,
  },
  {
    label: 'Goals',
    path: '/goals',
    icon: Flame,
  },
  {
    label: 'Planner',
    path: '/planner',
    icon: Calendar,
  },
  {
    label: 'Review',
    path: '/review',
    icon: Skull,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];
