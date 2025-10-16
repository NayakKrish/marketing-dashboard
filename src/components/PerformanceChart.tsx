import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../store/useStore";
import { FileText } from "lucide-react";
import { useMemo } from "react";

export function PerformanceChart() {
  const { getFilteredCampaigns } = useStore();
  const campaigns = getFilteredCampaigns();

  // Sort campaigns by createdAt
  const chartData = useMemo(() => {
    return campaigns
      .map((c) => ({
        date: c.createdAt,
        impressions: c.impressions,
        clicks: c.clicks,
        conversions: c.conversions,
      }))
      .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  }, [campaigns]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Performance Trends (Last 8 Days)
      </h2>

      {!chartData || chartData.length === 0 ? (
        // Empty state
        <div className="p-12 text-center">
          <FileText
            className="mx-auto h-12 w-12 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No data available
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        // Chart
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "currentColor" }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis
              tick={{ fill: "currentColor" }}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: "0.375rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Impressions"
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Clicks"
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Conversions"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
