/**
 * Tabs Component
 * Reusable tabs navigation
 */

'use client';

import { useState } from 'react';

export default function Tabs({ tabs, defaultTab = 0, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex space-x-1 border-b border-dark-border mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              px-6 py-3 font-medium transition-colors relative
              ${activeTab === index 
                ? 'text-primary' 
                : 'text-dark-muted hover:text-dark-text'}
            `}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}