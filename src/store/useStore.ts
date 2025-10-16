import { create } from 'zustand';
import type { Campaign, FilterStatus, DateRange } from '../types';
import { mockCampaigns } from '../data/mockData';

interface StoreState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  filterStatus: FilterStatus;
  dateRange: DateRange;
  searchQuery: string;
  highlightedCampaignId: string | null;
  
  // Actions
  setCampaigns: (campaigns: Campaign[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilterStatus: (status: FilterStatus) => void;
  setDateRange: (range: DateRange) => void;
  setSearchQuery: (query: string) => void;
  setHighlightedCampaignId: (id: string | null) => void;
  fetchCampaigns: () => Promise<() => void>;
  getFilteredCampaigns: () => Campaign[];
}

export const useStore = create<StoreState>((set, get) => ({
  campaigns: [],
  loading: false,
  error: null,
  filterStatus: 'all',
  dateRange: 'all',
  searchQuery: '',
  highlightedCampaignId: null,

  setCampaigns: (campaigns) => set({ campaigns }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setDateRange: (range) => set({ dateRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setHighlightedCampaignId: (id) => set({ highlightedCampaignId: id }),

  fetchCampaigns: async () => {
    const controller = new AbortController();
    set({ loading: true, error: null });

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Check if aborted
      if (controller.signal.aborted) {
        return () => controller.abort();
      }

      set({ campaigns: mockCampaigns, loading: false });
    } catch (error) {
      if (!controller.signal.aborted) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch campaigns',
          loading: false 
        });
      }
    }

    return () => controller.abort();
  },

  getFilteredCampaigns: () => {
    const { campaigns, filterStatus, dateRange, searchQuery } = get();
    let filtered = [...campaigns];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      
      filtered = filtered.filter((c) => new Date(c.createdAt) >= cutoffDate);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  },
}));

