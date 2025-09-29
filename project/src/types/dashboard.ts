export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'metric' | 'graph' | 'progress';
  data?: any;
  description?: string;
  customData?: {
    values?: number[];
    labels?: string[];
    colors?: string[];
    chartType?: 'donut' | 'bar' | 'line' | 'area';
  };
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export interface WidgetTemplate {
  id: string;
  name: string;
  category: string;
  type: 'chart' | 'metric' | 'graph' | 'progress';
  selected: boolean;
}

export interface CustomWidget {
  name: string;
  text: string;
  description: string;
  type: 'chart' | 'metric' | 'graph' | 'progress';
  customData?: {
    values?: number[];
    labels?: string[];
    colors?: string[];
    chartType?: 'donut' | 'bar' | 'line' | 'area';
  };
}