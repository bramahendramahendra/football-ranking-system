/**
 * Section Component
 * Content section wrapper
 */

'use client';

export default function Section({ 
  title, 
  subtitle,
  action,
  children,
  className = '' 
}) {
  return (
    <section className={`mb-8 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && (
              <h2 className="text-2xl font-bold mb-1">{title}</h2>
            )}
            {subtitle && (
              <p className="text-dark-muted">{subtitle}</p>
            )}
          </div>
          {action && (
            <div>{action}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}