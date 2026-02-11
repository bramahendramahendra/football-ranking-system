/**
 * Empty State Component
 * Display when no data available
 */

'use client';

import { Inbox } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'There are no items to display',
  action = null 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-dark-hover flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-dark-muted" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-dark-muted mb-4 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}