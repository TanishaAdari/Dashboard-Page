import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DashboardData, Category, Widget, WidgetTemplate } from '../types/dashboard';

interface DashboardContextType {
  dashboardData: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredWidgets: Widget[];
  widgetTemplates: WidgetTemplate[];
  toggleWidgetTemplate: (templateId: string) => void;
  addSelectedWidgets: (categoryId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialData: DashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2)\nNot Connected (2)',
          type: 'chart',
          data: { connected: 2, total: 4 }
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)',
          type: 'chart',
          data: { failed: 1689, warning: 681, notAvailable: 36, passed: 7253, total: 9659 }
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'graph'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'graph'
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities\nCritical (9)\nHigh (150)',
          type: 'progress',
          data: { total: 1470, critical: 9, high: 150 }
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images\nCritical (2)\nHigh (2)',
          type: 'progress',
          data: { total: 2, critical: 2, high: 2 }
        }
      ]
    }
  ]
};

const widgetTemplatesData: WidgetTemplate[] = [
  { id: 'cloud-accounts', name: 'Cloud Accounts', category: 'CSPM', type: 'chart', selected: false },
  { id: 'cloud-risk-assessment', name: 'Cloud Account Risk Assessment', category: 'CSPM', type: 'chart', selected: false },
  { id: 'namespace-alerts', name: 'Top 5 Namespace Specific Alerts', category: 'CWPP', type: 'graph', selected: false },
  { id: 'workload-alerts', name: 'Workload Alerts', category: 'CWPP', type: 'graph', selected: false },
  { id: 'image-risk-assessment', name: 'Image Risk Assessment', category: 'Image', type: 'progress', selected: false },
  { id: 'image-security-issues', name: 'Image Security Issues', category: 'Image', type: 'progress', selected: false },
  { id: 'ticket-overview', name: 'Ticket Overview', category: 'Ticket', type: 'metric', selected: false }
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [widgetTemplates, setWidgetTemplates] = useState<WidgetTemplate[]>(widgetTemplatesData);

  const addWidget = (categoryId: string, widget: Omit<Widget, 'id'>) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
          : category
      )
    }));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setDashboardData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const toggleWidgetTemplate = (templateId: string) => {
    setWidgetTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, selected: !template.selected }
          : template
      )
    );
  };

  const addSelectedWidgets = (categoryId: string) => {
    const selectedTemplates = widgetTemplates.filter(template => template.selected);
    
    selectedTemplates.forEach(template => {
      const newWidget: Widget = {
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: template.name,
        text: getDefaultWidgetText(template.name),
        type: template.type
      };
      
      setDashboardData(prev => ({
        ...prev,
        categories: prev.categories.map(category =>
          category.id === categoryId
            ? { ...category, widgets: [...category.widgets, newWidget] }
            : category
        )
      }));
    });

    // Reset selections
    setWidgetTemplates(prev =>
      prev.map(template => ({ ...template, selected: false }))
    );
  };

  const getDefaultWidgetText = (widgetName: string): string => {
    switch (widgetName) {
      case 'Cloud Accounts':
        return 'Connected (2)\nNot Connected (2)';
      case 'Cloud Account Risk Assessment':
        return 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)';
      case 'Top 5 Namespace Specific Alerts':
      case 'Workload Alerts':
        return 'No Graph data available!';
      case 'Image Risk Assessment':
        return '1470 Total Vulnerabilities\nCritical (9)\nHigh (150)';
      case 'Image Security Issues':
        return '2 Total Images\nCritical (2)\nHigh (2)';
      default:
        return 'Widget data will be displayed here';
    }
  };

  const filteredWidgets = dashboardData.categories.flatMap(category =>
    category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        addWidget,
        removeWidget,
        addCategory,
        searchQuery,
        setSearchQuery,
        filteredWidgets,
        widgetTemplates,
        toggleWidgetTemplate,
        addSelectedWidgets
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}