import { Search, Filter, Calendar } from "lucide-react";
import type { FilterStatus, DateRange } from "../types";

interface FiltersProps {
  filterStatus: FilterStatus;
  dateRange: DateRange;
  searchQuery: string;
  onFilterStatusChange: (status: FilterStatus) => void;
  onDateRangeChange: (range: DateRange) => void;
  onSearchQueryChange: (query: string) => void;
}

export function Filters({
  filterStatus,
  dateRange,
  searchQuery,
  onFilterStatusChange,
  onDateRangeChange,
  onSearchQueryChange,
}: FiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="search-campaigns"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <Search className="h-4 w-4" />
            Search Campaigns
          </label>
          <input
            id="search-campaigns"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="filter-status"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <Filter className="h-4 w-4" />
            Status
          </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) =>
              onFilterStatusChange(e.target.value as FilterStatus)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="all">All Campaigns</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="date-range"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <Calendar className="h-4 w-4" />
            Date Range
          </label>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DateRange)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
