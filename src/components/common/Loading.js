/**
 * Loading Component
 * Reusable loading indicator
 */

'use client';

export default function Loading({ message = 'Loading...', size = 'default' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {message && (
        <p className="text-dark-muted mt-4 text-sm">{message}</p>
      )}
    </div>
  );
}