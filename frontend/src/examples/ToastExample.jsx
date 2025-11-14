// src/examples/ToastExample.jsx
// This is an example component showing how to use the toast system
// You can delete this file after understanding the usage

import { useToast } from '../contexts/ToastContext';

export default function ToastExample() {
  const { showToast } = useToast();

  const handleShowInfo = () => {
    showToast({
      message: 'This is an info message',
      type: 'info',
      duration: 3000
    });
  };

  const handleShowSuccess = () => {
    showToast({
      message: 'Task completed successfully!',
      type: 'success',
      duration: 3000
    });
  };

  const handleShowError = () => {
    showToast({
      message: 'Lost in the fog... check your connection',
      type: 'error',
      duration: 3000
    });
  };

  const handleShowSpooky = () => {
    showToast({
      message: "You've earned another day... for now.",
      type: 'spooky',
      duration: 3000
    });
  };

  const handleShowPersistent = () => {
    showToast({
      message: 'This toast stays until you close it',
      type: 'info',
      duration: 0 // 0 means no auto-dismiss
    });
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Toast Notification Examples</h2>
      
      <div className="space-y-2">
        <button
          onClick={handleShowInfo}
          className="block w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Show Info Toast
        </button>
        
        <button
          onClick={handleShowSuccess}
          className="block w-full bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Show Success Toast
        </button>
        
        <button
          onClick={handleShowError}
          className="block w-full bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Show Error Toast
        </button>
        
        <button
          onClick={handleShowSpooky}
          className="block w-full bg-gradient-to-r from-deep-purple to-neon-orange text-white px-4 py-2 rounded"
        >
          Show Spooky Toast 👻
        </button>
        
        <button
          onClick={handleShowPersistent}
          className="block w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Show Persistent Toast (No Auto-Dismiss)
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded">
        <h3 className="text-lg font-semibold mb-2">Usage:</h3>
        <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { useToast } from '../contexts/ToastContext';

function MyComponent() {
  const { showToast } = useToast();

  const handleAction = () => {
    showToast({
      message: 'Your message here',
      type: 'spooky', // 'info' | 'success' | 'error' | 'spooky'
      duration: 3000  // milliseconds, 0 for no auto-dismiss
    });
  };

  return <button onClick={handleAction}>Show Toast</button>;
}`}
        </pre>
      </div>
    </div>
  );
}
