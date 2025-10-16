import { Star } from 'lucide-react';
import type { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  isHighlighted?: boolean;
}

export function CampaignCard({ campaign, isHighlighted }: CampaignCardProps) {
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 transition-all duration-200 hover:shadow-md ${
        isHighlighted ? 'ring-2 ring-yellow-400 shadow-lg' : ''
      }`}
      role="article"
      aria-label={`Campaign: ${campaign.name}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {campaign.name}
        </h3>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
            campaign.status === 'Active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
          aria-label={`Status: ${campaign.status}`}
        >
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {formatNumber(campaign.impressions)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Clicks</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {formatNumber(campaign.clicks)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CTR</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {campaign.ctr.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversions</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {formatNumber(campaign.conversions)}
          </p>
        </div>
      </div>

      {isHighlighted && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            Best Performing Campaign
          </p>
        </div>
      )}
    </div>
  );
}

