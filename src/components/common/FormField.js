/**
 * Form Field Component
 * Reusable form input with label and error
 */

'use client';

export default function FormField({ 
  label, 
  error, 
  required = false,
  children,
  className = '' 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}