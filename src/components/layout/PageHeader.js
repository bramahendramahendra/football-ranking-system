/**
 * Page Header Component
 * Standard page header with title and actions
 */

'use client';

import Breadcrumb from './Breadcrumb';

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumb = [],
  actions = null,
  className = '' 
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-dark-muted">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}