import { useState } from 'react';
import { Info, Table, LayoutGrid } from 'lucide-react';
import { useStore } from '../store/useStore';
import { parsePrompt } from '../utils/promptParser';
import { CampaignTable } from './CampaignTable';
import { CampaignCard } from './CampaignCard';
import type { Campaign } from '../types';

export function PromptPlayground() {
  const [prompt, setPrompt] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [displayedCampaigns, setDisplayedCampaigns] = useState<Campaign[]>([]);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  const { campaigns, setHighlightedCampaignId } = useStore();

  const examplePrompts = [
    'Show top campaigns by CTR',
    'List paused campaigns',
    'Highlight best performing campaign',
    'Show campaigns by impressions',
    'Show low performing campaigns',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const result = parsePrompt(prompt, campaigns);
    setResultMessage(result.message);
    setDisplayedCampaigns(result.campaigns);
    setHighlightedId(result.highlightedId || null);
    setHighlightedCampaignId(result.highlightedId || null);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    const result = parsePrompt(example, campaigns);
    setResultMessage(result.message);
    setDisplayedCampaigns(result.campaigns);
    setHighlightedId(result.highlightedId || null);
    setHighlightedCampaignId(result.highlightedId || null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Prompt Playground
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Use natural language to query and filter your campaigns
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="prompt-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Enter your prompt
            </label>
            <div className="flex gap-2">
              <input
                id="prompt-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='e.g., "Show top campaigns by CTR"'
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!prompt.trim()}
              >
                Execute
              </button>
            </div>
          </div>

          {/* Example prompts */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Example prompts:
            </p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Result message */}
      {resultMessage && (
        <div
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-blue-800 dark:text-blue-200">{resultMessage}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {displayedCampaigns.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Results ({displayedCampaigns.length})
            </h2>
            <div className="flex gap-2" role="group" aria-label="View mode">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-pressed={viewMode === 'table'}
              >
                <Table className="h-4 w-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2 ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-pressed={viewMode === 'cards'}
              >
                <LayoutGrid className="h-4 w-4" />
                Cards
              </button>
            </div>
          </div>

          {viewMode === 'table' ? (
            <CampaignTable campaigns={displayedCampaigns} highlightedId={highlightedId} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  isHighlighted={campaign.id === highlightedId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

