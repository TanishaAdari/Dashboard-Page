import React from 'react';
import { Search } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useDashboard();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
      />
    </div>
  );
}