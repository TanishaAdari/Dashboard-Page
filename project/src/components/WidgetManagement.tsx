import React, { useState } from 'react';
import { Settings, ChevronRight, Check } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export function WidgetManagement() {
  const { dashboardData, removeWidget } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const allWidgets = dashboardData.categories.flatMap(category =>
    category.widgets.map(widget => ({ ...widget, categoryId: category.id, categoryName: category.name }))
  );

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200 border border-gray-100"
      >
        <Settings className="h-6 w-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Widget Management</h3>
            <p className="text-sm text-gray-600">Manage all your widgets</p>
          </div>
          
          <div className="overflow-y-auto max-h-80 smooth-scroll">
            {dashboardData.categories.map(category => (
              <div key={category.id} className="border-b border-gray-50 last:border-b-0">
                <div className="p-3 bg-gray-50">
                  <h4 className="font-medium text-gray-800 text-sm">{category.name}</h4>
                </div>
                {category.widgets.map(widget => (
                  <div key={widget.id} className="flex items-center justify-between p-3 hover:bg-gray-50 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{widget.name}</p>
                      <p className="text-xs text-gray-500 truncate">{widget.text}</p>
                    </div>
                    <button
                      onClick={() => removeWidget(category.id, widget.id)}
                      className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {category.widgets.length === 0 && (
                  <div className="p-3 text-sm text-gray-400 italic">No widgets in this category</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}