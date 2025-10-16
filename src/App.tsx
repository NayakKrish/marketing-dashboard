import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { PromptPlayground } from "./components/PromptPlayground";

function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const TABS = [
    {
      label: "Dashboard",
      value: "dashboard",
    },
    {
      label: "Prompt Playground",
      value: "playground",
    },
  ];

  const handleTabClick = (value: string) => {
    const tab = TABS.find((tab) => tab.value === value);
    if (tab) {
      setActiveTab(tab.value);
    } else {
      console.error(`Tab with value ${value} not found`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <BarChart3
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
                <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  AI Vibe Growth Platform
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8" role="tablist">
              {TABS.map((tab) => (
                <button
                  aria-selected={activeTab === tab.value}
                  aria-controls={`${tab.value}-panel`}
                  onClick={() => handleTabClick(tab.value)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === tab.value
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main
          id="main-content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen"
        >
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "playground" && <PromptPlayground />}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2025 AI Vibe Growth Platform. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
