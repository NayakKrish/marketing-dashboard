import type { Campaign, PromptResult } from '../types';

export function parsePrompt(prompt: string, campaigns: Campaign[]): PromptResult {
  const lowerPrompt = prompt.toLowerCase().trim();

  // Show top campaigns by CTR
  if (lowerPrompt.includes('top') && lowerPrompt.includes('ctr')) {
    const sorted = [...campaigns].sort((a, b) => b.ctr - a.ctr);
    const top5 = sorted.slice(0, 5);
    return {
      type: 'sort',
      campaigns: top5,
      message: `Showing top ${top5.length} campaigns by CTR`,
    };
  }

  // Show top campaigns by conversions
  if (lowerPrompt.includes('top') && (lowerPrompt.includes('conversion') || lowerPrompt.includes('performing'))) {
    const sorted = [...campaigns].sort((a, b) => b.conversions - a.conversions);
    const top5 = sorted.slice(0, 5);
    return {
      type: 'sort',
      campaigns: top5,
      message: `Showing top ${top5.length} campaigns by conversions`,
    };
  }

  // Show paused campaigns
  if (lowerPrompt.includes('paused')) {
    const paused = campaigns.filter((c) => c.status === 'Paused');
    return {
      type: 'filter',
      campaigns: paused,
      message: `Found ${paused.length} paused campaign(s)`,
    };
  }

  // Show active campaigns
  if (lowerPrompt.includes('active')) {
    const active = campaigns.filter((c) => c.status === 'Active');
    return {
      type: 'filter',
      campaigns: active,
      message: `Found ${active.length} active campaign(s)`,
    };
  }

  // Highlight best performing campaign
  if (lowerPrompt.includes('best') || lowerPrompt.includes('highlight')) {
    const best = [...campaigns].sort((a, b) => b.conversions - a.conversions)[0];
    return {
      type: 'highlight',
      campaigns: campaigns,
      message: `Highlighting best performing campaign: ${best.name}`,
      highlightedId: best.id,
    };
  }

  // Show campaigns by CTR (sorted)
  if (lowerPrompt.includes('ctr') && !lowerPrompt.includes('top')) {
    const sorted = [...campaigns].sort((a, b) => b.ctr - a.ctr);
    return {
      type: 'sort',
      campaigns: sorted,
      message: 'Campaigns sorted by CTR (highest to lowest)',
    };
  }

  // Show campaigns by impressions
  if (lowerPrompt.includes('impression')) {
    const sorted = [...campaigns].sort((a, b) => b.impressions - a.impressions);
    return {
      type: 'sort',
      campaigns: sorted,
      message: 'Campaigns sorted by impressions (highest to lowest)',
    };
  }

  // Show campaigns by clicks
  if (lowerPrompt.includes('click')) {
    const sorted = [...campaigns].sort((a, b) => b.clicks - a.clicks);
    return {
      type: 'sort',
      campaigns: sorted,
      message: 'Campaigns sorted by clicks (highest to lowest)',
    };
  }

  // Show low performing campaigns
  if (lowerPrompt.includes('low') || lowerPrompt.includes('worst')) {
    const sorted = [...campaigns].sort((a, b) => a.conversions - b.conversions);
    const bottom5 = sorted.slice(0, 5);
    return {
      type: 'sort',
      campaigns: bottom5,
      message: `Showing ${bottom5.length} lowest performing campaigns`,
    };
  }

  // Search by name
  const nameMatch = lowerPrompt.match(/(?:show|find|get)\s+(.+?)(?:\s+campaign)?$/);
  if (nameMatch) {
    const searchTerm = nameMatch[1];
    const matched = campaigns.filter((c) => 
      c.name.toLowerCase().includes(searchTerm)
    );
    if (matched.length > 0) {
      return {
        type: 'filter',
        campaigns: matched,
        message: `Found ${matched.length} campaign(s) matching "${searchTerm}"`,
      };
    }
  }

  // Default: show all campaigns
  return {
    type: 'info',
    campaigns,
    message: 'Could not understand prompt. Showing all campaigns. Try: "Show top campaigns by CTR", "List paused campaigns", or "Highlight best performing campaign"',
  };
}

