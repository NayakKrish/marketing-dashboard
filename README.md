# Marketing Intelligence Dashboard

A modern, accessible, and performant marketing dashboard built with React, TypeScript, and Tailwind CSS. Features real-time campaign monitoring and an AI-powered prompt playground for natural language queries.

## 🚀 Features

### Marketing Dashboard
- **Campaign Overview**: View all campaigns in a responsive table or card layout
- **Performance Metrics**: Track impressions, clicks, CTR, and conversions
- **Real-time Charts**: Visualize performance trends with interactive Recharts
- **Advanced Filters**: Filter by status (Active/Paused), date range, and search by name
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Prompt Playground
- **Natural Language Queries**: Use plain English to query your campaigns
- **Smart Intent Parsing**: Understands commands like:
  - "Show top campaigns by CTR"
  - "List paused campaigns"
  - "Highlight best performing campaign"
  - "Show campaigns by impressions"
- **Dynamic Results**: Instantly filters and sorts data based on your prompts
- **Example Prompts**: Quick-start buttons for common queries

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Charts**: Recharts
- **Linting**: ESLint with React hooks plugin

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── CampaignCard.tsx
│   ├── CampaignTable.tsx
│   ├── Dashboard.tsx
│   ├── ErrorBoundary.tsx
│   ├── Filters.tsx
│   ├── LoadingSkeleton.tsx
│   ├── PerformanceChart.tsx
│   └── PromptPlayground.tsx
├── data/               # Mock data
│   └── mockData.ts
├── store/              # Zustand store
│   └── useStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utility functions
│   └── promptParser.ts
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 💡 Usage Examples

### Dashboard Tab
1. View all campaigns in table or card view
2. Use filters to narrow down results:
   - Search by campaign name
   - Filter by status (Active/Paused)
   - Filter by date range (7d, 30d, 90d, all time)
3. View performance trends in the interactive chart

### Prompt Playground Tab
Try these natural language prompts:
- `Show top campaigns by CTR` - Displays top 5 campaigns sorted by click-through rate
- `List paused campaigns` - Shows only paused campaigns
- `Highlight best performing campaign` - Highlights the campaign with most conversions
- `Show campaigns by impressions` - Sorts all campaigns by impression count
- `Show low performing campaigns` - Displays bottom 5 campaigns

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Design Principles

1. **Accessibility First**: Built with WCAG 2.1 AA compliance
2. **Performance Optimized**: Code splitting, lazy loading, and efficient rendering
3. **User-Centric**: Clear feedback, loading states, and error handling
4. **Modern UX**: Clean interface with dark mode support
5. **Mobile-First**: Responsive design that works on all devices

## 🔒 Data Privacy

This application uses mock data only. No real user data is collected or transmitted.

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 🤝 Contributing

This is a demonstration project. For issues or suggestions, please create an issue in the repository.

---

Built with ❤️ for AI Vibe Growth Platform
# marketing-dashboard
