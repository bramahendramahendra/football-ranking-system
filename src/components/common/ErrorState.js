/**
 * Error State Component
 * Display error messages
 */

'use client';

import { AlertCircle } from 'lucide-react';

export default function ErrorState({ 
  error,
  title = 'Something went wrong',
  retry = null 
}) {
  const message = error?.message || error?.response?.data?.message || 'An unexpected error occurred';

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-danger/20 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-dark-muted mb-4 max-w-md">{message}</p>
      {retry && (
        <button onClick={retry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}