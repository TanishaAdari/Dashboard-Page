import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Category as CategoryType } from '../types/dashboard';
import { Widget } from './Widget';
import { AddWidgetModal } from './AddWidgetModal';
import { useDashboard } from '../context/DashboardContext';

interface CategoryProps {
  category: CategoryType;
}

export function Category({ category }: CategoryProps) {
  const { removeWidget } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Add Widget</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={removeWidget}
          />
        ))}
        <Widget
          widget={{} as any}
          categoryId={category.id}
          onRemove={() => {}}
          showAddButton={true}
          onAddClick={() => setIsModalOpen(true)}
        />
      </div>
      
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={category.id}
      />
    </div>
  );
}