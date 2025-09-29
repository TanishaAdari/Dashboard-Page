import React, { useState } from 'react';
import { X, Plus, BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { CustomWidget } from '../types/dashboard';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}

export function AddWidgetModal({ isOpen, onClose, categoryId }: AddWidgetModalProps) {
  const { widgetTemplates, toggleWidgetTemplate, addSelectedWidgets, addWidget } = useDashboard();
  const [activeTab, setActiveTab] = useState('CSMP');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customWidget, setCustomWidget] = useState<CustomWidget>({
    name: '',
    text: '',
    description: '',
    type: 'chart',
    customData: {
      values: [],
      labels: [],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      chartType: 'donut'
    }
  });

  const tabs = ['CSMP', 'CWPP', 'Image', 'Ticket'];
  const filteredTemplates = widgetTemplates.filter(template => 
    template.category === activeTab
  );

  const chartTypes = [
    { type: 'donut', icon: PieChart, label: 'Donut Chart' },
    { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
    { type: 'line', icon: TrendingUp, label: 'Line Chart' },
    { type: 'area', icon: Activity, label: 'Area Chart' }
  ];

  const handleConfirm = () => {
    addSelectedWidgets(categoryId);
    onClose();
    resetForm();
  };

  const handleCancel = () => {
    // Reset all selections
    widgetTemplates.forEach(template => {
      if (template.selected) {
        toggleWidgetTemplate(template.id);
      }
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setShowCustomForm(false);
    setCustomWidget({
      name: '',
      text: '',
      description: '',
      type: 'chart',
      customData: {
        values: [],
        labels: [],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        chartType: 'donut'
      }
    });
  };

  const handleCustomWidgetSubmit = () => {
    if (customWidget.name.trim()) {
      addWidget(categoryId, {
        name: customWidget.name,
        text: customWidget.text,
        type: customWidget.type,
        data: customWidget.customData,
        description: customWidget.description
      });
      onClose();
      resetForm();
    }
  };

  const addDataPoint = () => {
    setCustomWidget(prev => ({
      ...prev,
      customData: {
        ...prev.customData,
        values: [...(prev.customData?.values || []), 0],
        labels: [...(prev.customData?.labels || []), '']
      }
    }));
  };

  const updateDataPoint = (index: number, field: 'value' | 'label', newValue: string | number) => {
    setCustomWidget(prev => ({
      ...prev,
      customData: {
        ...prev.customData,
        [field === 'value' ? 'values' : 'labels']: prev.customData?.[field === 'value' ? 'values' : 'labels']?.map((item, i) => 
          i === index ? newValue : item
        ) || []
      }
    }));
  };

  const removeDataPoint = (index: number) => {
    setCustomWidget(prev => ({
      ...prev,
      customData: {
        ...prev.customData,
        values: prev.customData?.values?.filter((_, i) => i !== index) || [],
        labels: prev.customData?.labels?.filter((_, i) => i !== index) || []
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-xl font-semibold">Add Widget</h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <p className="text-gray-600 mb-6">
            Personalise your dashboard by adding the following widget
          </p>

          {/* Toggle between templates and custom */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setShowCustomForm(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !showCustomForm
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Choose from Templates
            </button>
            <button
              onClick={() => setShowCustomForm(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showCustomForm
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Create Custom Widget
            </button>
          </div>

          {!showCustomForm ? (
            <>
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Widget List */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {filteredTemplates.map((template) => (
                  <label
                    key={template.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={template.selected}
                      onChange={() => toggleWidgetTemplate(template.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-900 font-medium">{template.name}</span>
                  </label>
                ))}
              </div>
            </>
          ) : (
            /* Custom Widget Form */
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget Name *
                  </label>
                  <input
                    type="text"
                    value={customWidget.name}
                    onChange={(e) => setCustomWidget(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter widget name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget Type
                  </label>
                  <select
                    value={customWidget.type}
                    onChange={(e) => setCustomWidget(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="chart">Chart</option>
                    <option value="metric">Metric</option>
                    <option value="graph">Graph</option>
                    <option value="progress">Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Widget Text/Content
                </label>
                <textarea
                  value={customWidget.text}
                  onChange={(e) => setCustomWidget(prev => ({ ...prev, text: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter widget content or description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Description
                </label>
                <textarea
                  value={customWidget.description}
                  onChange={(e) => setCustomWidget(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional information about this widget"
                />
              </div>

              {/* Chart Configuration */}
              {customWidget.type === 'chart' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Chart Configuration</h4>
                  
                  {/* Chart Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chart Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {chartTypes.map(({ type, icon: Icon, label }) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setCustomWidget(prev => ({
                            ...prev,
                            customData: { ...prev.customData, chartType: type as any }
                          }))}
                          className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                            customWidget.customData?.chartType === type
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Data Points */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Data Points
                      </label>
                      <button
                        type="button"
                        onClick={addDataPoint}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Point</span>
                      </button>
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {customWidget.customData?.labels?.map((label, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={label}
                            onChange={(e) => updateDataPoint(index, 'label', e.target.value)}
                            placeholder="Label"
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            value={customWidget.customData?.values?.[index] || 0}
                            onChange={(e) => updateDataPoint(index, 'value', parseInt(e.target.value) || 0)}
                            placeholder="Value"
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeDataPoint(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={showCustomForm ? handleCustomWidgetSubmit : handleConfirm}
            disabled={showCustomForm && !customWidget.name.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showCustomForm ? 'Create Widget' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}