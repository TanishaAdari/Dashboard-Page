import React from 'react';
import { useDashboard } from '../context/DashboardContext';

export function SearchResults() {
  const { searchQuery, filteredWidgets, dashboardData } = useDashboard();

  if (!searchQuery) return null;

  const getWidgetCategory = (widgetId: string) => {
    for (const category of dashboardData.categories) {
      if (category.widgets.some(widget => widget.id === widgetId)) {
        return category.name;
      }
    }
    return '';
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Search Results ({filteredWidgets.length})
      </h2>
      <div className="text-sm text-gray-600 mb-6">
        Showing results for "<span className="font-medium text-gray-900">{searchQuery}</span>"
      </div>
      
      {filteredWidgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWidgets.map((widget) => (
            <div key={widget.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{widget.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {getWidgetCategory(widget.id)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{widget.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No widgets found</div>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}