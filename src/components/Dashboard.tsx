import { useState, useEffect } from "react";
import { Table, LayoutGrid, AlertCircle, RefreshCw } from "lucide-react";
import { useStore } from "../store/useStore";
import { Filters } from "./Filters";
import { CampaignCard } from "./CampaignCard";
import { CampaignTable } from "./CampaignTable";
import { PerformanceChart } from "./PerformanceChart";
import { LoadingSkeleton, ChartSkeleton } from "./LoadingSkeleton";

export function Dashboard() {
  const [viewMode, setViewMode] = useState<string>("table");
  const {
    loading,
    error,
    filterStatus,
    dateRange,
    searchQuery,
    highlightedCampaignId,
    setFilterStatus,
    setDateRange,
    setSearchQuery,
    fetchCampaigns,
    getFilteredCampaigns,
  } = useStore();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filteredCampaigns = getFilteredCampaigns();

  if (error) {
    return (
      <div
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        role="alert"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => fetchCampaigns()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Marketing Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and analyze your ad campaign performance
          </p>
        </div>
        <div className="flex gap-2" role="group" aria-label="View mode">
          {ViewModes.map((viewModeItem) => {
            const Icon = viewModeItem.icon;
            return (
              <button
                onClick={() => setViewMode(viewModeItem.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer ${
                  viewModeItem.value === viewMode
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                aria-pressed={viewModeItem.value === viewMode}
              >
                <Icon className="h-4 w-4" />
                {viewModeItem.label}
              </button>
            );
          })}
        </div>
      </div>

      <Filters
        filterStatus={filterStatus}
        dateRange={dateRange}
        searchQuery={searchQuery}
        onFilterStatusChange={setFilterStatus}
        onDateRangeChange={setDateRange}
        onSearchQueryChange={setSearchQuery}
      />

      {loading ? <ChartSkeleton /> : <PerformanceChart />}

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Campaigns ({filteredCampaigns.length})
          </h2>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : viewMode === "table" ? (
          <CampaignTable
            campaigns={filteredCampaigns}
            highlightedId={highlightedCampaignId}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                isHighlighted={campaign.id === highlightedCampaignId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ViewModes = [
  {
    label: "Table",
    value: "table",
    icon: Table,
  },
  {
    label: "Cards",
    value: "cards",
    icon: LayoutGrid,
  },
];
