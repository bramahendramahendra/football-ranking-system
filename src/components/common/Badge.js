/**
 * Badge Component
 * Reusable badge for status indicators
 */

'use client';

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'default',
  className = '' 
}) {
  const variantClasses = {
    default: 'badge',
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info',
    primary: 'badge bg-primary/20 text-primary border-primary/30',
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    default: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}