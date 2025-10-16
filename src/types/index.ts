export interface Campaign {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  status: 'Active' | 'Paused';
  createdAt: string;
  budget: number;
}

export interface ChartDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export type FilterStatus = 'all' | 'Active' | 'Paused';
export type DateRange = '7d' | '30d' | '90d' | 'all';

export interface PromptResult {
  type: 'filter' | 'highlight' | 'sort' | 'info';
  campaigns: Campaign[];
  message: string;
  highlightedId?: string;
}

