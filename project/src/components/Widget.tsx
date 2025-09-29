import React from 'react';
import { X, Plus } from 'lucide-react';
import { Widget as WidgetType } from '../types/dashboard';

interface WidgetProps {
  widget: WidgetType;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export function Widget({ widget, categoryId, onRemove, showAddButton, onAddClick }: WidgetProps) {
  if (showAddButton) {
    return (
      <div 
        onClick={onAddClick}
        className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-200 cursor-pointer group min-h-[200px] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
            <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500" />
          </div>
          <span className="text-gray-500 group-hover:text-blue-600 font-medium">Add Widget</span>
        </div>
      </div>
    );
  }

  const renderWidgetContent = () => {
    // Handle custom widgets with user-defined data
    if (widget.data && widget.data.values && widget.data.labels) {
      const { values, labels, chartType, colors } = widget.data;
      const total = values.reduce((sum: number, val: number) => sum + val, 0);
      
      if (chartType === 'donut' && widget.type === 'chart') {
        return (
          <div className="flex items-center justify-center h-32">
            <div className="relative">
              <svg width="120" height="120" className="transform -rotate-90">
                <circle cx="60" cy="60" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                {values.map((value: number, index: number) => {
                  const percentage = (value / total) * 100;
                  const strokeDasharray = `${(percentage / 100) * 283} 283`;
                  const strokeDashoffset = index > 0 
                    ? -values.slice(0, index).reduce((sum: number, val: number) => sum + (val / total) * 283, 0)
                    : 0;
                  
                  return (
                    <circle
                      key={index}
                      cx="60"
                      cy="60"
                      r="45"
                      stroke={colors?.[index] || '#3B82F6'}
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-gray-900">{total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <div className="ml-6 space-y-1">
              {labels.map((label: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colors?.[index] || '#3B82F6' }}
                  ></div>
                  <span className="text-sm text-gray-700">{label} ({values[index]})</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      if (chartType === 'bar' && widget.type === 'chart') {
        const maxValue = Math.max(...values);
        return (
          <div className="h-32 flex items-end justify-center space-x-2 px-4">
            {values.map((value: number, index: number) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div
                  className="w-8 rounded-t transition-all duration-300"
                  style={{
                    height: `${(value / maxValue) * 80}px`,
                    backgroundColor: colors?.[index] || '#3B82F6',
                    minHeight: '4px'
                  }}
                ></div>
                <span className="text-xs text-gray-600 transform rotate-45 origin-left">
                  {labels[index]}
                </span>
              </div>
            ))}
          </div>
        );
      }
    }

    switch (widget.type) {
      case 'chart':
        if (widget.name === 'Cloud Accounts') {
          return (
            <div className="flex items-center justify-center h-32">
              <div className="relative">
                <svg width="120" height="120" className="transform -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(2/4) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Connected (2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-700">Not Connected (2)</span>
                </div>
              </div>
            </div>
          );
        } else if (widget.name === 'Cloud Account Risk Assessment') {
          return (
            <div className="flex items-center justify-center h-32">
              <div className="relative">
                <svg width="120" height="120" className="transform -rotate-90">
                  <circle cx="60" cy="60" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="45" stroke="#dc2626" strokeWidth="10" fill="none"
                    strokeDasharray="70 283" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="45" stroke="#f59e0b" strokeWidth="10" fill="none"
                    strokeDasharray="30 283" strokeDashoffset="-70" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="45" stroke="#10b981" strokeWidth="10" fill="none"
                    strokeDasharray="183 283" strokeDashoffset="-100" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold text-gray-900">9659</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Failed (1689)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Warning (681)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Not available (36)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Passed (7253)</span>
                </div>
              </div>
            </div>
          );
        }
        break;
      
      case 'graph':
        return (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <svg width="60" height="40" viewBox="0 0 60 40" className="mb-3">
              <path d="M5 35 L15 25 L25 30 L35 15 L45 20 L55 10" 
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="5" cy="35" r="2" fill="currentColor"/>
              <circle cx="15" cy="25" r="2" fill="currentColor"/>
              <circle cx="25" cy="30" r="2" fill="currentColor"/>
              <circle cx="35" cy="15" r="2" fill="currentColor"/>
              <circle cx="45" cy="20" r="2" fill="currentColor"/>
              <circle cx="55" cy="10" r="2" fill="currentColor"/>
            </svg>
            <span className="text-sm">No Graph data available!</span>
          </div>
        );
      
      case 'progress':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">
                {widget.name.includes('Risk Assessment') ? '1470' : '2'}
              </span>
              <span className="text-sm text-gray-500">
                {widget.name.includes('Risk Assessment') ? 'Total Vulnerabilities' : 'Total Images'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full" 
                  style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Critical ({widget.name.includes('Risk Assessment') ? '9' : '2'})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>High ({widget.name.includes('Risk Assessment') ? '150' : '2'})</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p className="whitespace-pre-line">{widget.text}</p>
            {widget.description && (
              <p className="text-xs text-gray-400 mt-2 italic">{widget.description}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-gray-900 text-sm">{widget.name}</h3>
          <button
            onClick={() => onRemove(categoryId, widget.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-red-50 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {renderWidgetContent()}
      </div>
    </div>
  );
}