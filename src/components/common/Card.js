/**
 * Card Component
 * Reusable card container
 */

'use client';

export default function Card({ 
  title,
  subtitle,
  children,
  action,
  className = '',
  hoverable = false 
}) {
  return (
    <div className={`
      ${hoverable ? 'card-dark-hover' : 'card-dark'} 
      ${className}
    `}>
      {(title || subtitle || action) && (
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-xl font-bold mb-1">{title}</h3>}
              {subtitle && <p className="text-dark-muted text-sm">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}