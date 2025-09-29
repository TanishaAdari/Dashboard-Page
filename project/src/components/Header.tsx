import React from 'react';
import { Search, RefreshCw, Bell, User, ChevronDown } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export function Header() {
  const { searchQuery, setSearchQuery } = useDashboard();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Home</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">Dashboard V2</span>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">L</span>
              </div>
              <span className="text-gray-700">Last 2 days</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}